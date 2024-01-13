export enum ReducerActionKind {
  SET_DATA = 'SET_DATA',
  ADD_DATA = 'ADD_DATA',
  SET_INPUT = 'SET_INPUT',
  SET_OFFSET = 'SET_OFFSET',
}

export interface ReducerState {
  data: any;
  q: string;
  year: string;
  offset: string;
}

export interface ReducerAction {
  type: `${ReducerActionKind}`;
  payload: Record<string, any>;
}
