import { Component, input, OnInit } from '@angular/core';
import { Weather } from '../../types/forecast';

@Component({
  selector: 'app-cityinfo',
  imports: [],
  templateUrl: './cityinfo.html',
  styleUrl: './cityinfo.css',
})
export class Cityinfo implements OnInit {
  ngOnInit(): void {
    this.consoleFunc();
  }
  city = input<string>();
  country = input<string>();
  weather = input<Weather[]>([]);
  temp = input<number>(0);
  consoleFunc() {
    console.log(this.weather());
  }
}
