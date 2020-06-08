import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader-indicator',
  templateUrl: './loader-indicator.component.html',
  styleUrls: ['./loader-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderIndicatorComponent {
  @Input() loader: string;
}
