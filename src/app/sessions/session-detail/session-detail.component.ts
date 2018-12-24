import { Component, OnInit } from '@angular/core';
import { SessionDetailService } from './session-detail.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnInit {

  id: String;

  session;

  constructor(
    private sessionService: SessionDetailService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id'])
      this.id = params['id'];
      this.sessionService.getSession(this.id)
        .subscribe(data => {
          this.session = data;
          console.log(this.session);
        }, err => {
          console.log(err);
        })
    });
  }

}
