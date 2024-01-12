import { SpotifyService } from '@/services/spotify/SpotifyService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q = '', year } = req.query;

  const { albums } = await SpotifyService.fetchAlbums(q, Number(year));

  res.status(200).json(albums);
}
