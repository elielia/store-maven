import { initialTaskScheduleState, TaskScheduleState } from '@core/root-store/task-schedule-store/task-schedule.state';
import { Action, createReducer, on } from '@ngrx/store';
import {
  loadTeamsFailed,
  loadTeamsRequest,
  loadTeamsSuccess
} from '@core/root-store/task-schedule-store/task-schedule.actions';
import { LoadingState } from '@core/model/generics';

const reducer = createReducer(
  initialTaskScheduleState,
  on(loadTeamsRequest, (state) => (
    {
      ...state,
      teams: {
        data: null,
        state: LoadingState.Loading
      }
    }
  )),

  on(loadTeamsSuccess, (state, {teams}) => (
    {
      ...state,
      teams: {
        data: teams,
        state: LoadingState.Loaded
      }
    }
  )),

  on(loadTeamsFailed, (state) => (
    {
      ...state,
      teams: {
        data: null,
        state: LoadingState.Error
      }
    }
  ))
);

export function taskSchedulerReducers(state: TaskScheduleState = initialTaskScheduleState, action: Action)
  : TaskScheduleState {
  return reducer(state, action);
}