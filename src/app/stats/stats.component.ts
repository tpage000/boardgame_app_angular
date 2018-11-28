import { Component, OnInit } from '@angular/core';
import { StatsService } from './stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  plays: any = [];

  constructor(
    private statsService: StatsService,
  ) { }

  ngOnInit() {
    this.statsService.getPlays()
      .subscribe(res => {
        console.log(res);
        this.plays = res;
      });
  }

}
