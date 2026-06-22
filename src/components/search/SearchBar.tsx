'use client';

import { useActionState, useState } from 'react';

import { searchAction } from '@/actions/search';
import { useTranslations } from 'next-intl';

import styles from './SearchBar.module.css';

interface Props {
  initialValue: string;
}

export const SearchBar = ({ initialValue }: Props) => {
  const [value, setValue] = useState(initialValue);
  const [, formAction, isPending] = useActionState(searchAction, null);
  const t = useTranslations('search');

  return (
    <form className={styles.form} action={formAction}>
      <input
        className={styles.input}
        name="search"
        type="text"
        placeholder={t('placeholder')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isPending}
      />
      <button className={styles.button} type="submit" disabled={isPending}>
        {t('button')}
      </button>
    </form>
  );
};
