import Link from 'next/link';
import Image from 'next/image';

import { Albums } from '@/types/spotify';

import styles from './styles.module.css';
import { FC } from 'react';

interface Props {
  data: Albums;
}

export const AlbumList: FC<Props> = ({ data }) => {
  return (
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
  );
};
