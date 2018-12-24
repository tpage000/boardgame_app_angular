import { Component, OnInit } from '@angular/core';
import { CollectionService } from './collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  collection:any =[];

  constructor(private collectionService: CollectionService) { }

  ngOnInit() {
    this.collectionService.getCollection()
      .subscribe(res => {
        this.collection = res;
        this.collection.sort((a, b) => {
          if (a.createdAt > b.createdAt)
            return -1;
          if (a.createdAt < b.createdAt)
            return 1;
          return 0;
        });
      })
  }

}
