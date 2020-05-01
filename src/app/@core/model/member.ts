import { Task } from './task';

export interface TaskList { [date: string]: Task }

export interface Member {
  id: string;
  name: string;
  isSelected: boolean;
  tasks?: TaskList,
  teamId: string;
}
