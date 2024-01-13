import { Album } from './albums';

export * from './albums';

export * from './search';

export interface Image {
  height: number;
  width: number;
  url: string;
}

export type AlbumType =
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
  type?: AlbumType;
  offset?: number;
  limit?: number;
}

export interface Search {
  albums: Albums;
}

interface Artist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export type SearchResponse = AxiosResponse<Search>;
export type AlbumResponse = AxiosResponse<Album>;
