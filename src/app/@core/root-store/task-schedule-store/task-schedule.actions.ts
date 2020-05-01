import { createAction, props, union } from '@ngrx/store';
import { Team } from '@core/model/team';

export const loadTeamsRequest = createAction(
  '[Task Schedule Component] Load Teams request]',
);

export const loadTeamsSuccess = createAction(
  '[Task Schedule Component] Load Teams success]',
  props<{ teams: Team[]; }>()
);

export const loadTeamsFailed = createAction(
  '[Task Schedule Component] Load Teams failed]'
);

const all = union({
  loadTeamsRequest,
  loadTeamsSuccess,
  loadTeamsFailed
});

export type TaskScheduleActionTypes = typeof all;