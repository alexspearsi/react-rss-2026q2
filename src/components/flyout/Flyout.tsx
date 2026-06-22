'use client';

import { downloadCsv } from '@/actions/downloadCsv';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearItems } from '@/store/selectedItemsSlice';
import { useTranslations } from 'next-intl';

import styles from './Flyout.module.css';

export const Flyout = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.selectedItems.items);
  const t = useTranslations('flyout');

  if (items.length === 0) {
    return null;
  }

  async function handleDownload() {
    const csv = await downloadCsv(items);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = `${items.length}_items.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className={styles.spacer} aria-hidden="true" />
      <div className={styles.flyout}>
        <span className={styles.count}>{t('selected', { count: items.length })}</span>
        <div className={styles.actions}>
          <button onClick={() => dispatch(clearItems())} className={styles.btnSecondary}>
            {t('unselect')}
          </button>
          <button onClick={handleDownload} className={styles.btnPrimary}>
            {t('download')}
          </button>
        </div>
      </div>
    </>
  );
};
