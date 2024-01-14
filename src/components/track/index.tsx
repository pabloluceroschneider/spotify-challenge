import { FC } from 'react';

import { milisecondsToMinutes } from '@/utils/milisecondsToMinutes';
import { ItemTrack } from '@/types';

import styles from './styles.module.css';

export type Props = Pick<
  ItemTrack,
  'id' | 'track_number' | 'name' | 'artists' | 'duration_ms'
>;

export const Track: FC<Props> = ({
  id,
  track_number,
  name,
  artists,
  duration_ms,
}) => {
  return (
    <li key={id} className={styles.item}>
      <div className={styles.trackNumber}>{track_number}</div>
      <div className={styles.songDetails}>
        <div className={styles.songName}>{name}</div>
        <div data-testid="artists" className={styles.songArtists}>
          {artists.map((artist: any) => artist.name).join(', ')}
        </div>
      </div>
      <div data-testid="duration_ms" className={styles.duration}>
        {milisecondsToMinutes(duration_ms)}
      </div>
    </li>
  );
};
