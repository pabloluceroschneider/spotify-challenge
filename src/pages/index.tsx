import { useState, type ChangeEvent, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { SpotifyService } from '@/services/spotify/SpotifyService';
import { ApiService } from '@/services/api/ApiService';

import { SearchForm } from '@/components/search-form';

import type { AlbumQueryType, Albums, Item } from '@/types/spotify';

import styles from '@/styles/Search.module.css';

interface Query {
  q: string;
  year: number;
  offset: number;
  limit: number;
}

interface Props {
  albums: Albums;
  query: Query;
  error?: string;
}

const limit = 12;

export default function Home({ albums, query: initialQuery }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [result, setResult] = useState<Item[]>(albums.items || []);
  const [query, setQuery] = useState<Query>({
    ...initialQuery,
    offset: 0,
    limit,
  });

  // Query hook
  // useEffect(() => {
  //   if (!query.q) return;

  //   const fetchAlbums = async () => {
  //     const response = await ApiService.fetchAlbums(
  //       query.q,
  //       query.year ? Number(query.year) : undefined,
  //       'album',
  //       query.offset
  //     );

  //     setResult(response.items);

  //     const params = new URLSearchParams(searchParams);
  //     params.set('q', query.q);
  //     query.year && params.set('year', String(query.year));
  //     replace(`${pathname}?${params.toString()}`);
  //   };

  //   fetchAlbums();
  // }, [query.q, query.year]);

  // Pagination Hook
  // useEffect(() => {
  //   if (!query.offset) return;

  //   const fetchAlbums = async () => {
  //     const response = await ApiService.fetchAlbums(
  //       query.q,
  //       query.year ? Number(query.year) : undefined,
  //       'album',
  //       query.offset
  //     );

  //     setResult((prevRes) => [...prevRes, ...response.items]);

  //     const params = new URLSearchParams(searchParams);
  //     params.set('page', String(query.offset / query.limit + 1));
  //     replace(`${pathname}?${params.toString()}`);
  //   };

  //   fetchAlbums();
  // }, [query.offset]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;

    setQuery((prevQ) => ({
      ...prevQ,
      [name]: value,
    }));
  };

  const handleLoadMoreAlbums = async () =>
    setQuery((prevQ) => ({
      ...prevQ,
      offset: prevQ.offset + limit,
    }));

  return (
    <>
      <Head>
        <title>Filadd Music - Search</title>
      </Head>
      <main className={`${styles.main}`}>
        <h1 className={`${styles.title}`}>Filadd Music</h1>
        <SearchForm onChange={handleChange} />
        <section className={`${styles.search}`}>
          <div className={`${styles.results}`}>
            {result?.map((album) => (
              <Link key={album.id} href={`album/${album.id}`}>
                <div className={`${styles.album}`} title={album.name}>
                  <div className={`${styles['album-details']}`}>
                    <h3 className={`${styles['album-name']}`}>{album.name}</h3>
                    <p>{album.artists[0].name}</p>
                  </div>
                  <Image
                    className={`${styles['album-img']}`}
                    src={album.images[0].url}
                    alt={album.name}
                    fill
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
        {Boolean(result.length) && albums.next && (
          <button onClick={handleLoadMoreAlbums} className={styles.loadMore}>
            Cargar más albums
          </button>
        )}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const fetchParams = {
    q: String(query.q),
    year: Number(query.number),
    limit: query.offset ? Number(query.offset) * limit : limit,
    type: query.type ? (query.type as AlbumQueryType) : undefined,
  };

  try {
    const response = await SpotifyService.fetchAlbums(fetchParams);
    return {
      props: {
        albums: response?.albums,
        query,
      },
    };
  } catch (error) {
    return {
      props: {
        query,
        error:
          error instanceof Error ? error.message : 'Internal Server Error ',
      },
    };
  }
};
