import { Component, OnInit } from '@angular/core';
import { AppState } from '@core/root-store/app.state';
import { Store } from '@ngrx/store';
import {
  selectDateRange, selectDisplayedMembers,
  selectFilterByEmployee,
  selectTeams
} from '@core/root-store/task-schedule-store/task-schedule.selectors';
import { filterByEmployeeChange, memberFilterChange } from '@core/root-store/task-schedule-store/task-schedule.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  teams$ = this.store.select(selectTeams);
  displayedMembers$ = this.store.select(selectDisplayedMembers);
  dates$ = this.store.select(selectDateRange);
  filterByEmployee$ = this.store.select(selectFilterByEmployee);

  constructor(private store: Store<AppState>) { }

  onMemberFilterChange(teamId: string, memberId: string, value: boolean) {
    this.store.dispatch(memberFilterChange({teamId, memberId, value}));
  }

}
