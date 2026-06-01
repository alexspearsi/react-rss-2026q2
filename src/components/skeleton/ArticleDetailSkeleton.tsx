import styles from './ArticleDetailSkeleton.module.css';

export const ArticleDetailSkeleton = () => {
  return (
    <div className={styles.panel}>
      <div className={`${styles.image} ${styles.block}`} />

      <div className={styles.body}>
        <div className={styles.meta}>
          <div className={styles.block} style={{ width: 80, height: 11 }} />
          <div className={styles.block} style={{ width: 70, height: 11 }} />
        </div>

        <div className={styles.block} style={{ width: '100%', height: 22 }} />
        <div className={styles.block} style={{ width: '75%', height: 22 }} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            marginTop: 4,
          }}
        >
          <div className={styles.block} style={{ width: '100%', height: 14 }} />
          <div className={styles.block} style={{ width: '100%', height: 14 }} />
          <div className={styles.block} style={{ width: '100%', height: 14 }} />
          <div className={styles.block} style={{ width: '60%', height: 14 }} />
        </div>

        <div className={styles.block} style={{ width: 140, height: 36, borderRadius: 6 }} />
      </div>
    </div>
  );
};
