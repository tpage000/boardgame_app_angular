import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
  MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, 
  MatTreeModule, MatToolbarModule, MatFormFieldModule, MatInputModule, 
  MatRadioModule, MatAutocompleteModule, MatTooltipModule
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainInterceptor } from './_interceptors/main.interceptor';

import { SessionsComponent } from './sessions/sessions.component';
import { AccountsComponent } from './accounts/accounts.component';
import { FriendsComponent } from './friends/friends.component';
import { CollectionComponent } from './collection/collection.component';
import { StatsComponent } from './stats/stats.component';
import { NewSessionComponent } from './sessions/new-session/new-session.component';
import { NewCollectionComponent } from './collection/new-collection/new-collection.component';
import { NewGameComponent } from './collection/new-game/new-game.component';

@NgModule({
  declarations: [
    AppComponent,
    SessionsComponent,
    AccountsComponent,
    FriendsComponent,
    CollectionComponent,
    StatsComponent,
    NewSessionComponent,
    NewCollectionComponent,
    NewGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { 
        provide: HTTP_INTERCEPTORS, 
        useClass: MainInterceptor, 
        multi: true 
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
