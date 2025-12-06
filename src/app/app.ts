import { Component, inject, OnInit, signal } from '@angular/core';
import { Weather } from './services/weather';

@Component({
  selector: 'app-root',
  imports: [],
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

  sendCurrentloc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lon = position.coords.longitude;
        this.lat = position.coords.latitude;
        this.weatherServ.getCurrentLoc(this.lat, this.lon).subscribe((res) => {
          console.log(res);
        });
      });
    }
  }
}
