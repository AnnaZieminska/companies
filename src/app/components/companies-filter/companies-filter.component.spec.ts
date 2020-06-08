import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CompaniesService } from 'src/app/services/companies.service';
import { CompaniesFilterComponent } from './companies-filter.component';

describe('CompaniesFilterComponent', () => {
  let fixture: ComponentFixture<CompaniesFilterComponent>;
  let component: CompaniesFilterComponent;
  let clear: DebugElement;
  let inputText: DebugElement;
  let companiesService: CompaniesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompaniesFilterComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: CompaniesService,
          useValue: {
            filterTable: () => null
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesFilterComponent);
    component = fixture.componentInstance;
    companiesService = TestBed.get(CompaniesService);

    clear = fixture.debugElement.query(By.css('.clear'));
    inputText = fixture.debugElement.query(By.css('input[type=text]'));
  });

  it('should create the filterComponent', () => {
    const filterComponent = fixture.debugElement.componentInstance;
    expect(filterComponent).toBeTruthy();
  });

  it('changing input should call method filterTable in serivce with input value', () => {
    inputText.nativeElement.value = 'text';
    const spyOnFilterTable = spyOn(companiesService, 'filterTable');
    inputText.triggerEventHandler('input', inputText.nativeElement.value);
    expect(spyOnFilterTable).toHaveBeenCalledWith('text');
  });

  it('clear button should call method filterTable in serivce', () => {
    inputText.nativeElement.value = 'text';
    const spyOnFilterTable = spyOn(companiesService, 'filterTable');
    clear.triggerEventHandler('click', null);
    expect(spyOnFilterTable).toHaveBeenCalledWith('');
  });

  it('clear button should remove text from input', () => {
    inputText.nativeElement.value = 'text';
    clear.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(inputText.nativeElement.inputText).toBeFalsy();
  });
});
