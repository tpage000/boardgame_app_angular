import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subject, from, of} from 'rxjs';
import {map, mergeMap, startWith} from 'rxjs/operators';
import { CollectionService } from '../../collection/collection.service';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})
export class NewSessionComponent implements OnInit {

  myControl = new FormControl();

  options;

  filteredOptions: Observable<string[]>;

  constructor(
    private collectionService: CollectionService
  ) {}

  ngOnInit() {
    this.collectionService.getCollection()
      .subscribe(res => {
        this.options = res;
        let gameNames = this.options.map(({ name }) => name)
        this.options = gameNames;
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
