import { ReducerAction, ReducerActionKind, ReducerState } from './types';

export function albumsReducer(state: ReducerState, action: ReducerAction) {
  const { type, payload } = action;

  const actions: Record<
    ReducerActionKind,
    (payload: Record<string, string>) => ReducerState
  > = {
    [ReducerActionKind.SET_DATA]: ({ data }) => ({
      ...state,
      data,
    }),

    [ReducerActionKind.ADD_DATA]: ({ data }) => ({
      ...state,
      data: state.data.push(data),
    }),

    [ReducerActionKind.SET_INPUT]: ({ name, value }) => ({
      ...state,
      [name]: value,
    }),

    [ReducerActionKind.SET_OFFSET]: () => ({
      ...state,
      offset: state.offset + 1,
    }),
  };

  return actions[type]?.(payload) || state;
}
