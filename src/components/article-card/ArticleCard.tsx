import { NavLink, useLocation } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleItem } from '../../store/selectedItemsSlice';
import type { Article } from '../../types/article';
import { formatDate } from '../../utils/format-date';

import styles from './ArticleCard.module.css';

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) =>
    state.selectedItems.items.some((item: Article) => item.id === article.id),
  );

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    dispatch(toggleItem(article));
  }

  return (
    <NavLink
      to={`/articles/${article.id}${location.search}`}
      onClick={(e) => e.stopPropagation()}
      className={({ isActive }) => `${styles.card} ${isActive ? styles.cardActive : ''}`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckbox}
        onClick={(e) => e.stopPropagation()}
        className={styles.checkbox}
      />
      <img src={article.image_url} alt={article.title} className={styles.image} />

      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.site}>{article.news_site}</span>
          <span className={styles.date}>{formatDate(article.published_at)}</span>
        </div>

        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.summary}>{article.summary}</p>
      </div>
    </NavLink>
  );
};
