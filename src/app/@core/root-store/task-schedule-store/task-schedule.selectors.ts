import { AppState } from '@core/root-store/app.state';
import { createSelector } from '@ngrx/store';
import { TaskScheduleState } from '@core/root-store/task-schedule-store/task-schedule.state';
import { LoadingState } from '@core/model/generics';
import { Team } from '@core/model/team';

const selectTaskScheduler = (state: AppState) => state.taskScheduler;

export const selectTeams = createSelector(
  selectTaskScheduler,
  (state: TaskScheduleState) => ({
    ...state.teams,
    data: state.teams.data ? Object.values(state.teams.data) : []
  })
);

export const selectFilterByEmployee = createSelector(
  selectTaskScheduler,
  (state: TaskScheduleState) => state.filterByEmployee
);

export const selectStartDate = createSelector(
  selectTaskScheduler,
  (state: TaskScheduleState) => state.startDate
);

export const selectEndDate = createSelector(
  selectTaskScheduler,
  (state: TaskScheduleState) => state.endDate
);

export const selectDateRange = createSelector(
  selectStartDate,
  selectEndDate,
  (startDate: Date, endDate: Date) => {
    // Dates logic if needed
    return {start: startDate, end: endDate}
  }
);

export const selectDisplayedMembers = createSelector(
  selectTeams,
  selectFilterByEmployee,
  (teams, filteredByEmployee) => {

    if (teams.state !== LoadingState.Loaded) {
      return [];
    }

    return Object.values(teams.data)
      .map((team: Team) => Object.values(team.members).filter(member => filteredByEmployee ? true : member.isSelected))
      .reduce((acc, e) => acc.concat(e));
  }
);