import { Task } from './task';

export interface Member {
  id: string;
  name: string;
  isSelected: boolean;
  tasks?: Task[];
  teamId: string;
}
