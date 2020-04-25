import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company } from '../classes/company';
import { CompanyWithIncomes } from '../classes/companyWithIncomes';
import { IncomeResponse, Income } from '../classes/income';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  constructor(private http: HttpClient) {}

  private basicUrl = 'https://recruitment.hal.skygate.io/';
  private companiesUrl = this.basicUrl + 'companies/';
  private incomesUrl = this.basicUrl + 'incomes/';

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companiesUrl);
  }

  getIncomesOfFilteredCompanies(
    companies: Company[]
  ): Observable<CompanyWithIncomes[]> {
    const requests = companies.map(company => {
      return this.getSingleCompany(company.id);
    });

    return forkJoin(requests).pipe(
      map((incomes: IncomeResponse[]) => {
        return this.getCompaniesWithIncomes(incomes, companies);
      })
    );
  }

  getCompaniesWithIncomes(
    incomes: IncomeResponse[],
    companies: Company[]
  ): CompanyWithIncomes[] {
    const companiesWithIncomes: CompanyWithIncomes[] = companies.map(
      company => {
        const companyIncomes = incomes.find(income => income.id === company.id);

        const { total, average } = this.getTotalIncome(companyIncomes);
        return {
          ...company,
          incomes: companyIncomes
            ? companyIncomes.incomes
            : new Array<Income>(),
          totalIncome: total,
          averageIncome: average,
          lastMonthIncome: this.getLastMonthIncome(companyIncomes)
        };
      }
    );
    return companiesWithIncomes;
  }

  getTotalIncome(
    companyIncomes: IncomeResponse
  ): { total: number; average: number } {
    const allIncomes = companyIncomes.incomes.map(income =>
      parseFloat(income.value)
    );
    const totalIncome = allIncomes.reduce((prev, curr) => {
      return +(prev + curr).toFixed(2);
    });

    const averageIncome = +(totalIncome / allIncomes.length).toFixed(2);

    return { total: totalIncome, average: averageIncome };
  }

  getLastMonthIncome(companyIncomes: IncomeResponse): number {
    const incomesWithDates: Income[] = companyIncomes.incomes.map(income => {
      const newDate = new Date(income.date);
      return {
        value: income.value,
        date: newDate
      };
    });

    const sortedIncomes = incomesWithDates.sort(
      (prev, curr) =>
        (curr.date as Date).getTime() - (prev.date as Date).getTime()
    );

    const lastMonthIncomesSum = sortedIncomes
      .filter((income: Income) => {
        const incomeDate = income.date as Date;
        const lastestDate = sortedIncomes[0].date as Date;

        return (
          incomeDate.getFullYear() === lastestDate.getFullYear() &&
          incomeDate.getMonth() === lastestDate.getMonth()
        );
      })
      .map(income => +income.value)
      .reduce((prev: number, curr: number) => {
        return +(prev + curr).toFixed(2);
      });

    return lastMonthIncomesSum;
  }

  getSingleCompany(id: number): Observable<IncomeResponse> {
    return this.http.get<IncomeResponse>(this.incomesUrl + id);
  }
}
