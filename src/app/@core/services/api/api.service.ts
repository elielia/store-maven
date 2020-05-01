import { Injectable } from '@angular/core';
import { Team } from '@core/model/team';
import { Observable, of } from 'rxjs';
import { Member } from '@core/model/member';
import { delay } from 'rxjs/operators';

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
}
