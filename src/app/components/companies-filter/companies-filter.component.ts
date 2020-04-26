import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-companies-filter',
  templateUrl: './companies-filter.component.html',
  styleUrls: ['./companies-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesFilterComponent implements OnInit {
  @ViewChild('inputValue', { static: false }) inputValueRef: ElementRef;

  constructor(private companiesService: CompaniesService) {}

  ngOnInit() {}

  filterTable(searchText: string) {
    this.companiesService.filterTable(searchText);
  }

  clearFilter() {
    this.companiesService.filterTable('');
    if (this.inputValueRef) {
      this.inputValueRef.nativeElement.value = '';
    }
  }
}
