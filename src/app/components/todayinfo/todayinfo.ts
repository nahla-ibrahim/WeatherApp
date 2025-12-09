import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-todayinfo',
  imports: [DatePipe],
  templateUrl: './todayinfo.html',
  styleUrl: './todayinfo.css',
})
export class Todayinfo {
  forecastData = input<List[] | null>(null);
  today = new Date().toLocaleDateString('en-CA');

  todayForecast = computed<List[]>(() => {
    const data = this.forecastData();
    if (!data) return [];
    return data.filter((item) => item.dt_txt.split(' ')[0] === this.today);
  });
}
