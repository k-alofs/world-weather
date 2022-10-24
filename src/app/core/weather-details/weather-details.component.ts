import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';

type Params = {
  [key: string]: string;
};

type WeatherResponse = {
  main: { temp: string };
  wind: { speed: string };
  weather: { main: string }[];
};

type Weather = {
  temp: string;
  windSpeed: string;
  weather: string;
};

type Units = {
  [key: string]: string;
};

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
})
export class WeatherDetailsComponent implements OnInit {
  weather$!: Observable<Weather>;

  currentUnit: string = 'metric';
  currentCountry: string = '';

  units: Units = {
    metric: 'imperial',
    imperial: 'metric',
  };

  temperature: Units = {
    metric: 'C',
    imperial: 'F',
  };

  speed: Units = {
    metric: 'meter/sec',
    imperial: 'miles/hour',
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentCountry = params['id'];

      this.weather$ = this.getDetails(this.currentCountry, this.currentUnit);
    });
  }

  getDetails(id: string, unit: string): Observable<Weather> {
    return this.http
      .get<WeatherResponse>(
        `https://api.openweathermap.org/data/2.5/weather?q=${id}&APPID=${environment.appId}&units=${unit}`
      )
      .pipe(
        map((response: WeatherResponse) => {
          return {
            temp: `${response.main.temp} °${this.temperature[unit]}`,
            windSpeed: `${response.wind.speed} ${this.speed[unit]}`,
            weather: response.weather[0].main,
          };
        }),
        catchError(() => {
          console.error('Please verify that the APPID is valid');

          return of({
            weather: 'Unable to fetch weather details',
            temp: '',
            windSpeed: '',
          });
        })
      );
  }

  switchUnit(): void {
    this.currentUnit = this.units[this.currentUnit];

    this.weather$ = this.getDetails(this.currentCountry, this.currentUnit);
  }
}
