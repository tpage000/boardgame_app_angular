import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionComponent } from './collection/collection.component';
import { SessionsComponent } from './sessions/sessions.component';
import { FriendsComponent } from './friends/friends.component';
import { StatsComponent } from './stats/stats.component';
import { AccountsComponent } from './accounts/accounts.component';
import { PlayersComponent } from './players/players.component';

import { NewSessionComponent } from './sessions/new-session/new-session.component';
import { NewGameComponent } from './collection/new-game/new-game.component';

const routes: Routes = [
  {
    path: 'collection',
    component: CollectionComponent
  },
  {
    path: 'sessions',
    component: SessionsComponent
  },
  {
    path: 'players/friends',
    component: FriendsComponent
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
    path: 'collection/new',
    component: NewGameComponent
  },
  {
    path: 'players',
    component: PlayersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
