import { Component, OnInit } from '@angular/core';
import { SessionDetailService } from './session-detail.service';
import { ActivatedRoute } from '@angular/router';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnInit {

  id: String;

  session;

  editingComments: boolean = false;

  commentsCtrl = new FormControl();

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
          this.commentsCtrl.setValue(this.session['comments']);
          console.log(this.session);
        }, err => {
          console.log(err);
        })
    });
  }

  editComments() {
    this.editingComments = true;
  }

  submitComments() {
    console.log(this.commentsCtrl.value)
    this.sessionService.submitComments(this.id, this.commentsCtrl.value)
      .subscribe(updated => {
        this.session['comments'] = updated['comments'];
        this.editingComments = false;
      }, err => {
        console.log(err);
      })
  }

}
