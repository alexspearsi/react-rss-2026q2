import { useNavigate, useParams, useSearchParams } from 'react-router';
import { articlesApi, useGetArticleByIdQuery } from '../../store/articlesApi';
import { useAppDispatch } from '../../store/hooks';
import { formatDate } from '../../utils/format-date';
import { ArticleDetailSkeleton } from '../skeleton/ArticleDetailSkeleton';
import styles from './ArticleDetail.module.css';

export const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const backUrl = pageParam ? `/?page=${pageParam}` : '/';

  const dispatch = useAppDispatch();

  const {
    data: article,
    isLoading,
    isError,
    refetch,
  } = useGetArticleByIdQuery(id ?? '', { skip: !id });

  if (isLoading) {
    return <ArticleDetailSkeleton />;
  }

  if (isError) {
    return (
      <div className={styles.error}>
        <p>Failed to load article.</p>
        <button onClick={() => refetch()}>Try again</button>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className={styles.panel}>
      <button className={styles.closeButton} onClick={() => navigate(backUrl)}>
        x
      </button>
      <button
        className={styles.refreshButton}
        onClick={() =>
          dispatch(
            articlesApi.util.invalidateTags([
              { type: 'Article', id: id ?? '' },
            ]),
          )
        }
      >
        Refresh
      </button>

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
