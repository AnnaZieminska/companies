import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'app-error-indicator',
  templateUrl: './error-indicator.component.html',
  styleUrls: ['./error-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorIndicatorComponent implements OnInit {
  @Input() error: string;

  constructor(private companiesService: CompaniesService) {}

  ngOnInit() {}

  closeErrror() {
    this.companiesService.showError('');
  }
}
