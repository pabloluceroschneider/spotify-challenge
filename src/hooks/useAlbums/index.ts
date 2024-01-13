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

  /**
   * Updates albumns on change `q` and `year`
   */
  useEffect(() => {
    const { q, year, offset } = store;

    if (!q && !year) return;

    const fetchAlbums = async () => {
      const data = await ApiService.fetchAlbums({
        q,
        year: Number(year),
        offset: offset ? Number(offset) : undefined,
      });

      dispatch({
        type: ReducerActionKind.SET_DATA,
        payload: { data },
      });
    };

    fetchAlbums();
  }, [store.q, store.year]);

  /**
   * Updates albumns on change `offset`
   */
  useEffect(() => {
    const { q, year, offset } = store;
    if (!offset) return;
    const fetchAlbums = async () => {
      const data = await ApiService.fetchAlbums({
        q,
        year: Number(year),
        offset: Number(offset),
      });

      dispatch({
        type: ReducerActionKind.ADD_DATA,
        payload: { data },
      });
    };

    fetchAlbums();
  }, [store.offset]);

  const handleInput = debounce((event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const { name, value } = event.target;
    return dispatch({
      type: ReducerActionKind.SET_INPUT,
      payload: { name, value },
    });
  });

  const handleOffset = debounce((): void => {
    return dispatch({ type: ReducerActionKind.SET_OFFSET, payload: {} });
  });

  return { ...store, handleInput, handleOffset };
};
