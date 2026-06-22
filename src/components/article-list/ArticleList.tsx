import type { Article } from '@/types/article';
import { useTranslations } from 'next-intl';

import { ArticleCard } from '../article-card/ArticleCard';
import { ArticleSkeleton } from '../skeleton/ArticleSkeleton';

import styles from './ArticleList.module.css';

interface Props {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

export const ArticleList = ({ articles, loading, error }: Props) => {
  const t = useTranslations('articles');

  if (loading) {
    return (
      <div>
        {Array.from({ length: 10 }).map((_, index) => (
          <ArticleSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="error">{t('error')}</p>;
  }

  if (articles.length === 0) {
    return <p className={styles.notFound}>{t('noResults')}</p>;
  }

  return (
    <div>
      {articles.map((a) => (
        <ArticleCard key={a.id} article={a} />
      ))}
    </div>
  );
};
