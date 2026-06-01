import { useNavigate } from 'react-router';

import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p className={styles.code}>404</p>
      <p className={styles.message}>Page not found</p>
      <button className={styles.button} onClick={() => navigate('/')}>
        back to articles
      </button>
    </div>
  );
};
