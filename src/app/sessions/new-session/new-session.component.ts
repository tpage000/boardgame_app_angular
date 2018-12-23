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

  id: number; // set if user selects game from collection

  bggId: number; // set if user chooses game from bgg

  options: any;

  filteredOptions: Observable<string[]>;

  searchTerms = new Subject();

  searchOptions: Observable<any>;

  gameResults = [];

  players;

  filteredPlayers;

  chosenPlayer;

  error: string = '';

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

  // keyup when user searches for game on bgg
  search(term) {
    this.searchTerms.next(term);
  }

  // when game from collection is selected, save the id
  setId(id) {
    this.id = id;
    this.searchControl.reset();
    this.bggId = null;
  }

  // when game from bgg is chosen, save the id
  setBGGId(bggId) {
    this.bggId = bggId;
    this.myControl.patchValue('');
    this.id = null;
  }

  setPlayer(player) {
    this.chosenPlayer = player;
  }

  addGameResult() {
    this.error = '';
    let player = {};
    // player is either a selected player ...
    if (this.players.find(player => player.username == this.playerNameControl.value)) {
      player['kind'] = this.chosenPlayer.kind;
      player['info'] = this.chosenPlayer.id;
      player['username'] = this.chosenPlayer.username;
      player['avatar'] = this.chosenPlayer.avatar;
    // ... or player is to be created
    } else {
      player['username'] = this.playerNameControl.value;
    }

    // check if player is already added (disallow duplicates)
    if (this.gameResults.find(gameResult => gameResult.player.username === player['username'])) {
      this.error = 'Duplicate username';
      this.playerNameControl.patchValue('');
      this.scoreControl.reset();
    } else {
      let score = this.scoreControl.value;
      if (score == null) {
        this.error = 'Score cannot be empty';
      } else {
        this.gameResults.push({ player, score });
        this.playerNameControl.patchValue('');
        this.scoreControl.reset();
      }
    }
  }

  removeGameResult(result) {
    this.error = '';
    let newResults = this.gameResults.filter(gameResult => {
      return gameResult.player.username !== result.player.username;
    });
    this.gameResults = newResults;
  }

  submitSession() {
    this.error = '';
    // check if guest is impromptu (add to db if new)
    this.checkForNewGuests()
      .subscribe(newGuests => {
        let date = this.dateControl.value;
        let gameresults;

        newGuests.length > 0 
        ? gameresults = this.packageGameResults(newGuests)
        : gameresults = this.gameResults;

        // if the game was added from the collection, it will have an id,
        // and the session with all data can be submitted
        if (this.id) {
          let game = this.id;
          let fullData = { game, date, gameresults };
          this.sessionsService.addSession(fullData)
            .subscribe(res => {
              this.router.navigate(['/sessions']);
            })
        } else if (this.bggId) {
        // if the game is added from bgg, it will not yet have an id,
        // so the game must first be added to the collection before the session
        // can be submitted
          this.collectionService.getGameByBGGId(this.bggId)
            .subscribe(bggGame => {
              this.collectionService.addToCollection(bggGame)
                .subscribe(addedGame => {
                  let game = addedGame['_id']; 
                  let fullData = { game, date, gameresults }
                  this.sessionsService.addSession(fullData)
                    .subscribe(res => {
                      this.router.navigate(['/sessions'])
                    })
                })
            })

        } else {
          this.error = 'No game chosen';
          // console.log('No game chosen')
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

