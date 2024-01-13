import { FC, ChangeEventHandler, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import styles from './styles.module.css';

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const SearchForm: FC<Props> = ({ onChange }) => {
  const qRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (qRef.current && !qRef.current.value) {
      qRef.current.focus();
    }
  }, [qRef.current]);

  return (
    <form className={styles.form}>
      <input
        id="q"
        name="q"
        placeholder="Search Album"
        defaultValue={searchParams?.get('q') as string}
        onChange={onChange}
        className={`${styles.input} ${styles.qInput}`}
        ref={qRef}
        autoFocus
        data-testid="q-input"
      />
      <input
        id="year"
        name="year"
        placeholder="Year"
        type="number"
        defaultValue={searchParams?.get('year') as string}
        className={`${styles.input} ${styles.yearInput}`}
        onChange={onChange}
        data-testid="year-input"
      />
    </form>
  );
};
