import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { SpotifyService } from '@/services/spotify/SpotifyService';
import { SearchForm } from '@/components/search-form';
import { AlbumList } from '@/components/album-list';
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
}

export default function Home({ albums, query }: Props) {
  const { data, handleInput, handleOffset } = useAlbums({
    initialData: albums,
    ...query,
  });

  return (
    <>
      <Head>
        <title>Filadd Music - Search</title>
      </Head>
      <main className={`${styles.main}`}>
        <h1 className={`${styles.title}`}>Filadd Music</h1>
        <SearchForm onChange={handleInput} />
        <AlbumList data={data} />
        {Boolean(data?.items?.length) && data?.next && (
          <button onClick={handleOffset} className={styles.loadMore}>
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
    q: query.q && String(query.q),
    year: Number(query.number),
    type: query.type ? (query.type as AlbumQueryType) : undefined,
    limit: query.limit ? Number(query.limit) : undefined,
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
      },
    };
  }
};
