import { Member } from '@core/model/member';

export interface Team {
  id: string;
  name: string;
  members: {
    [id: string]: Member
  }
}