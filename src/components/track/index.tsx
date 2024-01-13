import { FC } from 'react';

import { Item } from '@/types/spotify';

import styles from './styles.module.css';

interface Props {
  song: Item;
}

const mmToMMSS = (miliseconds: number) => {
  const minutes = Math.floor(miliseconds / 60000);
  const seconds = String(miliseconds % 60000).slice(0, 2);
  return `${minutes}:${seconds}`;
};

export const Track: FC<Props> = ({ song }) => {
  return (
    <li key={song.id} className={styles.item}>
      <div className={styles.trackNumber}>{song.track_number}</div>
      <div className={styles.songDetails}>
        <div className={styles.songName}>{song.name}</div>
        <div className={styles.songArtists}>
          {song.artists.map((artist: any) => artist.name).join(', ')}
        </div>
      </div>
      <div className={styles.duration}>{mmToMMSS(song.duration_ms)}</div>
    </li>
  );
};
