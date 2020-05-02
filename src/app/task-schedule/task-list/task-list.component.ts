import { Component } from '@angular/core';
import { AppState } from '@core/root-store/app.state';
import { Store } from '@ngrx/store';
import {
  selectDateRange,
  selectDisplayedMembers,
  selectFilterByEmployee,
  selectTeamsAsList
} from '@core/root-store/task-schedule-store/task-schedule.selectors';
import { memberFilterChange } from '@core/root-store/task-schedule-store/task-schedule.actions';
import { TaskType } from '@core/model/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  teams$ = this.store.select(selectTeamsAsList);
  displayedMembers$ = this.store.select(selectDisplayedMembers);
  dates$ = this.store.select(selectDateRange);
  filterByEmployee$ = this.store.select(selectFilterByEmployee);

  constructor(private store: Store<AppState>) {}

  onMemberFilterChange(teamId: string, memberId: string, value: boolean) {
    this.store.dispatch(memberFilterChange({ teamId, memberId, value }));
  }

  paintTaskCell(taskType: string) {

    switch (taskType) {
      case TaskType[TaskType.DEVELOP]:
        return '#D2D1FF'
      case TaskType[TaskType.SLEEP]:
        return '#B8FFD4'
      case TaskType[TaskType.EAT]:
        return '#FFA49E'
      case TaskType[TaskType.QA]:
        return '#FFF0AB'
      default:
        return 'grey'
    }
  }
}
