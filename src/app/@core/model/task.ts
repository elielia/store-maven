export enum TaskType {
  SLEEP,
  EAT,
  DEVELOP,
  QA,
}

export interface Task {
  id?: string;
  name: string;
  date?: Date;
  type: TaskType;
}
