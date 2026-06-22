import type { Article } from '@/types/article';
import { formatDate } from '@/utils/format-date';
import { Link } from '@i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import styles from './ArticleDetail.module.css';

interface Props {
  article: Article;
  backHref: string;
}

export const ArticleDetailPanel = ({ article, backHref }: Props) => {
  const t = useTranslations('articleDetail');

  return (
    <div className={styles.panel}>
      <Link href={backHref} className={styles.closeButton}>
        X
      </Link>

      <Image
        src={article.image_url}
        alt={article.title}
        width={600}
        height={300}
        style={{ objectFit: 'cover', width: '100%' }}
      />

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.site}>{article.news_site}</span>
          <span className={styles.date}>{formatDate(article.published_at)}</span>
        </div>
        <h2 className={styles.title}>{article.title}</h2>
        <p className={styles.summary}>{article.summary}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
          {t('readMore')}
        </a>
        <Link href={backHref} className={styles.mobileBackButton} aria-label="Back to list">
          ↓
        </Link>
      </div>
    </div>
  );
};
