'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { Link } from '../../../i18n/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleItem } from '../../store/selectedItemsSlice';
import type { Article } from '../../types/article';
import { formatDate } from '../../utils/format-date';

import styles from './ArticleCard.module.css';

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) =>
    state.selectedItems.items.some((item: Article) => item.id === article.id),
  );

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();

    dispatch(toggleItem(article));
  }

  const href = `/articles/${article.id}?${searchParams.toString()}`;

  return (
    <Link href={href} onClick={(e) => e.stopPropagation()} className={styles.card}>
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
