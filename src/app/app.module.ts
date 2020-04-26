import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CompaniesContainerComponent } from './components/companies-container/companies-container.component';
import { CompaniesFilterComponent } from './components/companies-filter/companies-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    CompaniesContainerComponent,
    CompaniesFilterComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
