import { useState, FC, ChangeEvent, ChangeEventHandler } from 'react';
import styles from './styles.module.css';

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const SearchForm: FC<Props> = ({ onChange }) => {
  return (
    <form className={styles.form}>
      <input
        id="q"
        name="q"
        placeholder="Search Album"
        className={styles.qInput}
        onChange={onChange}
      />
      <input
        id="year"
        name="year"
        placeholder="Year"
        type="number"
        className={styles.yearInput}
        onChange={onChange}
      />
    </form>
  );
};
