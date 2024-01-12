import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { SpotifyService } from '@/services/spotify/SpotifyService';
import styles from '@/styles/Album.module.css';

const mmToMMSS = (miliseconds: number) => {
  const minutes = Math.ceil(miliseconds / 60000);
  const seconds = String(miliseconds % 60000).slice(0, 2);
  return `${minutes}:${seconds}`;
};

export default function Home({ album }: any) {
  console.log({ album });
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
            {items?.map((song: any) => (
              <li key={song.id} className={styles.item}>
                <div className={styles.trackNumber}>{song.track_number}</div>
                <div className={styles.songDetails}>
                  <div className={styles.songName}>{song.name}</div>
                  <div className={styles.songArtists}>
                    {song.artists.map((artist: any) => artist.name).join(', ')}
                  </div>
                </div>
                <div className={styles.duration}>
                  {mmToMMSS(song.duration_ms)}
                </div>
              </li>
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
