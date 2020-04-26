import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { CompanyWithIncomes } from 'src/app/classes/companyWithIncomes';
import { Header, SortEnum } from 'src/app/classes/header';
import { Pagination } from 'src/app/classes/pagination';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-companies-container',
  templateUrl: './companies-container.component.html',
  styleUrls: ['./companies-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesContainerComponent implements OnInit, OnDestroy {
  constructor(
    private companiesService: CompaniesService,
    private cdr: ChangeDetectorRef
  ) {}
  elementsPerPage = 25;
  currentPage = 1;
  avaliablePages: Pagination[] = [];
  avaliableHeaders = Header.getAvaliableHeaders();

  filterValue = '';
  avaliableCompanies: CompanyWithIncomes[] = [];
  filteredCompanies$ = new Observable<CompanyWithIncomes[]>();

  subs: Subscription = new Subscription();

  ngOnInit() {
    this.subs.add(
      this.companiesService.getCompanies().subscribe(companies => {
        this.avaliableCompanies = companies;
        this.getAvaliablePages();
        this.getSortedAndFilteredCompanies();
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
            this.getSortedAndFilteredCompanies();
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getSortedAndFilteredCompanies() {
    if (this.avaliableCompanies && this.avaliableCompanies.length > 0) {
      const sortedCompanies = this.sortCompanies();
      const filteredCompanies = this.filterCompanies(sortedCompanies);

      const endNumber = this.currentPage * this.elementsPerPage;
      const startNumber = endNumber - this.elementsPerPage;
      const companiesRange = filteredCompanies.slice(startNumber, endNumber);

      this.filteredCompanies$ = this.companiesService.getCachedCompanies(
        companiesRange
      );
    }
    this.cdr.detectChanges();
  }

  sortCompanies(): CompanyWithIncomes[] {
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
    return sortedCompanies;
  }

  filterCompanies(sortedCompanies: CompanyWithIncomes[]): CompanyWithIncomes[] {
    const filteredCompanies = sortedCompanies.filter(company => {
      const filterText = this.filterValue
        ? this.filterValue.toLocaleLowerCase()
        : '';

      return (
        company.name.toLocaleLowerCase().indexOf(filterText) > -1 ||
        company.city.toLocaleLowerCase().indexOf(filterText) > -1 ||
        company.totalIncome.toString().startsWith(filterText) ||
        company.averageIncome.toString().startsWith(filterText) ||
        company.lastMonthIncome.toString().startsWith(filterText)
      );
    });
    return filteredCompanies;
  }

  sortTable(sortHeader: Header) {
    this.avaliableHeaders.forEach(header => {
      header.isSelected = header.name === sortHeader.name;
      header.asc =
        header.name === sortHeader.name && !header.asc ? true : false;
    });

    this.getSortedAndFilteredCompanies();
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
    this.getSortedAndFilteredCompanies();
  }
}
