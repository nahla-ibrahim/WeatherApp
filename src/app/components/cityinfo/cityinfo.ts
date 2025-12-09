import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cityinfo',
  imports: [],
  templateUrl: './cityinfo.html',
  styleUrl: './cityinfo.css',
})
export class Cityinfo {
  city = input<string>();
  country = input<string>();
  weather = input<Weather[]>([]);
  temp = input<number>(0);
}
