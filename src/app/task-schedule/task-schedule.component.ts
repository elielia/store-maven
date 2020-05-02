import { Component, OnInit } from '@angular/core';
import { AppState } from '@core/root-store/app.state';
import { Store } from '@ngrx/store';
import { selectTeams } from '@core/root-store/task-schedule-store/task-schedule.selectors';
import { take } from 'rxjs/operators';
import { LoadingState } from '@core/model/generics';
import { loadTeamsRequest } from '@core/root-store/task-schedule-store/task-schedule.actions';

@Component({
  selector: 'app-home',
  templateUrl: './task-schedule.component.html',
  styleUrls: ['./task-schedule.component.scss'],
})
export class TaskScheduleComponent implements OnInit {
  teams$ = this.store.select(selectTeams);
  loadingState = LoadingState;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.teams$.pipe(take(1)).subscribe((teams) => {
      if (teams.state === LoadingState.NotLoaded) {
        this.store.dispatch(loadTeamsRequest());
      }
    });
  }
}
