import { FC } from 'react';

import { milisecondsToMinutes } from '@/utils/milisecondsToMinutes';
import { ItemTrack } from '@/types';

import styles from './styles.module.css';

export interface Props {
  song: ItemTrack;
}

export const Track: FC<Props> = ({ song }) => {
  return (
    <li key={song.id} className={styles.item}>
      <div className={styles.trackNumber}>{song.track_number}</div>
      <div className={styles.songDetails}>
        <div className={styles.songName}>{song.name}</div>
        <div data-testid="artists" className={styles.songArtists}>
          {song.artists.map((artist: any) => artist.name).join(', ')}
        </div>
      </div>
      <div data-testid="duration_ms" className={styles.duration}>
        {milisecondsToMinutes(song.duration_ms)}
      </div>
    </li>
  );
};
