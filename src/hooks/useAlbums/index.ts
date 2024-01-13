import { type ChangeEvent, useEffect, useReducer } from 'react';
import { ApiService } from '@/services/api/ApiService';
import { albumsReducer } from './reducer';
import { ReducerActionKind } from './types';
import { debounce } from '../../utils/debounce';

interface Params {
  initialData: any;
  q: string;
  year: string;
  offset: string;
}

export const useAlbums = ({ initialData = [], q, year, offset }: Params) => {
  const [store, dispatch] = useReducer(albumsReducer, {
    ...initialData,
    q,
    year,
    offset,
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
