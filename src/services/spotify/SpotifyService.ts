import axios from 'axios';

const spotifyDomains = {
  prod: 'https://api.spotify.com',
};

const request = axios.create({
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
  static async fetchAlbums(
    q: string | string[],
    year?: number,
    type = 'album'
  ) {
    if (!q) return;

    try {
      const yearQuery = year ? `year:${year}` : null;

      const query = [q, yearQuery].join(' ');

      const params = {
        q: query,
        type,
      };

      const { data } = await request.get('/v1/search', {
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
