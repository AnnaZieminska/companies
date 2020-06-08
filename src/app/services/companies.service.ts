import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
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
  private companiesMap = new Map<number, CompanyWithIncomes>();

  public filterCompanies$ = new BehaviorSubject<string>('');
  public showLoader$ = new BehaviorSubject<string>('');
  public showError$ = new BehaviorSubject<string>('');

  public getCompanies(): Observable<CompanyWithIncomes[]> {
    this.showLoader('Fetching data');
    return this.http.get<Company[]>(this.companiesUrl).pipe(
      switchMap(companies => {
        return this.getIncomesOfCompanies(companies);
      }),
      tap(() => {
        this.showLoader('');
      }),
      catchError(error => {
        this.showError(error.message);
        return of(error);
      })
    );
  }

  public getIncomesOfCompanies(
    companies: Company[]
  ): Observable<CompanyWithIncomes[]> {
    const requests: Array<Observable<IncomeResponse>> = [];
    companies.map(company => {
      requests.push(this.getSingleCompany(company.id));
    });

    return forkJoin(requests).pipe(
      map((incomes: IncomeResponse[]) => {
        const companiesWithIncomes = this.getCompaniesWithIncomes(
          incomes,
          companies
        );

        companiesWithIncomes.forEach(company => {
          if (!this.companiesMap.has(company.id)) {
            this.companiesMap.set(company.id, company);
          }
        });

        return companiesWithIncomes;
      })
    );
  }

  public getCachedCompanies(
    companies: CompanyWithIncomes[]
  ): Observable<CompanyWithIncomes[]> {
    const companiesWithIncomesToDisplay: CompanyWithIncomes[] = companies
      .filter(company => this.companiesMap.has(company.id))
      .map(company => this.companiesMap.get(company.id));

    return of(companiesWithIncomesToDisplay);
  }

  private getCompaniesWithIncomes(
    incomes: IncomeResponse[],
    companies: Company[]
  ): CompanyWithIncomes[] {
    const companiesWithIncomes: CompanyWithIncomes[] = [];

    companies.forEach(company => {
      const companyIncomes = incomes.find(income => income.id === company.id);
      if (companyIncomes) {
        const { total, average } = this.getTotalAndAverageIncome(
          companyIncomes
        );
        const companyWithIncome = {
          ...company,
          totalIncome: total,
          averageIncome: average,
          lastMonthIncome: this.getLastMonthIncome(companyIncomes)
        };

        companiesWithIncomes.push(companyWithIncome);
      }
    });
    return companiesWithIncomes;
  }

  private getTotalAndAverageIncome(
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

  private getLastMonthIncome(companyIncomes: IncomeResponse): number {
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

  private getSingleCompany(id: number): Observable<IncomeResponse> {
    return this.http.get<IncomeResponse>(this.incomesUrl + id).pipe(
      catchError(error => {
        this.showError(error.message);
        return of(error);
      })
    );
  }

  public filterTable(searchText: string) {
    this.filterCompanies$.next(searchText);
  }

  public showLoader(message: string) {
    this.showLoader$.next(message);
  }

  public showError(message: string) {
    this.showLoader('');
    this.showError$.next(message);
  }
}
