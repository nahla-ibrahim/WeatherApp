import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Weather } from './services/weather';
import { Cityinfo } from './components/cityinfo/cityinfo';
import { forecast } from './components/forecast/forecast';
import { Moreinfo } from './components/moreinfo/moreinfo';

import { DailyDataTypes } from './types/DailyData';
import { Search } from './components/search/search';
import { ToastrService } from 'ngx-toastr';
import { forecastData, List, Status } from './types/forecast';

@Component({
  selector: 'app-root',
  imports: [Cityinfo, Moreinfo, Search, forecast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('WeatherApp');

  ngOnInit(): void {
    this.sendCurrentloc();
  }
  toast = inject(ToastrService);
  weatherServ = inject(Weather);
  lon: number | null = null;
  lat: number | null = null;
  forecast = signal<forecastData | null>(null);
  dailyData = signal<DailyDataTypes | null>(null);
  loaded = signal(false);
  todayData = signal<List | null>(null);

  getBackgroundImage = (status: Status, isMorning: boolean) => {
    return (isMorning ? 'morning' : 'night') + '-' + status + '.mp4';
  };

  checkIsMorning = (sunrise: number, sunset: number) => {
    const sunriseLocal = new Date(sunrise * 1000);
    const sunsetLocal = new Date(sunset * 1000);
    const date = new Date();
    return date > sunriseLocal && date < sunsetLocal;
  };

  sendCurrentloc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lon = position.coords.longitude;
          this.lat = position.coords.latitude;
          this.weatherServ.getCity(this.lat, this.lon).subscribe((res) => {
            console.log(res);

            this.weatherServ.getforecast(res[0].name).subscribe((forres) => {
              this.forecast.set(forres);
              this.todayData.set(forres.list[0]);
              console.log(this.forecast());
            });
            this.weatherServ.getDailyData(res[0].name).subscribe((dailyres) => {
              this.dailyData.set(dailyres);

              console.log(this.dailyData());
            });
          });

          this.loaded.set(true);
        },
        () => this.toast.error('Error in API calls')
      );
    } else {
      this.toast.error('Geolocation is not supported by your browser.');
    }
  }

  onChangeCity(cityName: string) {
    this.weatherServ.getforecast(cityName).subscribe(
      (res) => {
        this.forecast.set(res);
        this.todayData.set(res.list[0]);
      },
      (err) => this.toast.error(`City "${cityName}" Not Found`)
    );

    this.weatherServ.getDailyData(cityName).subscribe((res) => this.dailyData.set(res));
  }

  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  currentVideo = signal(
    'getBackgroundImage(todayData()!.weather[0].main, checkIsMorning(forecast()?.city?.sunrise!, forecast()?.city?.sunset!)).mp4'
  );

  changeVideo(newSrc: string) {
    this.currentVideo.set(newSrc);
    setTimeout(() => {
      this.bgVideo.nativeElement.load();
    });
  }
}
