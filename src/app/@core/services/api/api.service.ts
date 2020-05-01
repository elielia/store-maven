import { Injectable } from '@angular/core';
import { Team } from '@core/model/team';
import { Observable, of } from 'rxjs';
import { Member, TaskList } from '@core/model/member';
import { delay } from 'rxjs/operators';
import { Task, TaskType } from '@app/@core/model/task';
import { Utils } from '@core/utils';

@Injectable()
export class ApiService {

  private numOfTeams = 10;
  private numOfMembers = 6;

  constructor() {}

  getTeams(): Observable<{[id: string]: Team}> {

    const teams = {};

    for (let i = 0; i < this.numOfTeams; i++) {

      const teamId = `team-${i}`;

      const team = {
        id: teamId,
        name: teamId,
        members: {}
      }

      for (let j = 0; j < this.numOfMembers; j++) {

        const member: Member = {
          id: `team-${i}-member-${j}`,
          name: `team-${i}-member-${j}`,
          isSelected: false,
          tasks: null,
          teamId
        }

        team.members[member.id] = member;
      }

      teams[team.id] = team;

    }

    return of(teams).pipe(
      delay(2500)
    );

  }

  getTasksForIds(ids: string[], startDate: Date, endDate: Date): Observable<{ [id: string]: TaskList }> {

    const res = {};

    const dates: Date[] = Utils.getDatesBetween(startDate, endDate);

    ids.forEach(id => {

      const tasks: TaskList = {};

      dates.forEach(date => {
        if (Math.random() < 0.7) {
          tasks[date.toString()] = this.generateRandomTask();
        }
      })

      res[id] = tasks;

    })

    return of(res);
  }

  private generateRandomTask(): Task {

    const enumValues = (Object.values(TaskType) as unknown) as TaskType[];
    const randomTaskType: TaskType = enumValues[Utils.randomIntFromInterval(1,4)];
    return {
      name: 'task-' + Utils.randomIntFromInterval(1, 10000),
      type: randomTaskType
    };
  }
}
