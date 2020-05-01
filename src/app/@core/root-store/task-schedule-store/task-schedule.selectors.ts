import { AppState } from '@core/root-store/app.state';
import { createSelector } from '@ngrx/store';
import { TaskScheduleState } from '@core/root-store/task-schedule-store/task-schedule.state';

const selectTaskScheduler = (state: AppState) => state.taskScheduler;

export const selectTeams = createSelector(
  selectTaskScheduler,
  (state: TaskScheduleState) => state.teams
);