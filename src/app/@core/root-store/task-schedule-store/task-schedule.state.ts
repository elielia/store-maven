import { Team } from '@core/model/team';
import { LoadingState, StatedData } from '@core/model/generics';

const dateRangeLength = 3;

// Mock today
const today = new Date();
today.setHours(0,0,0,0,);

// Mock days in @dateRangeLength days
const lastDate = new Date();
lastDate.setDate(lastDate.getDate() + dateRangeLength);
lastDate.setHours(0,0,0,0,);

export interface TaskScheduleState {
  filterByEmployee: boolean;
  teams: StatedData<{[id: string]: Team}>;
  startDate: Date;
  endDate: Date;
}

export const initialTaskScheduleState: TaskScheduleState = {
  filterByEmployee: false,
  teams: {
    data: null,
    state: LoadingState.NotLoaded
  },
  startDate: today,
  endDate: lastDate
}