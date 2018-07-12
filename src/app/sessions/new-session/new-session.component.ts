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

  playerNameControl = new FormControl();

  scoreControl = new FormControl();

  dateControl = new FormControl(new Date());

  id: number;

  bggId: number;

  options: any;

  filteredOptions: Observable<string[]>;

  searchTerms = new Subject();

  searchOptions: Observable<any>;

  gameResults = [];

  constructor(
    private collectionService: CollectionService
  ) {}

  ngOnInit() {
    // autocomplete game input with game options
    this.collectionService.getCollection()
      .subscribe(res => {
        this.options = res;
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
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  search(term) {
    this.searchTerms.next(term);
  }

  setId(id) {
    this.id = id;
    this.searchControl.reset();
    this.bggId = null;
  }

  setBGGId(bggId) {
    this.bggId = bggId;
    this.myControl.reset(); // this causes toLowerCase() filter error
    this.id = null;
  }

  addGameResult() {
    let player = { kind: '', info: '' };
    player.kind = 'Guest';
    player.info = this.playerNameControl.value;
    let score = this.scoreControl.value;
    this.gameResults.push({ player, score });
    this.playerNameControl.reset();
    this.scoreControl.reset();
  }

  submitSession() {
    if (this.id) {
      let game = this.id;
      let gameresults = this.gameResults;
      let date = this.dateControl.value;
      let data = { game, date, gameresults };
      console.log(data);
    } else if (this.bggId) {
      // add the game to collection
    } else {
      console.log('No game chosen')
    }
  } 

}

