import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskScheduleComponent } from '@app/task-schedule/task-schedule.component';
import { SharedModule } from '@shared';
import { TeamFiltersComponent } from './team-filters/team-filters.component';
import { FilterComponent } from './team-filters/filter/filter.component';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  declarations: [
    TaskScheduleComponent,
    TeamFiltersComponent,
    FilterComponent,
    TaskListComponent
  ],
  imports: [
    SharedModule
  ],
})
export class TaskScheduleModule {}
