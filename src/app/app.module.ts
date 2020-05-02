import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from '@app/routes';
import { ShellModule } from '@app/shell/shell.module';
import { CoreModule } from '@core/core.module';
import { TaskScheduleModule } from '@app/task-schedule/task-schedule.module';

@NgModule({
  imports: [BrowserModule, CoreModule, ShellModule, TaskScheduleModule, RouterModule.forRoot(appRoutes)],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
