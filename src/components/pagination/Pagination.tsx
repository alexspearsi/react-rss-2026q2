import styles from './Pagination.module.css';

interface Props {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

function getPageRange(current: number, total: number) {
  const left = Math.max(2, current - 2);
  const right = Math.min(total - 1, current + 2);

  const items: (number | '...')[] = [1];

  if (left > 2) {
    items.push('...');
  }

  for (let i = left; i <= right; i++) {
    items.push(i);
  }

  if (right < total - 1) {
    items.push('...');
  }

  if (total > 1) {
    items.push(total);
  }

  return items;
}

export const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }: Props) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  const items = getPageRange(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.btn}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ←
      </button>

      {items.map((item, i) =>
        item === '...' ? (
          <span key={`dots-${i}`} className={styles.dots}>
            …
          </span>
        ) : (
          <button
            key={item}
            className={`${styles.btn} ${item === currentPage ? styles.active : ''}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ),
      )}

      <button
        className={styles.btn}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        →
      </button>
    </div>
  );
};
