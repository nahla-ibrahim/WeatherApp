import { Component, inject, input } from '@angular/core';
import { Weather } from '../../types';
import { TEMP_C } from '../../constants';

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
  tempC = TEMP_C;
}
