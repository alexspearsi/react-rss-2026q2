import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Article } from '../../types/article';
import { fetchArticleById } from '../../api/articles';
import { formatDate } from '../../utils/format-date';
import styles from './ArticleDetail.module.css';

export const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const controller = new AbortController();

    fetchArticleById(id, controller.signal)
      .then((data: Article) => {
        setArticle(data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        if (err.name === 'AbortError') {
          return;
        }

        setError('Failed to load articles.');
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!article) {
    return null;
  }

  return (
    <div className={styles.panel}>
      <img
        src={article.image_url}
        alt={article.title}
        className={styles.image}
      />

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.site}>{article.news_site}</span>
          <span className={styles.date}>
            {formatDate(article.published_at)}
          </span>
        </div>

        <h2 className={styles.title}>{article.title}</h2>
        <p className={styles.summary}>{article.summary}</p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Read full article
        </a>
      </div>
    </div>
  );
};
