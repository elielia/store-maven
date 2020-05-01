import { createAction, props, union } from '@ngrx/store';
import { Team } from '@core/model/team';
import { TaskList } from '@core/model/member';

export const loadTeamsRequest = createAction(
  '[Task Schedule Component] Load Teams request',
);

export const loadTeamsSuccess = createAction(
  '[Task Schedule Component] Load Teams success',
  props<{ teams: {[id: string]: Team}; }>()
);

export const loadTeamsFailed = createAction(
  '[Task Schedule Component] Load Teams failed'
);

export const filterByEmployeeChange = createAction(
  '[Team Filter Component] Filter by employee checkbox changed',
  props<{ value: boolean; }>()
);

export const teamFilterChange = createAction(
  '[Team Filter Component] Team checkbox value changed',
  props<{ teamId: string, value: boolean; }>()
);

export const memberFilterChange = createAction(
  '[Task List Component] Member checkbox value changed',
  props<{ teamId: string, memberId: string, value: boolean; }>()
);

export const loadTasksForTeamMembersRequest = createAction(
  'Load Tasks for Team Members',
  props<{ teamId: string, membersIds: string[] }>()
);

export const loadTasksForTeamMembersSuccess = createAction(
  'Load Tasks for Team Members success',
  props<{ teamId: string, taskList: { [memberId: string]: TaskList} }>()
);

const all = union({
  loadTeamsRequest,
  loadTeamsSuccess,
  loadTeamsFailed,
  filterByEmployeeChange,
  teamFilterChange,
  memberFilterChange,
  loadTasksForTeamMembersRequest,
  loadTasksForTeamMembersSuccess
});

export type TaskScheduleActionTypes = typeof all;