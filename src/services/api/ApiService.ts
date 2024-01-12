import axios from 'axios';

const apiDomain = {
  local: 'http://localhost:3000/api',
  prod: '',
};

const request = axios.create({
  baseURL: apiDomain.local,
  timeout: 3000,
});

export class ApiService {
  static async fetchAlbums(
    q: string | string[],
    year?: number,
    type = 'album'
  ) {
    if (!q) return;

    try {
      const params = { q, year, type };
      const { data } = await request.get('/spotify/search', {
        params,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async fetchAlbumById(id: string) {
    try {
      const { data } = await request.get(`v1/albums/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
