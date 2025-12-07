import { Component, inject, OnInit, signal } from '@angular/core';
import { Weather } from './services/weather';
import { Cityinfo } from './components/cityinfo/cityinfo';
import { Search } from './components/search/search';
import { Todayinfo } from './components/todayinfo/todayinfo';
import { Moreinfo } from './components/moreinfo/moreinfo';
import { Weekinfo } from './components/weekinfo/weekinfo';
import { WeatherDataType } from './types';
import { TEMP_C } from './constants';

@Component({
  selector: 'app-root',
  imports: [Cityinfo, Search, Todayinfo, Moreinfo, Weekinfo],
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
  weather = signal<WeatherDataType | null>(null);
  tempC = TEMP_C;

  sendCurrentloc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lon = position.coords.longitude;
        this.lat = position.coords.latitude;
        this.weatherServ.getCurrentLoc(this.lat, this.lon).subscribe(
          (res) => {
            this.weather.set(res);
          },
          (error) => {
            console.error('Error getting location:', error);
            alert('Could not get your location. Please enable location services.');
          }
        );
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
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
