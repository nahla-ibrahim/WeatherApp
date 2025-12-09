import { Component, EventEmitter, inject, input, Output, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Weather } from '../../services/weather';

@Component({
  selector: 'app-search',
  imports: [FontAwesomeModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  weatherServ = inject(Weather);
  search = faSearch;
  searchText = signal('');

  @Output() citySelected = new EventEmitter<string>();

  onInput(city: string) {
    this.searchText.set(city);
  }

  searchCity() {
    if (this.searchText().length) {
      this.citySelected.emit(this.searchText());
    }
  }
}
