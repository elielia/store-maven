import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api/api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadTasksForTeamMembersRequest,
  loadTasksForTeamMembersSuccess,
  loadTeamsRequest,
  loadTeamsSuccess,
  memberFilterChange,
  TaskScheduleActionTypes,
  teamFilterChange
} from '@core/root-store/task-schedule-store/task-schedule.actions';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  selectEndDate,
  selectStartDate,
  selectTeams
} from '@core/root-store/task-schedule-store/task-schedule.selectors';
import { AppState } from '@core/root-store/app.state';
import { Store } from '@ngrx/store';

@Injectable()
export class TaskScheduleEffects {

  loadTeamsRequestEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTeamsRequest.type),
      switchMap(() => this.apiService.getTeams().pipe(map((teams) => loadTeamsSuccess({ teams }))))
    )
  );

  memberFilterChangeEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(memberFilterChange.type),
      filter((action) => action.value),
      withLatestFrom(this.store.select(selectTeams)),
      map(([action, teams]) => teams.data[action.teamId].members[action.memberId]),
      filter((member) => !member.tasks),
      map((member) => loadTasksForTeamMembersRequest({ teamId: member.teamId, membersIds: [member.id] }))
    )
  );

  teamFilterChangeEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamFilterChange.type),
      filter((action) => action.value),
      withLatestFrom(this.store.select(selectTeams)),
      map(([action, teams]) => ({
        membersIds: Object.values(teams.data[action.teamId].members)
          .filter((member) => !member.tasks)
          .map((member) => member.id),
        teamId: action.teamId,
      })),
      filter(({ membersIds, teamId }) => membersIds.length > 0),
      map(({ membersIds, teamId }) => loadTasksForTeamMembersRequest({ teamId, membersIds }))
    )
  );

  loadTasksForMembersRequestEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasksForTeamMembersRequest.type),
      withLatestFrom(this.store.select(selectStartDate), this.store.select(selectEndDate)),
      switchMap(([action, startDate, endDate]) =>
        this.apiService
          .getTasksForIds(action.membersIds, startDate, endDate)
          .pipe(map((taskList) => loadTasksForTeamMembersSuccess({ teamId: action.teamId, taskList })))
      )
    )
  );

  constructor(
    private store: Store<AppState>,
    private actions$: Actions<TaskScheduleActionTypes>,
    private apiService: ApiService
  ) {}
}
