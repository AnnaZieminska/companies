import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ErrorIndicatorComponent } from './error-indicator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CompaniesService } from 'src/app/services/companies.service';

describe('ErrorIndicatorComponent', () => {
  let fixture: ComponentFixture<ErrorIndicatorComponent>;
  let component: ErrorIndicatorComponent;
  let companiesService: CompaniesService;
  let errorText: DebugElement;
  let closeErrorBtn: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorIndicatorComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: CompaniesService,
          useValue: {
            showError: () => null
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorIndicatorComponent);
    component = fixture.componentInstance;
    companiesService = TestBed.get(CompaniesService);
    errorText = fixture.debugElement.query(By.css('.error-message'));
    closeErrorBtn = fixture.debugElement.query(By.css('.clear'));
  });

  it('setting loader to string should show message', () => {
    component.error = 'message';
    fixture.detectChanges();
    expect(errorText.nativeElement.textContent).toBe('message');
  });

  it('setting loader to empty string should hide message', () => {
    component.error = '';
    fixture.detectChanges();
    expect(errorText.nativeElement.value).toBeFalsy();
  });

  it('button click should fire showError method in service', () => {
    const spyOnShowError = spyOn(companiesService, 'showError');
    closeErrorBtn.triggerEventHandler('click', null);
    expect(spyOnShowError).toHaveBeenCalledWith('');
  });
});
