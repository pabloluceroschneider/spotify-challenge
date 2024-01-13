import axios from 'axios';
import { FetchAlbumsParams } from '@/types/spotify';

const apiDomain = {
  local: 'http://localhost:3000/api',
  prod: '',
};

const HttpClient = axios.create({
  baseURL: apiDomain.local,
  timeout: 3000,
});

export class ApiService {
  static async fetchAlbums({
    q,
    year,
    limit = 12,
    offset = 0,
    type = 'album',
  }: FetchAlbumsParams) {
    try {
      const params = { q, year, type, offset, limit };
      const { data } = await HttpClient.get('/spotify/search', {
        params,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async fetchAlbumById(id: string) {
    try {
      const { data } = await HttpClient.get(`/v1/albums/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
