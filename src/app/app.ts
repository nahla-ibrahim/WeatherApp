import { Component, inject, OnInit, signal } from '@angular/core';
import { Weather } from './services/weather';
import { Cityinfo } from './components/cityinfo/cityinfo';
import { Todayinfo } from './components/todayinfo/todayinfo';
import { Moreinfo } from './components/moreinfo/moreinfo';
import { Weekinfo } from './components/weekinfo/weekinfo';
import { DailyDataTypes } from './types/DailyData';
import { forkJoin, switchMap, tap } from 'rxjs';
import { Search } from './components/search/search';

@Component({
  selector: 'app-root',
  imports: [Cityinfo, Todayinfo, Moreinfo, Weekinfo, Search],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('WeatherApp');

  ngOnInit(): void {
    this.sendCurrentloc();
  }
  weatherServ = inject(Weather);
  lon: number | null = null;
  lat: number | null = null;
  forecast = signal<forecastData | null>(null);
  dailyData = signal<DailyDataTypes | null>(null);
  city = signal('');
  loaded = signal(false);

  sendCurrentloc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lon = position.coords.longitude;
        this.lat = position.coords.latitude;
        this.weatherServ
          .getCity(this.lat, this.lon)
          .pipe(
            tap((res) => {
              this.city.set(res[0].name);
            }),
            switchMap((res) => {
              const city = this.city();
              return forkJoin({
                forecast: this.weatherServ.getforecast(city),
                daily: this.weatherServ.getDailyData(city),
              });
            })
          )
          .subscribe(
            (res) => {
              this.forecast.set(res.forecast);
              this.dailyData.set(res.daily);

              this.loaded.set(true);
            },
            () => alert('Error in API calls')
          );
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }
  onChangeCity(cityName: string) {
    this.city.set(cityName);
    this.weatherServ.getforecast(cityName).subscribe(
      (res) => {
        this.forecast.set(res);
      },
      (err) => alert(`City "${cityName}" Not Found`)
    );

    this.weatherServ.getDailyData(cityName).subscribe((res) => this.dailyData.set(res));
  }

  /////////////sunset & sunrise /////////////
  getTime(timestamp: number): string {
    const data = new Date(timestamp * 1000);
    return data.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
