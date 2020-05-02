import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Team } from '@core/model/team';
import { AppState } from '@core/root-store/app.state';
import { Store } from '@ngrx/store';
import { teamFilterChange } from '@core/root-store/task-schedule-store/task-schedule.actions';
import { Member } from '@core/model/member';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  private _team: Team;
  private _state: 'UNCHECKED' | 'INDETERMINATE' | 'CHECKED';

  constructor(private store: Store<AppState>) {}

  @Input()
  set team(value: Team) {
    this._team = value;
    const members: Member[] = Object.values(this.team.members);
    const selectedMembers = members.filter((member) => member.isSelected);
    if (selectedMembers.length === 0) {
      this._state = 'UNCHECKED';
    } else if (selectedMembers.length < members.length) {
      this._state = 'INDETERMINATE';
    } else {
      this._state = 'CHECKED';
    }
  }

  get team() {
    return this._team;
  }

  get state() {
    return this._state;
  }

  onTeamFilterChange(value: boolean) {
    this.store.dispatch(teamFilterChange({ teamId: this.team.id, value }));
  }
}
