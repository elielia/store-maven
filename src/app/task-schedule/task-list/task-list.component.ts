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
        return '#ccffcc';
      case TaskType[TaskType.SLEEP]:
        return '#ffcccc';
      case TaskType[TaskType.EAT]:
        return '#ccccff';
      case TaskType[TaskType.QA]:
        return '#ffffcc';
      default:
        return 'grey';
    }
  }
}
