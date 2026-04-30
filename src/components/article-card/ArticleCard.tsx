import { Component } from 'react';
import type { Article } from '../../types/article';
import styles from './ArticleCard.module.css';

interface Props {
  article: Article;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export class ArticleCard extends Component<Props> {
  render() {
    const { article } = this.props;

    return (
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
      >
        <img
          src={article.image_url}
          alt={article.title}
          className={styles.image}
        />

        <div className={styles.body}>
          <div className={styles.header}>
            <span className={styles.site}>{article.news_site}</span>
            <span className={styles.date}>
              {formatDate(article.published_at)}
            </span>
          </div>

          <h3 className={styles.title}>{article.title}</h3>
          <p className={styles.summary}>{article.summary}</p>
        </div>
      </a>
    );
  }
}
