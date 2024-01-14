import axios from 'axios';
import type { FetchAlbumsParams } from '@/types';

class SpotifyServiceSingleton {
  private static instance: any;

  private domains = {
    prod: 'https://api.spotify.com',
  };

  private SPOTIFY_TOKEN_API = process.env.SPOTIFY_TOKEN_API;

  private restclient = axios.create({
    baseURL: this.domains.prod,
    timeout: 3000,
    headers: {
      Authorization: `Bearer ${this.SPOTIFY_TOKEN_API}`,
    },
  });

  constructor() {
    if (typeof SpotifyServiceSingleton.instance === 'object') {
      return SpotifyServiceSingleton.instance;
    }
    SpotifyServiceSingleton.instance = this;
    return this;
  }

  /**
   * fetch albums by query and year
   */
  public async fetchAlbums({
    q,
    year,
    limit = 12,
    offset = 0,
    type = 'album',
  }: FetchAlbumsParams): Promise<any> {
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

      const { data } = await this.restclient('/v1/search', {
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

  /**
   * fetch albums by id
   */
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

export const SpotifyService = new SpotifyServiceSingleton();
