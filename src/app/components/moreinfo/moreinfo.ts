import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWind, faDroplet, faTemperature4, faCloud } from '@fortawesome/free-solid-svg-icons';
import { Wind } from '../../types/forecast';
@Component({
  selector: 'app-moreinfo',
  imports: [FontAwesomeModule],
  templateUrl: './moreinfo.html',
  styleUrl: './moreinfo.css',
})
export class Moreinfo {
  fontIcon = { faWind, faDroplet, faTemperature4, faCloud };
  wind = input<Wind>();
  humidity = input<number>();
  temp = input<number>();
  cloud = input<number>();
}
