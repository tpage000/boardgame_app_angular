import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionComponent } from './collection/collection.component';
import { SessionsComponent } from './sessions/sessions.component';
import { StatsComponent } from './stats/stats.component';
import { AccountsComponent } from './accounts/accounts.component';
import { PlayersComponent } from './players/players.component';

import { NewSessionComponent } from './sessions/new-session/new-session.component';
import { NewGameComponent } from './collection/new-game/new-game.component';
import { PlayersFriendComponent } from './players/players-friend/players-friend.component';

import { GameDetailComponent } from './collection/game-detail/game-detail.component'; 
import { SessionDetailComponent } from './sessions/session-detail/session-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/account',
    pathMatch: 'full'
  },
  {
    path: 'games',
    component: CollectionComponent
  },
  {
    path: 'games/new',
    component: NewGameComponent
  },
  {
    path: 'games/:id',
    component: GameDetailComponent
  },
  {
    path: 'sessions',
    component: SessionsComponent
  },
  {
    path: 'sessions/new',
    component: NewSessionComponent
  },
  {
    path: 'sessions/:id',
    component: SessionDetailComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'account',
    component: AccountsComponent
  },
  {
    path: 'players',
    component: PlayersComponent
  },
  {
    path: 'players/:id',
    component: PlayersFriendComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
