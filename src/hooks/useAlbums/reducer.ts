import { ReducerAction, ReducerActionKind, ReducerState } from './types';

export function albumsReducer(state: ReducerState, action: ReducerAction) {
  const { type, payload } = action;

  const actions: Record<
    ReducerActionKind,
    (payload: Record<string, any>) => ReducerState
  > = {
    [ReducerActionKind.SET_DATA]: ({ data, q, year }) => ({
      ...state,
      data,
      q,
      year,
    }),

    [ReducerActionKind.ADD_DATA]: ({ data }) => ({
      ...state,
      data: {
        ...data,
        items: [...state.data.items, ...data.items],
      },
    }),

    [ReducerActionKind.CLEAN_DATA]: () => ({
      ...state,
      data: {
        ...state.data,
        items: [],
      },
    }),
  };

  return actions[type]?.(payload) || state;
}
