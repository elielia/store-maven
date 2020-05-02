import { AppState } from '@core/root-store/app.state';
import { createSelector } from '@ngrx/store';
import { TaskScheduleState } from '@core/root-store/task-schedule-store/task-schedule.state';
import { LoadingState } from '@core/model/generics';
import { Team } from '@core/model/team';
import { Utils } from '@core/utils';

const selectTaskScheduler = (state: AppState) => state.taskScheduler;

export const selectTeams = createSelector(selectTaskScheduler, (state: TaskScheduleState) => state.teams);

export const selectTeamsAsList = createSelector(selectTaskScheduler, (state: TaskScheduleState) => ({
  ...state.teams,
  data: state.teams.data ? Object.values(state.teams.data) : null,
}));

export const selectFilterByEmployee = createSelector(
  selectTaskScheduler,
  (state: TaskScheduleState) => state.filterByEmployee
);

export const selectStartDate = createSelector(selectTaskScheduler, (state: TaskScheduleState) => state.startDate);

export const selectEndDate = createSelector(selectTaskScheduler, (state: TaskScheduleState) => state.endDate);

export const selectDateRange = createSelector(selectStartDate, selectEndDate, (startDate: Date, endDate: Date) =>
  Utils.getDatesBetween(startDate, endDate)
);

export const selectDisplayedMembers = createSelector(
  selectTeams,
  selectFilterByEmployee,
  (teams, filteredByEmployee) => {
    if (teams.state !== LoadingState.Loaded) {
      return null;
    }

    return Object.values(teams.data)
      .map((team: Team) =>
        Object.values(team.members).filter((member) => (filteredByEmployee ? true : member.isSelected))
      )
      .reduce((acc, e) => acc.concat(e));
  }
);
