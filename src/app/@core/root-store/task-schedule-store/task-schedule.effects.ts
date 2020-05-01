import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api/api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadTeamsRequest, loadTeamsSuccess,
  TaskScheduleActionTypes
} from '@core/root-store/task-schedule-store/task-schedule.actions';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class TaskScheduleEffects {

  loadTeamsRequestEffects$ = createEffect(() => this.actions$.pipe(
    ofType(loadTeamsRequest.type),
    switchMap(() => this.apiService.getTeams().pipe(
      map(teams => loadTeamsSuccess({teams}))
    ))
  ))
  ;

  constructor(private actions$: Actions<TaskScheduleActionTypes>, private apiService: ApiService) {}

}