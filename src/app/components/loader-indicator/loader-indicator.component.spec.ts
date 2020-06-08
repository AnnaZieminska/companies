import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoaderIndicatorComponent } from './loader-indicator.component';

describe('LoaderIndicatorComponent', () => {
  let fixture: ComponentFixture<LoaderIndicatorComponent>;
  let component: LoaderIndicatorComponent;
  let loaderText: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderIndicatorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderIndicatorComponent);
    component = fixture.componentInstance;
    loaderText = fixture.debugElement.query(By.css('span'));
  });

  it('setting loader to string should show message', () => {
    component.loader = 'message';
    fixture.detectChanges();
    expect(loaderText.nativeElement.textContent).toBe('message');
  });

  it('setting loader to empty string should hide message', () => {
    component.loader = '';
    fixture.detectChanges();
    expect(loaderText.nativeElement.value).toBeFalsy();
  });
});
