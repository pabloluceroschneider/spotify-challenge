import { Albums } from '@/types/search';

export enum ReducerActionKind {
  SET_DATA = 'SET_DATA',
  ADD_DATA = 'ADD_DATA',
  CLEAN_DATA = 'CLEAN_DATA',
}

export interface ReducerState {
  data: Albums;
  q: string;
  year: number;
}

export interface ReducerAction {
  type: ReducerActionKind;
  payload: Record<string, any>;
}
