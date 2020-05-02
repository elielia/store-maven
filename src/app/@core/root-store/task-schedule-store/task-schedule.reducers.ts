import { initialTaskScheduleState, TaskScheduleState } from '@core/root-store/task-schedule-store/task-schedule.state';
import { Action, createReducer, on } from '@ngrx/store';
import {
  filterByEmployeeChange,
  loadTasksForTeamMembersSuccess,
  loadTeamsFailed,
  loadTeamsRequest,
  loadTeamsSuccess,
  memberFilterChange,
  teamFilterChange
} from '@core/root-store/task-schedule-store/task-schedule.actions';
import { LoadingState } from '@core/model/generics';
import { Member } from '@core/model/member';

const reducer = createReducer(
  initialTaskScheduleState,
  on(loadTeamsRequest, (state) => ({
    ...state,
    teams: {
      data: null,
      state: LoadingState.Loading,
    },
  })),

  on(loadTeamsSuccess, (state, { teams }) => ({
    ...state,
    teams: {
      data: teams,
      state: LoadingState.Loaded,
    },
  })),

  on(loadTeamsFailed, (state) => ({
    ...state,
    teams: {
      data: null,
      state: LoadingState.Error,
    },
  })),

  on(filterByEmployeeChange, (state, { value }) => ({
    ...state,
    filterByEmployee: value,
  })),

  on(teamFilterChange, (state, { teamId, value }) => {
    const teamMembers = { ...state.teams.data[teamId].members };

    Object.keys(teamMembers).forEach((memberId) => {
      teamMembers[memberId] = {
        ...teamMembers[memberId],
        isSelected: value,
      };
    });

    const team = {
      ...state.teams.data[teamId],
      members: teamMembers,
    };

    return {
      ...state,
      teams: {
        ...state.teams,
        data: {
          ...state.teams.data,
          [teamId]: team,
        },
      },
    };
  }),

  on(memberFilterChange, (state, { teamId, memberId, value }) => {
    const member: Member = {
      ...state.teams.data[teamId].members[memberId],
      isSelected: value,
    };

    const team = {
      ...state.teams.data[teamId],
      members: {
        ...state.teams.data[teamId].members,
        [memberId]: member,
      },
    };

    return {
      ...state,
      teams: {
        ...state.teams,
        data: {
          ...state.teams.data,
          [teamId]: team,
        },
      },
    };
  }),

  on(loadTasksForTeamMembersSuccess, (state, { teamId, taskList }) => {
    const teamMembers = { ...state.teams.data[teamId].members };

    Object.keys(taskList).forEach((memberId) => {
      teamMembers[memberId] = {
        ...teamMembers[memberId],
        tasks: taskList[memberId],
      };
    });

    const team = {
      ...state.teams.data[teamId],
      members: teamMembers,
    };

    return {
      ...state,
      teams: {
        ...state.teams,
        data: {
          ...state.teams.data,
          [teamId]: team,
        },
      },
    };
  })
);

export function taskSchedulerReducers(
  state: TaskScheduleState = initialTaskScheduleState,
  action: Action
): TaskScheduleState {
  return reducer(state, action);
}
