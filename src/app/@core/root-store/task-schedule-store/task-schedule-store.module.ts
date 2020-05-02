import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { taskSchedulerReducers } from '@core/root-store/task-schedule-store/task-schedule.reducers';
import { TaskScheduleEffects } from '@core/root-store/task-schedule-store/task-schedule.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('taskScheduler', taskSchedulerReducers),
    EffectsModule.forFeature([TaskScheduleEffects]),
  ],
})
export class TaskScheduleStoreModule {}
