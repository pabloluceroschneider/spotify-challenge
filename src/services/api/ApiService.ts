import axios from 'axios';
import { FetchAlbumsParams } from '@/types';

class ApiServiceSingleton {
  private static instance: any;

  private domain = '/api';

  private restclient = axios.create({
    baseURL: this.domain,
    timeout: 3000,
  });

  constructor() {
    if (typeof ApiServiceSingleton.instance === 'object') {
      return ApiServiceSingleton.instance;
    }
    ApiServiceSingleton.instance = this;
    return this;
  }

  public async fetchAlbums({
    q,
    year,
    limit,
    offset = 0,
    type = 'album',
  }: FetchAlbumsParams) {
    try {
      const params = { q, year, type, offset, limit };
      const { data } = await this.restclient.get('/spotify/search', {
        params,
      });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message); // Logger Service
      }
      throw error;
    }
  }

  public async fetchAlbumById(id: string) {
    try {
      const { data } = await this.restclient.get(`/v1/albums/${id}`);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message); // Logger Service
      }
      throw error;
    }
  }
}

export const ApiService = new ApiServiceSingleton();
