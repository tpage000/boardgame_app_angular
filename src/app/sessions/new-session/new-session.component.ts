import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, from, of } from 'rxjs';
import { 
  map, tap, mergeMap, startWith, debounceTime, distinctUntilChanged, switchMap 
} from 'rxjs/operators';
import { CollectionService } from '../../collection/collection.service';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})
export class NewSessionComponent implements OnInit {

  myControl = new FormControl();

  searchControl = new FormControl();

  options;

  private searchTerms = new Subject();

  filteredOptions: Observable<string[]>;

  searchOptions: any;

  constructor(
    private collectionService: CollectionService
  ) {}

  ngOnInit() {
    // autocomplete game input with game options
    this.collectionService.getCollection()
      .subscribe(res => {
        this.options = res;
        let gameNames = this.options.map(({ name }) => name);
        this.options = gameNames;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      });
    // autocomplete game search with delayed http requests
    this.searchOptions = this.searchTerms.pipe(
      debounceTime(300), 
      distinctUntilChanged(), 
      switchMap(term => this.collectionService.searchForGame(term))
    );
  }
  
  private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  search(term) {
    this.searchTerms.next(term);
  }

  submitSession() {
    console.log(this.myControl.value);
    console.log(this.searchControl.value);
  }

  logChoice() {
    console.log(this.myControl.value)
  }

  logSearch() {
    console.log(this.searchControl.value)
  }
}

