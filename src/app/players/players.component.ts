import { Component, OnInit } from '@angular/core';
import { PlayersService } from './players.service';
import { FormControl } from '@angular/forms';
import { 
  map, tap, mergeMap, startWith, debounceTime, distinctUntilChanged, switchMap 
} from 'rxjs/operators';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  findFriendControl = new FormControl();

  users: any;

  guests: any;

  friends: any = [];

  filteredUsers;

  newFriend;

  constructor(private playersService: PlayersService) { }

  ngOnInit() {
    this.playersService.getAllUsers()
      .subscribe(res => {
        this.users = res;
        this.filteredUsers = this.findFriendControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      })
    this.playersService.getGuests()
      .subscribe(res => {
        this.guests = res
      })
    this.playersService.getFriends()
      .subscribe(res => {
        this.friends = res
      })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.username.toLowerCase().includes(filterValue));
  }

  selectUser(newFriend) {
    this.newFriend = newFriend;
  }

  submitAddFriend() {
    if (this.newFriend) {
      this.findFriendControl.reset();
      this.playersService.addToFriends(this.newFriend._id)
        .subscribe(res => {
          this.friends.push(this.newFriend);
        });
    }
  }
}
