import styles from './ArticleSkeleton.module.css';

export const ArticleSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={`${styles.block}`} style={{ width: 80, height: 11 }} />
          <div className={`${styles.block}`} style={{ width: 70, height: 11 }} />
        </div>
        <div className={`${styles.block}`} style={{ width: '90%', height: 18 }} />
        <div className={`${styles.block}`} style={{ width: '60%', height: 18 }} />
        <div className={`${styles.block}`} style={{ width: '100%', height: 13 }} />
        <div className={`${styles.block}`} style={{ width: '100%', height: 13 }} />
        <div className={`${styles.block}`} style={{ width: '75%', height: 13 }} />
      </div>
    </div>
  );
};
