import { DatePipe, NgClass } from '@angular/common';
import { Component, computed, input, OnInit, signal } from '@angular/core';
import { List } from '../../types/forecast';
import { dailyList } from '../../types/DailyData';

@Component({
  selector: 'app-forecast',
  imports: [DatePipe, NgClass],
  templateUrl: './forecast.html',
  styleUrl: './forecast.css',
})
export class forecast implements OnInit {
  ngOnInit(): void {
    this.todayForecast();
  }
  forecastData = input<List[] | null>(null);
  data = input<dailyList[]>();

  forecast24H = signal<List[]>([]);
  isActive = signal<'one' | 'two'>('one');

  todayForecast() {
    const data = this.forecastData();
    this.forecast24H.set(data!.splice(0, 7));
  }

  activeForecast(clicked: 'one' | 'two') {
    this.isActive.set(clicked);
  }
}
