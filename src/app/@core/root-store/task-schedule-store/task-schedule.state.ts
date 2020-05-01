import { Team } from '@core/model/team';
import { LoadingState, StatedData } from '@core/model/generics';

export interface TaskScheduleState {
  filterByEmployee: boolean;
  teams: StatedData<Team[]>;
  startDate: Date;
  endDate: Date;
}

export const initialTaskScheduleState: TaskScheduleState = {
  filterByEmployee: false,
  teams: {
    data: null,
    state: LoadingState.NotLoaded
  },
  startDate: new Date('24/05/2020'),
  endDate: new Date('29/05/2020'),
}