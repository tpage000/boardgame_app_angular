import { Component, OnInit } from '@angular/core';
import { SessionsService } from './sessions.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  sessions = [];

  constructor(private sessionsService: SessionsService) { }

  ngOnInit() {
    this.sessionsService.getSessions()
      .subscribe(res => {
        this.sessions = res;
      });
  }

}
