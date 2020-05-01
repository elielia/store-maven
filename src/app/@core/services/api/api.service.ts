import { Injectable } from '@angular/core';
import { Team } from '@core/model/team';
import { Observable, of } from 'rxjs';
import { Member } from '@core/model/member';
import { delay } from 'rxjs/operators';

export const teams: Team[] = [
  {
    id: 'team-1',
    name: 'R&D',
    members: {
      'member-1': {
        id: 'member-1',
        name: 'Lior Abulafia',
        tasks: null
      },
      'member-2': {
        id: 'member-1',
        name: 'Abed Hamudi',
        tasks: null
      },
      'member-3': {
        id: 'member-1',
        name: 'Adiv Bareket',
        tasks: null
      },
      'member-4': {
        id: 'member-1',
        name: 'Adiv Bareket',
        tasks: null
      }
    }
  }
]

@Injectable()
export class ApiService {

  private numOfTeams = 10;
  private numOfMembers = 6;

  constructor() {}

  getTeams(): Observable<Team[]> {
    for (let i = 0; i < this.numOfTeams; i++) {

      const team = {
        id: `team-${i}`,
        name: `team-${i}`,
        members: {}
      }

      for (let j = 0; j < this.numOfMembers; j++) {

        const member: Member = {
          id: `member-${i}`,
          name: `member-${i}`,
          tasks: null
        }

        team[member.id] = member;
      }
    }

    return of(teams).pipe(
      delay(2500)
    );

  }
}
