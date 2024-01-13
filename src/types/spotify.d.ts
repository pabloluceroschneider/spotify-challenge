import { AxiosResponse } from 'axios';

export type AlbumQueryType =
  | 'album'
  | 'artist'
  | 'playlist'
  | 'track'
  | 'show'
  | 'episode'
  | 'audiobook';

export interface FetchAlbumsParams {
  q: string | string[] | undefined;
  year?: number;
  type?: AlbumQueryType;
  offset?: number;
  limit?: number;
}

export type AlbumsResponse = AxiosResponse<{
  albums: Albums;
}>;

export interface Albums {
  href: string;
  items: Item[];
  limit: number;
  next: string;
  offset: number;
  previous?: any;
  total: number;
}

export interface Item {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: Externalurls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Artist {
  external_urls: Externalurls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Externalurls {
  spotify: string;
}
