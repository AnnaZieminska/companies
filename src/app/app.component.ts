import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CompaniesService } from './services/companies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private companiesService: CompaniesService) {}

  showLoader$ = this.companiesService.showLoader$;
  showError$ = this.companiesService.showError$;
}
