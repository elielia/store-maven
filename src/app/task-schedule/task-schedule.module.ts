import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskScheduleComponent } from '@app/task-schedule/task-schedule.component';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [
    TaskScheduleComponent
  ],
  imports: [
    SharedModule
  ],
})
export class TaskScheduleModule {}
