import { Routes } from '@angular/router';
import { taskScheduleRoutes } from '@app/task-schedule/routes';

export const appRoutes: Routes = [{ path: '', children: taskScheduleRoutes }];
