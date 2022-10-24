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

type Layouts = {
  [key: string]: string;
};

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  countries$!: Observable<Country[]>;
  searchTerm: string = '';
  selectedLayout: string = 'list';

  layouts: Layouts = { grid: 'list', list: 'grid' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.countries$ = this.getCountries();
  }

  getCountries(): Observable<Country[]> {
    return this.http
      .get<CountryResponse>('https://countriesnow.space/api/v0.1/countries')
      .pipe(map((response: CountryResponse) => response.data));
  }

  switchLayout(): void {
    this.selectedLayout = this.layouts[this.selectedLayout];
  }

  filterCountries(countries: Country[]): Country[] {
    if (this.searchTerm) {
      return countries.filter((country: Country) => {
        return country.country.toLowerCase().includes(this.searchTerm);
      });
    }

    return countries;
  }
}
