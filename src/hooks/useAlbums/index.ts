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
    event.preventDefault();

    const { name, value } = event.target;
    const { q, year } = store;

    const fetchParams = { q, year, [name]: value };

    const response = await ApiService.fetchAlbums(fetchParams);

    return dispatch({
      type: ReducerActionKind.SET_DATA,
      payload: { data: response, ...fetchParams },
    });
  });

  const handleOffset = debounce(async () => {
    const { q, year, data } = store;

    const response = await ApiService.fetchAlbums({
      q,
      year,
      offset: data.offset + data.limit,
    });

    return dispatch({
      type: ReducerActionKind.ADD_DATA,
      payload: {
        data: response,
      },
    });
  });

  return { ...store, handleInput, handleOffset };
};
