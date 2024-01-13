import axios from 'axios';
import { FetchAlbumsParams } from '@/types/spotify';

const HttpClient = axios.create({
  baseURL: '/api',
  timeout: 3000,
});

export class ApiService {
  static async fetchAlbums({
    q,
    year,
    limit,
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
