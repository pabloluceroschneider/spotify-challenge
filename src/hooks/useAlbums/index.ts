import { type ChangeEvent, useReducer } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ApiService } from '@/services/api/ApiService';
import { Albums } from '@/types/search';

import { debounce } from '../../utils/debounce';
import { albumsReducer } from './reducer';
import { ReducerActionKind } from './types';

interface Params {
  initialData: Albums;
  q: string;
  year: number;
}

export const useAlbums = ({ initialData, q, year }: Params) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [store, dispatch] = useReducer(albumsReducer, {
    data: initialData,
    q,
    year,
  });

  const setURLParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    replace(`${pathname}?${params.toString()}`);
  };

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

      dispatch({
        type: ReducerActionKind.SET_DATA,
        payload: { data: response, ...fetchParams },
      });

      setURLParams(name, value);
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

      dispatch({
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
