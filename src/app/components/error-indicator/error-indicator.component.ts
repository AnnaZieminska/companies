import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-error-indicator',
  templateUrl: './error-indicator.component.html',
  styleUrls: ['./error-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorIndicatorComponent {
  @Input() error: string;

  constructor(private companiesService: CompaniesService) {}

  closeError() {
    this.companiesService.showError('');
  }
}
