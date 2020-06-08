import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableHeaderComponent } from './table-header.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Header, SortEnum } from 'src/app/classes/header';

describe('TableHeaderComponent', () => {
  let fixture: ComponentFixture<TableHeaderComponent>;
  let component: TableHeaderComponent;
  let headerName: DebugElement;
  let arrowButton: DebugElement;
  let arrow: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableHeaderComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHeaderComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    component.header = new Header(SortEnum.name, true, 'Name', '', true);
    fixture.detectChanges();
    headerName = fixture.debugElement.query(By.css('.header-name'));
    arrowButton = fixture.debugElement.query(By.css('.arrow-button'));
    arrow = fixture.debugElement.query(By.css('.arrow'));
  });

  it('should create the companiesContainer', () => {
    const companiesContainer = fixture.debugElement.componentInstance;
    expect(companiesContainer).toBeTruthy();
  });

  it('should show header if exists', () => {
    expect(headerName).toBeTruthy();
  });

  it('header name should be equal input object name', () => {
    expect(headerName.nativeElement.textContent).toContain('Name');
  });

  it('should show arrow if header is selected', () => {
    expect(arrowButton).toBeTruthy();
  });

  it('should has class "up" if sort asc', () => {
    expect(arrow.nativeElement.classList).toContain('up');
  });
});
