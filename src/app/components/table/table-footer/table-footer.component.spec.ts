import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableFooterComponent } from './table-footer.component';

describe('ErrorIndicatorComponent', () => {
  let fixture: ComponentFixture<TableFooterComponent>;
  let component: TableFooterComponent;
  let text: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableFooterComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFooterComponent);
    component = fixture.componentInstance;
    text = fixture.debugElement.query(By.css('.text'));
  });
});
