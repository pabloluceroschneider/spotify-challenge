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

import type { Albums, Item } from '@/types/spotify';

import styles from '@/styles/Search.module.css';

interface Props {
  albums: Albums;
}

export default function Home({ albums }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [result, setResult] = useState<Item[]>(albums.items);
  const [query, setQuery] = useState<{ q: string; year?: number }>({
    q: '',
    year: undefined,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, value } = event.target;

    setQuery((prevQ) => ({
      ...prevQ,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!query.q) return;

    const fetchAlbums = async () => {
      const response = await ApiService.fetchAlbums(
        query.q,
        query.year ? Number(query.year) : undefined
      );

      setResult(response.items);

      const params = new URLSearchParams(searchParams);
      params.set('q', query.q);
      query.year && params.set('year', String(query.year));
      replace(`${pathname}?${params.toString()}`);
    };

    fetchAlbums();
  }, [query]);

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
            {result?.map((album, index) => (
              <Link key={index} href={`album/${album.id}`}>
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
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { q = '', year } = query;

  const response = await SpotifyService.fetchAlbums(q, Number(year));

  return {
    props: {
      albums: response?.albums || {},
    },
  };
};
