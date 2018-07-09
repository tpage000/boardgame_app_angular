import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CollectionService } from '../collection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  myControl = new FormControl();

  bggIdControl = new FormControl();

  gameResult;

  constructor(
    private collectionService: CollectionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  searchForGame() {
    let title = this.myControl.value;
    this.collectionService.searchForGame(title)
      .subscribe(res => console.log(res));
  }

  getGameByBGGId() {
    let id = this.bggIdControl.value;
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
