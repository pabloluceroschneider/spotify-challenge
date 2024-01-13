import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { SpotifyService } from '@/services/spotify/SpotifyService';
import { Track } from '@/components/track';
import { Item } from '@/types/spotify';
import styles from '@/styles/Album.module.css';

export default function Home({ album }: any) {
  const { name, images, tracks } = album;
  const [image] = images;
  const { items } = tracks;

  const artists = album.artists.map((art: any) => art.name).join(', ');

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{name}</h1>
        <h3 className={styles.artists}>{artists}</h3>
        <section className={styles.detail}>
          <Image
            alt={name}
            src={image.url}
            width={image.width}
            height={image.height}
            layout="responsive"
          />
          <ul className={styles.list}>
            {items?.map((song: Item) => (
              <Track key={song.id} song={song} />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { id } = query;

  const response = await SpotifyService.fetchAlbumById(String(id));

  return {
    props: {
      album: response || {},
    },
  };
};
