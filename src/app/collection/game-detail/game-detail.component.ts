import { Component, OnInit } from '@angular/core';
import { GameDetailService } from './game-detail.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {

  id: String;

  game;

  sessions;

  constructor(
    private gameService: GameDetailService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id'])
       this.id = params['id'];
      this.gameService.getGame(this.id)
        .subscribe(data => {
          this.game = data['game'];
          this.sessions = data['sessions'];
          console.log(this.game);
          console.log(this.sessions);
        }, err => {
          console.log(err);
        })
    });
  }

}
