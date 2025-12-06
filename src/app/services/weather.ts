import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  http = inject(HttpClient);
  apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  key: string = '959e068c31021c50d6ac17c7252761b2';
  // ?lat={lat}&lon={lon}&appid={API key}',

  getCurrentLoc(lattidue: number, Longitude: number): Observable<any> {
    const x = this.http.get(`${this.apiUrl}?lat=${lattidue}&lon=${Longitude}&appid=${this.key}`);
    return x;
  }
}
