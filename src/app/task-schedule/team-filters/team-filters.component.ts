import { Component, OnInit } from '@angular/core';
import { AppState } from '@core/root-store/app.state';
import { selectFilterByEmployee, selectTeams } from '@core/root-store/task-schedule-store/task-schedule.selectors';
import { Store } from '@ngrx/store';
import { filterByEmployeeChange } from '@core/root-store/task-schedule-store/task-schedule.actions';

@Component({
  selector: 'app-team-filter',
  templateUrl: './team-filters.component.html',
  styleUrls: ['./team-filters.component.scss']
})
export class TeamFiltersComponent {

  teams$ = this.store.select(selectTeams);
  filterByEmployee$ = this.store.select(selectFilterByEmployee);

  constructor(private store: Store<AppState>) { }

  onFilterByEmployeeChange(value: boolean) {
    this.store.dispatch(filterByEmployeeChange({value}));
  }

}
