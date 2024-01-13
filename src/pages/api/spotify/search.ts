import { NextApiRequest, NextApiResponse } from 'next';
import { SpotifyService } from '@/services/spotify/SpotifyService';
import { AxiosError } from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q, year, offset, limit } = req.query;

  try {
    const { albums } = await SpotifyService.fetchAlbums({
      q,
      year: Number(year),
      offset: Number(offset),
      limit: Number(limit),
    });

    res.status(200).json(albums);
  } catch (error) {
    const defaultError = { message: error };

    if (error instanceof AxiosError) {
      const status = error.response?.status || 500;
      const data = error.response?.data || defaultError;
      return res.status(status).json(data.message);
    }

    return res.status(500).json(defaultError);
  }
}
