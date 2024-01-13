import { FC } from 'react';

import styles from './styles.module.css';

interface Props {
  type: 'info' | 'error' | 'warning';
  message: string;
}

export const Message: FC<Props> = ({ type, message }) => {
  return <div className={`${styles.error} ${type}`}>{message}</div>;
};
