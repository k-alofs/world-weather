import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryListComponent } from './core/country-list/country-list.component';
import { WeatherDetailsComponent } from './core/weather-details/weather-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, CountryListComponent, WeatherDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
