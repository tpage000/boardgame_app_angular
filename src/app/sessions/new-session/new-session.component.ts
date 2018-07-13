import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, from, of } from 'rxjs';
import { 
  map, tap, mergeMap, startWith, debounceTime, distinctUntilChanged, switchMap 
} from 'rxjs/operators';
import { CollectionService } from '../../collection/collection.service';
import { PlayersService } from '../../players/players.service';

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

  players;

  filteredPlayers;

  chosenPlayer;

  constructor(
    private collectionService: CollectionService,
    private playersService: PlayersService
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
    // autocomplete players with friends and guests
    this.playersService.getFriendsAndGuestsAndSelf()
      .subscribe(res => {
        this.players = res;
        this.filteredPlayers = this.playerNameControl.valueChanges.pipe(
          startWith(''),
          map(value => this._playerFilter(value))
        );
      });
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _playerFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.players.filter(player => player.username.toLowerCase().includes(filterValue));
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

  setPlayer(player) {
    this.chosenPlayer = player;
  }

  addGameResult() {
    let player = { kind: '', info: '', username: '', avatar: '' };
    if (this.players.find(player => player.username == this.playerNameControl.value)) {
      player.kind = this.chosenPlayer.kind;
      player.info = this.chosenPlayer.id;
      player.username = this.chosenPlayer.username;
      player.avatar = this.chosenPlayer.avatar;
    } else {
      player.kind = 'Guest';
      player.info = null;
      player.username = this.playerNameControl.value;
      player.avatar = null;
    }
    let score = this.scoreControl.value;
    this.gameResults.push({ player, score });
    // this.playerNameControl.reset();
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
      console.log('get game for bggId:', this.bggId);
    } else {
      console.log('No game chosen')
    }
  } 

}

