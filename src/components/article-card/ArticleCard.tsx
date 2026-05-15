import styles from './ArticleCard.module.css';
import type { Article } from '../../types/article';
import { formatDate } from '../../utils/format-date';
import { NavLink } from 'react-router';

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
  return (
    <NavLink
      to={`/articles/${article.id}`}
      className={({ isActive }) =>
        `${styles.card} ${isActive ? styles.cardActive : ''}`
      }
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
    </NavLink>
  );
};
