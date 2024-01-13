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
  type?: `${AlbumQueryType}`;
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
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface Track {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: Externalurls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface Item {
  artists: Artist[];
  available_markets: string[];
  external_urls: Externalurls;
  href: string;
  id: string;
  name: string;
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
