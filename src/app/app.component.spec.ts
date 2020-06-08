import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CompaniesFilterComponent } from './components/companies-filter/companies-filter.component';
import { CompaniesContainerComponent } from './components/companies-container/companies-container.component';
import { LoaderIndicatorComponent } from './components/loader-indicator/loader-indicator.component';
import { ErrorIndicatorComponent } from './components/error-indicator/error-indicator.component';
import { TableFooterComponent } from './components/table/table-footer/table-footer.component';
import { TableHeaderComponent } from './components/table/table-header/table-header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of, BehaviorSubject } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [
        AppComponent,
        CompaniesContainerComponent,
        CompaniesFilterComponent,
        TableFooterComponent,
        TableHeaderComponent,
        LoaderIndicatorComponent,
        ErrorIndicatorComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    expect(compiled.querySelector('h1').textContent).toContain(
      'Compare incomes of companies'
    );
  });

  it('should hide indicators at the beginning', () => {
    expect(compiled.querySelector('app-loader-indicator')).toBeFalsy();
    expect(compiled.querySelector('app-error-indicator')).toBeFalsy();
  });

  it('should show loading indicator after change detection', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('app-loader-indicator')).toBeTruthy();
  });

  it('should show error indicator when message sent', () => {
    component.showError$.next('message');
    fixture.detectChanges();
    expect(compiled.querySelector('app-error-indicator')).toBeTruthy();
  });

  it('should hide error indicator when no message', () => {
    component.showError$.next('');
    fixture.detectChanges();
    expect(compiled.querySelector('app-error-indicator')).toBeFalsy();
  });
});
