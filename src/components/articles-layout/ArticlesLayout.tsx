import styles from './ArticlesLayout.module.css';

interface Props {
  list: React.ReactNode;
  detail?: React.ReactNode;
}

export function ArticlesLayout({ list, detail }: Props) {
  return (
    <div className={styles.layout}>
      <div className={detail ? `${styles.list} ${styles.listWithDetail}` : styles.listExpanded}>
        {list}
      </div>
      {detail && <div className={styles.detail}>{detail}</div>}
    </div>
  );
}
