import { AlbumType, Artist, Image } from '.';

interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  copyrights: {
    text: string;
    type: string;
  }[];
  external_ids: {
    upc: string;
  };
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  tracks: Track;
  type: AlbumType;
  uri: string;
}

interface Track {
  href: string;
  items: ItemTrack[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

interface ItemTrack {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: AlbumType;
  uri: string;
}
