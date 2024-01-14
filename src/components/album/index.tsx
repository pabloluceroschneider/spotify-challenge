import Link from 'next/link';
import Image from 'next/image';

import { Item } from '@/types';

import styles from './styles.module.css';
import { FC } from 'react';

export type Props = Pick<Item, 'id' | 'name' | 'artists' | 'images'>;

export const Album: FC<Props> = ({ id, name, artists, images }) => {
  return (
    <Link id={id} href={`album/${id}`}>
      <div className={styles.album} title={name}>
        <div className={styles['album-details']}>
          <h3 className={styles['album-name']}>{name}</h3>
          <p>{artists[0].name}</p>
        </div>
        <Image
          className={styles['album-img']}
          src={images[0].url}
          alt={name}
          fill
        />
      </div>
    </Link>
  );
};
