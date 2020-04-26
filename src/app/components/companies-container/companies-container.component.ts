import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Company } from 'src/app/classes/company';
import { CompanyWithIncomes } from 'src/app/classes/companyWithIncomes';
import { CompaniesService } from 'src/app/services/companies.service';
import { Pagination } from 'src/app/classes/pagination';
import { Header, SortEnum } from 'src/app/classes/header';

@Component({
  selector: 'app-companies-container',
  templateUrl: './companies-container.component.html',
  styleUrls: ['./companies-container.component.scss']
})
export class CompaniesContainerComponent implements OnInit, OnDestroy {
  constructor(private companiesService: CompaniesService) {}
  elementsPerPage = 25;
  currentPage = 1;
  avaliablePages: Pagination[] = [];
  avaliableHeaders = Header.getAvaliableHeaders();

  filterValue = '';
  avaliableCompanies: Company[] = [];
  filteredCompanies$ = new Observable<CompanyWithIncomes[]>();

  subs: Subscription = new Subscription();

  ngOnInit() {
    this.subs.add(
      this.companiesService.getCompanies().subscribe(companies => {
        this.avaliableCompanies = companies;
        this.getAvaliablePages();
      })
    );

    this.subs.add(
      this.companiesService.filterCompanies$
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(value => {
            this.filterValue = value;
            this.currentPage = 1;
            this.sortAndfilterCompanies();
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  sortAndfilterCompanies() {
    const sortedCompanies = this.avaliableCompanies.sort((prev, curr) => {
      const sort = this.avaliableHeaders.find(header => header.isSelected);
      if (sort) {
        const prevValue = prev[SortEnum[sort.id]];
        const currValue = curr[SortEnum[sort.id]];
        if (sort.asc) {
          return prevValue < currValue ? -1 : prevValue > currValue ? 1 : 0;
        } else {
          return prevValue > currValue ? -1 : prevValue < currValue ? 1 : 0;
        }
      } else {
        return 1;
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

  sortTable(sortHeader: Header) {
    this.avaliableHeaders.forEach(header => {
      header.isSelected = header.name === sortHeader.name;
      header.asc =
        header.name === sortHeader.name && !header.asc ? true : false;
    });

    this.sortAndfilterCompanies();
  }

  getAvaliablePages() {
    const allRecords = this.avaliableCompanies.length;
    const pages = allRecords / this.elementsPerPage;
    const allPages = [];
    for (let i = 1; i <= pages; i++) {
      const page: Pagination = {
        number: i,
        isSelected: i === 1
      };
      allPages.push(page);
    }
    this.avaliablePages = [...allPages];
  }

  onChangePageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
    this.sortAndfilterCompanies();
  }
}
