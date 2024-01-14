import { FC } from 'react';

import { Albums } from '@/types';
import { Album } from '@/components/album';

import styles from './styles.module.css';

export interface Props {
  data: Albums;
}

export const AlbumList: FC<Props> = ({ data }) => {
  return (
    <section className={styles.search}>
      <div className={styles.results}>
        {data?.items?.map((album) => (
          <Album
            key={album.id}
            id={album.id}
            name={album.name}
            artists={album.artists}
            images={album.images}
          />
        ))}
      </div>
    </section>
  );
};
