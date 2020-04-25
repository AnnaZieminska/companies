import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Company } from 'src/app/classes/company';
import { CompanyWithIncomes } from 'src/app/classes/companyWithIncomes';
import { Sort } from 'src/app/classes/sort';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-companies-container',
  templateUrl: './companies-container.component.html',
  styleUrls: ['./companies-container.component.scss']
})
export class CompaniesContainerComponent implements OnInit {
  constructor(private companiesService: CompaniesService) {}
  elementsPerPage = 10;
  currentPage = 1;
  sort: Sort = {
    asc: true,
    name: 'id'
  };

  filterValue = '';
  avaliableCompanies: Company[] = [];
  filteredCompanies$ = new Observable<CompanyWithIncomes[]>();
  filterCompanies$ = new BehaviorSubject<string>('');

  ngOnInit() {
    this.companiesService.getCompanies().subscribe(companies => {
      this.avaliableCompanies = companies;
      this.sortAndfilterCompanies();
    });

    this.filterCompanies$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(value => {
          this.filterValue = value;
          this.sortAndfilterCompanies();
        })
      )
      .subscribe();
  }

  sortAndfilterCompanies() {
    const sortedCompanies = this.avaliableCompanies.sort((prev, curr) => {
      const prevValue = prev[this.sort.name];
      const currValue = curr[this.sort.name];
      if (this.sort.asc) {
        return prevValue < currValue ? -1 : prevValue > currValue ? 1 : 0;
      } else {
        return prevValue > currValue ? -1 : prevValue < currValue ? 1 : 0;
      }
    });

    const filteredCompanies = sortedCompanies.filter(company => {
      const filterText = this.filterValue
        ? this.filterValue.toLocaleLowerCase()
        : '';
      return (
        company.name.toLocaleLowerCase().indexOf(filterText) > -1 ||
        company.city.toLocaleLowerCase().indexOf(filterText) > -1
      );
    });

    const endNumber = this.currentPage * this.elementsPerPage;
    const startNumber = endNumber - this.elementsPerPage;
    const companiesRange = filteredCompanies.slice(startNumber, endNumber);

    this.filteredCompanies$ = this.companiesService.getIncomesOfFilteredCompanies(
      companiesRange
    );
  }

  sortTable(value: string) {
    if (this.sort.name === value) {
      this.sort.asc = !this.sort.asc;
    } else {
      this.sort = {
        asc: true,
        name: value
      };
    }

    this.sortAndfilterCompanies();
  }
}
