'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleItem } from '@/store/selectedItemsSlice';
import type { Article } from '@/types/article';
import { formatDate } from '@/utils/format-date';
import { Link, usePathname } from '@i18n/navigation';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import styles from './ArticleCard.module.css';

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) =>
    state.selectedItems.items.some((item: Article) => item.id === article.id),
  );

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();

    dispatch(toggleItem(article));
  }

  const params = new URLSearchParams(searchParams.toString());

  params.set('article', String(article.id));

  const href =
    pathname === '/'
      ? `?${params.toString()}`
      : `/articles/${article.id}?${searchParams.toString()}`;

  return (
    <Link href={href} className={styles.card} scroll={false}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckbox}
        onClick={(e) => e.stopPropagation()}
        className={styles.checkbox}
      />
      <div className={styles.imageWrapper}>
        <Image src={article.image_url} alt={article.title} fill style={{ objectFit: 'cover' }} />
      </div>

      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.site}>{article.news_site}</span>
          <span className={styles.date}>{formatDate(article.published_at)}</span>
        </div>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.summary}>{article.summary}</p>
      </div>
    </Link>
  );
};
