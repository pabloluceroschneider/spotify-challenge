import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { SpotifyService } from '@/services/spotify/SpotifyService';

import { SearchForm } from '@/components/search-form';
import { useAlbums } from '@/hooks/useAlbums';

import type { AlbumQueryType, Albums } from '@/types/spotify';

import styles from '@/styles/Search.module.css';

interface Query {
  q: string;
  year: number;
}

interface Props {
  albums: Albums;
  query: Query;
  error?: string;
}

export default function Home({ albums, query, error }: Props) {
  const { data, handleInput, handleOffset } = useAlbums({
    initialData: albums,
    ...query,
  });

  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      <Head>
        <title>Filadd Music - Search</title>
      </Head>
      <main className={`${styles.main}`}>
        <h1 className={`${styles.title}`}>Filadd Music</h1>
        <SearchForm onChange={handleInput} />
        <section className={`${styles.search}`}>
          <div className={`${styles.results}`}>
            {data?.items?.map((album: any) => (
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
        {Boolean(data?.items?.length) && data?.next && (
          <button onClick={handleOffset} className={styles.loadMore}>
            Cargar más albums
          </button>
        )}
        {error && <div>{error}</div>}
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const fetchParams = {
    q: query.q && String(query.q),
    year: Number(query.number),
    type: query.type ? (query.type as AlbumQueryType) : undefined,
  };

  try {
    const response = await SpotifyService.fetchAlbums(fetchParams);
    return {
      props: {
        albums: response?.albums || {},
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
