import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-loader-indicator',
  templateUrl: './loader-indicator.component.html',
  styleUrls: ['./loader-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderIndicatorComponent implements OnInit {
  @Input() loader: string;
  constructor() {}

  ngOnInit() {}
}
