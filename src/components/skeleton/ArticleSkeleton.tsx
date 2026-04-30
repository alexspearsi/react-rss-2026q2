import { Component } from 'react';
import styles from './ArticleSkeleton.module.css';

export class ArticleSkeleton extends Component {
  render() {
    return (
      <div className={styles.card}>
        <div className={`${styles.image} ${styles.block}`} />

        <div className={styles.body}>
          <div className={styles.header}>
            <div className={styles.block} style={{ width: 60, height: 10 }} />
            <div className={styles.block} style={{ width: 80, height: 10 }} />
          </div>

          <div className={styles.block} style={{ width: '100%', height: 15 }} />
          <div className={styles.block} style={{ width: '100%', height: 15 }} />
          <div className={styles.block} style={{ width: '100%', height: 15 }} />

          <div className={styles.block} style={{ width: '100%', height: 15 }} />
          <div className={styles.block} style={{ width: '100%', height: 15 }} />
        </div>
      </div>
    );
  }
}
