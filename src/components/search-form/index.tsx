import { useSearchParams } from 'next/navigation';
import { FC, ChangeEventHandler } from 'react';
import styles from './styles.module.css';

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const SearchForm: FC<Props> = ({ onChange }) => {
  const searchParams = useSearchParams();

  return (
    <form className={styles.form}>
      <input
        id="q"
        name="q"
        placeholder="Search Album"
        className={styles.qInput}
        defaultValue={searchParams.get('q') as string}
        onChange={onChange}
      />
      <input
        id="year"
        name="year"
        placeholder="Year"
        type="number"
        defaultValue={searchParams.get('year') as string}
        className={styles.yearInput}
        onChange={onChange}
      />
    </form>
  );
};
