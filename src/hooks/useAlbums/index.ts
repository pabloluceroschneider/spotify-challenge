import { type ChangeEvent, useEffect, useReducer } from 'react';
import { ApiService } from '@/services/api/ApiService';
import { albumsReducer } from './reducer';
import { ReducerActionKind } from './types';
import { debounce } from '../../utils/debounce';
import { Albums } from '@/types/spotify';

interface Params {
  initialData: Albums;
  q: string;
  year: number;
}

export const useAlbums = ({ initialData, q, year }: Params) => {
  const [store, dispatch] = useReducer(albumsReducer, {
    data: initialData,
    q,
    year,
  });

  const handleInput = debounce(async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      event.preventDefault();

      const { name, value } = event.target;
      const {
        q,
        year,
        data: { limit },
      } = store;

      const fetchParams = { q, year, limit, [name]: value };

      const response = await ApiService.fetchAlbums(fetchParams);

      return dispatch({
        type: ReducerActionKind.SET_DATA,
        payload: { data: response, ...fetchParams },
      });
    } catch (error) {
      dispatch({
        type: ReducerActionKind.CLEAN_DATA,
        payload: {},
      });
    }
  });

  const handleOffset = debounce(async () => {
    try {
      const {
        q,
        year,
        data: { offset, limit },
      } = store;

      const response = await ApiService.fetchAlbums({
        q,
        year,
        offset: offset + limit,
        limit,
      });

      return dispatch({
        type: ReducerActionKind.ADD_DATA,
        payload: {
          data: response,
        },
      });
    } catch (error) {
      dispatch({
        type: ReducerActionKind.CLEAN_DATA,
        payload: {},
      });
    }
  });

  return { ...store, handleInput, handleOffset };
};
