import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Team } from '@core/model/team';
import { AppState } from '@core/root-store/app.state';
import { Store } from '@ngrx/store';
import { teamFilterChange } from '@core/root-store/task-schedule-store/task-schedule.actions';
import { Member } from '@core/model/member';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {

  @Input() team: Team;

  constructor(private store: Store<AppState>) { }

  isChecked() {
    const members: Member[] = Object.values(this.team.members);
    return members.some(member => member.isSelected);
  }

  onTeamFilterChange(value: boolean) {
    this.store.dispatch(teamFilterChange({teamId: this.team.id, value}));
  }

}
