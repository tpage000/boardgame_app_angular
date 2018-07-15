import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, from, of } from 'rxjs';
import { 
  map, tap, mergeMap, startWith, debounceTime, distinctUntilChanged, switchMap 
} from 'rxjs/operators';
import { CollectionService } from '../../collection/collection.service';
import { PlayersService } from '../../players/players.service';
import { SessionsService } from '../sessions.service';
import { Router } from '@angular/router';

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
    private playersService: PlayersService,
    private sessionsService: SessionsService,
    private router: Router
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
    this.myControl.patchValue('');
    this.id = null;
  }

  setPlayer(player) {
    this.chosenPlayer = player;
  }

  addGameResult() {
    let player = {};
    if (this.players.find(player => player.username == this.playerNameControl.value)) {
      player['kind'] = this.chosenPlayer.kind;
      player['info'] = this.chosenPlayer.id;
      player['username'] = this.chosenPlayer.username;
      player['avatar'] = this.chosenPlayer.avatar;
    } else {
      player['username'] = this.playerNameControl.value;
    }
    let score = this.scoreControl.value;
    this.gameResults.push({ player, score });
    this.playerNameControl.patchValue('');
    this.scoreControl.reset();
  }

  submitSession($event) {
    $event.preventDefault();
    // check if guest is impromptu (add to db if new)
    this.checkForNewGuests()
      .subscribe(newGuests => {
        let game = this.id;
        let date = this.dateControl.value;
        let gameresults;

        newGuests.length > 0 
        ? gameresults = this.packageGameResults(newGuests)
        : gameresults = this.gameResults;

        let fullData = { game, date, gameresults };

        // if the game was added from the collection, it will have an id
        if (this.id) {
          this.sessionsService.addSession(fullData)
            .subscribe(res => {
              this.router.navigate(['/sessions']);
            })
        } else if (this.bggId) {
          // Todo: add the game to collection
          console.log('get game for bggId:', this.bggId);
        } else {
          console.log('No game chosen')
        }
      })
  } 

  checkForNewGuests() {
    let guestsToCreate = [];
    for (let result of this.gameResults) {
      if (!result.player.kind) guestsToCreate.push(result.player);
    }
    return this.playersService.addMultipleGuests(guestsToCreate)
  }

  packageGameResults(newGuests) {
    return this.gameResults.map(result => {
      newGuests.forEach(guest => {
        if (!result.player.kind && (result.player.username === guest.username)) {
          let constructedGuest = {
            avatar: guest.avatar,
            info: guest._id,
            kind: guest.kind,
            username: guest.username
          }
          result.player = constructedGuest;
          return result;
        }
      })
      return result;
    })
  }

}

