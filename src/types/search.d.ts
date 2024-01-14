import { AxiosResponse } from 'axios';
import { Artist, Image } from '.';

interface Albums {
  href: string;
  items: Item[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

interface Item {
  album_type?: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date?: string;
  release_date_precision?: string;
  total_tracks: number;
  type: AlbumType;
  uri: string;
}
