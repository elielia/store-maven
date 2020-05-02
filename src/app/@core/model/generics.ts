export enum LoadingState {
  NotLoaded,
  Loading,
  Loaded,
  Error,
}

export interface StatedData<T> {
  data: T;
  state: LoadingState;
}
