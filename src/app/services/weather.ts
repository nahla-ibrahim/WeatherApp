import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { forecastData } from '../types/forecast';
import { DailyDataTypes } from '../types/DailyData';
import { CityDataTypes } from '../types/CityData';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  http = inject(HttpClient);
  apiUrl = 'https://api.openweathermap.org/data/2.5/';
  key: string = '959e068c31021c50d6ac17c7252761b2';
  newkey: string = '539d1045600eb71da6f964637bf89f0d';
  dailyKey = '0f3fb9fa31ad3d41f1bb2bd0841c3f2f';

  getCity(lattidue: number, Longitude: number): Observable<CityDataTypes[]> {
    const cityName = this.http.get<CityDataTypes[]>(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lattidue}&lon=${Longitude}&appid=${this.key}`
    );
    return cityName;
  }
  getforecast(city: string): Observable<forecastData> {
    const forecost = this.http.get<forecastData>(
      `${this.apiUrl}forecast?q=${city}&units=metric&appid=${this.newkey}`
    );
    return forecost;
  }

  getDailyData(city: string): Observable<DailyDataTypes> {
    const daily = this.http.get<DailyDataTypes>(
      `${this.apiUrl}forecast/daily?q=${city}&units=metric&cnt=7&appid=${this.dailyKey}`
    );
    return daily;
  }
}
