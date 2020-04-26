import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { Pagination } from 'src/app/classes/pagination';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-table-footer',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFooterComponent implements OnInit, OnChanges {
  @Input() avaliablePages: Pagination[];

  currentPage: number;
  get page(): number {
    return this.currentPage;
  }

  @Input('page')
  set page(value: number) {
    this.currentPage = value;
    if (this.avaliablePages && this.avaliablePages.length > 0) {
      this.pagesRange();
      this.selectPage();
    }
  }

  @Output() changePageNumber = new EventEmitter<number>();

  leftArrowDisabled = true;
  rightArrowDisabled = false;
  pagesToDisaply$ = new BehaviorSubject<Pagination[]>([]);

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const pagesChanges = changes.avaliablePages;
    if (
      pagesChanges &&
      pagesChanges.currentValue &&
      pagesChanges.currentValue.length > 0
    ) {
      this.pagesRange();
    }
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.pagesRange();
    this.selectPage();
    this.emitSelectedPage();
  }

  nextPage(move: number) {
    if (
      this.currentPage + move < 1 ||
      this.currentPage + move > this.avaliablePages.length
    ) {
      return;
    }
    this.currentPage = this.currentPage + move;
    this.pagesRange();
    this.selectPage();
    this.emitSelectedPage();
  }

  endPage(page: string) {
    if (page === 'first') {
      this.changePage(1);
    } else {
      this.changePage(this.avaliablePages.length);
    }
  }

  pagesRange() {
    let startPage = 0;
    let endPage = 6;

    if (
      this.currentPage - 3 >= 1 &&
      this.currentPage + 2 <= this.avaliablePages.length
    ) {
      startPage = this.currentPage - 3;
      endPage = this.currentPage + 2;
    } else if (this.currentPage - 3 < 1) {
      startPage = 0;
      endPage = 5;
    } else if (this.currentPage + 2 > this.avaliablePages.length) {
      startPage = this.avaliablePages.length - 5;
      endPage = this.avaliablePages.length;
    }

    this.pagesToDisaply$.next(this.avaliablePages.slice(startPage, endPage));
  }

  selectPage() {
    this.leftArrowDisabled = this.currentPage === 1;
    this.rightArrowDisabled = this.currentPage === this.avaliablePages.length;

    this.avaliablePages.forEach(i => {
      i.isSelected = i.number === this.currentPage;
    });
  }

  emitSelectedPage() {
    this.changePageNumber.emit(this.currentPage);
  }
}
