import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CompaniesContainerComponent } from './companies-container.component';
import { TableHeaderComponent } from '../table/table-header/table-header.component';
import { TableFooterComponent } from '../table/table-footer/table-footer.component';

describe('CompaniesContainerComponent', () => {
  let fixture: ComponentFixture<CompaniesContainerComponent>;
  let component: CompaniesContainerComponent;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompaniesContainerComponent,
        TableHeaderComponent,
        TableFooterComponent
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesContainerComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the companiesContainer', () => {
    const companiesContainer = fixture.debugElement.componentInstance;
    expect(companiesContainer).toBeTruthy();
  });
});
