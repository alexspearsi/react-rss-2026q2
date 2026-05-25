import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearItems } from '../../store/selectedItemsSlice';
import styles from './Flyout.module.css';

export const Flyout = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.selectedItems.items);

  if (items.length === 0) {
    return null;
  }

  function handleDownload() {
    const header = [
      'id',
      'title',
      'summary',
      'url',
      'news_site',
      'published_at',
    ];
    const rows = items.map((item) => [
      item.id,
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.summary.replace(/"/g, '""')}"`,
      item.url,
      item.news_site,
      item.published_at,
    ]);

    const csv = [header, ...rows].map((row) => row.join(',')).join('\n');
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
        <span className={styles.count}>
          Selected: <strong>{items.length}</strong>
        </span>
        <div className={styles.actions}>
          <button
            onClick={() => dispatch(clearItems())}
            className={styles.btnSecondary}
          >
            Unselect all
          </button>
          <button onClick={handleDownload} className={styles.btnPrimary}>
            Download
          </button>
        </div>
      </div>
    </>
  );
};
