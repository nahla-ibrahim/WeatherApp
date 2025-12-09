import { Component, input } from '@angular/core';
import { List } from '../../types/DailyData';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weekinfo',
  imports: [DatePipe],
  templateUrl: './weekinfo.html',
  styleUrl: './weekinfo.css',
})
export class Weekinfo {
  data = input<List[]>();
}
