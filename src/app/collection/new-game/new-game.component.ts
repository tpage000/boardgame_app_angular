import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  myControl = new FormControl();

  bggIdControl = new FormControl();

  gameResult;

  constructor(private collectionService: CollectionService) { }

  ngOnInit() {
  }

  searchForGame() {
    let title = this.myControl.value;
    this.collectionService.searchForGame(title)
      .subscribe(res => console.log(res));
  }

  getGameByBGGId() {
    let id = this.bggIdControl.value;
    console.log(id);
    this.collectionService.getGameByBGGId(id)
      .subscribe(res => {
        console.log(res);
        this.gameResult = res;
      }
  }

  addToCollection() {
    let game = this.gameResult;
    this.collectionService.addToCollection(game)
      .subscribe(res => {
        console.log(res);
      })
  }
}
