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

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sessions',
    pathMatch: 'full'
  },
  {
    path: 'games',
    component: CollectionComponent
  },
  {
    path: 'sessions',
    component: SessionsComponent
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
    path: 'sessions/new',
    component: NewSessionComponent
  },
  {
    path: 'games/new',
    component: NewGameComponent
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
