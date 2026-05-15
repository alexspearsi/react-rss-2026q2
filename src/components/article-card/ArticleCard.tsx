import styles from './ArticleCard.module.css';
import type { Article } from '../../types/article';
import { formatDate } from '../../utils/format-date';

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
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
};
