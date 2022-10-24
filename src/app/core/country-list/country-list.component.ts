import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

type CountryResponse = {
  data: Country[];
};

type Country = {
  cities: string[];
  country: string;
  iso2: string;
  iso3: string;
};

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  countries$!: Observable<Country[]>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.countries$ = this.getCountries();
  }

  getCountries(): Observable<Country[]> {
    return this.http
      .get<CountryResponse>('https://countriesnow.space/api/v0.1/countries')
      .pipe(map((response: CountryResponse) => response.data));
  }
}
