import { Task } from './task';

export interface Member {
  id: string;
  name: string;
  tasks: Task[];
}