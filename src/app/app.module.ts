import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CompaniesContainerComponent } from './components/companies-container/companies-container.component';
import { CompaniesFilterComponent } from './components/companies-filter/companies-filter.component';
import { TableFooterComponent } from './components/table/table-footer/table-footer.component';
import { TableHeaderComponent } from './components/table/table-header/table-header.component';
import { LoaderIndicatorComponent } from './components/loader-indicator/loader-indicator.component';
import { ErrorIndicatorComponent } from './components/error-indicator/error-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    CompaniesContainerComponent,
    CompaniesFilterComponent,
    TableFooterComponent,
    TableHeaderComponent,
    LoaderIndicatorComponent,
    ErrorIndicatorComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
