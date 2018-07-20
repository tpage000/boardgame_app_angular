import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../players.service'

@Component({
  selector: 'app-players-friend',
  templateUrl: './players-friend.component.html',
  styleUrls: ['./players-friend.component.scss']
})
export class PlayersFriendComponent implements OnInit {

  friend: any = { username: '' };

  games: any = [];

  sessions: any = [];

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayersService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.playerService.getOneFriend(params['id'])
        .subscribe(res => {
          console.log(res);
          this.friend = res['friend'];
          this.games = res['games'];
          this.sessions = res['sessions'];
        });
    })
  }

}
