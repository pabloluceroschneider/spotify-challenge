import axios from 'axios';
import type { FetchAlbumsParams } from '@/types/spotify';

const spotifyDomains = {
  prod: 'https://api.spotify.com',
};

const HttpClient = axios.create({
  baseURL: spotifyDomains.prod,
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${process.env.SPOTIFY_TOKEN_API}`,
  },
});

export class SpotifyService {
  /**
   * This method fetchs albums by query, year, and type.
   * The final request is:
   * GET https://api.spotify.com/v1/search?q={q}%20year%3A{year}&type=album
   *     - header 'Authorization: Bearer ${process.env.SPOTIFY_TOKEN_API} '
   */
  static async fetchAlbums({
    q,
    year,
    limit = 12,
    offset = 0,
    type = 'album',
  }: FetchAlbumsParams) {
    if (!q) {
      return null;
    }

    try {
      const yearQuery = year ? `year:${year}` : null;

      const queries = [q, yearQuery].join(' '); // q=Duki year:2022

      const params = {
        q: queries,
        type,
        limit,
        offset,
      };

      const { data } = await HttpClient.get('/v1/search', {
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
