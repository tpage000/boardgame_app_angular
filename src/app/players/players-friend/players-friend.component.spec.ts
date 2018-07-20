import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersFriendComponent } from './players-friend.component';

describe('PlayersFriendComponent', () => {
  let component: PlayersFriendComponent;
  let fixture: ComponentFixture<PlayersFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
