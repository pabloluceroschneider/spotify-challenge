import { NextApiRequest, NextApiResponse } from 'next';
import { SpotifyService } from '@/services/spotify/SpotifyService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q, year, offset } = req.query;

  const { albums } = await SpotifyService.fetchAlbums({
    q,
    year: Number(year),
    offset: Number(offset),
  });

  res.status(200).json(albums);
}
