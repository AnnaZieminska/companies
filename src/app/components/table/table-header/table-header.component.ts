import { Component, Input } from '@angular/core';
import { Header } from 'src/app/classes/header';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent {
  @Input() header: Header;

  constructor() {}
}
