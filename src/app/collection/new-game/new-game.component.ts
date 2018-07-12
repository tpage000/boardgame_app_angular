import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CollectionService } from '../collection.service';
import { Router } from '@angular/router';
import { Observable, Subject, from, of } from 'rxjs';
import { 
  map, tap, mergeMap, startWith, debounceTime, distinctUntilChanged, switchMap 
} from 'rxjs/operators';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  myControl = new FormControl();

  searchControl = new FormControl();

  bggIdControl = new FormControl();

  searchTerms = new Subject();

  searchOptions: Observable<any>;

  gameResult;

  constructor(
    private collectionService: CollectionService,
    private router: Router
  ) { }

  ngOnInit() {
    // autocomplete game search with delayed http requests
    this.searchOptions = this.searchTerms.pipe(
      debounceTime(300), 
      distinctUntilChanged(), 
      switchMap(term => this.collectionService.searchForGame(term))
    );
  }

  search(term) {
    this.searchTerms.next(term);
  }

  getGameByBGGId(id) {
    this.collectionService.getGameByBGGId(id)
      .subscribe(res => {
        this.gameResult = res;
      });
  }

  addToCollection() {
    let game = this.gameResult;
    this.collectionService.addToCollection(game)
      .subscribe(res => {
        this.router.navigate(['/collection']);
      });
  }
}
