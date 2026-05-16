import { NavLink } from 'react-router';
import styles from './AboutPage.module.css';

export const AboutPage = () => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink to="/" end className={styles.navLink}>
            Articles
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            About
          </NavLink>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <p className={styles.label}>Author</p>
          <h1 className={styles.name}>Alex</h1>
          <p className={styles.bio}>
            Developer learning React in Rolling Scopes School
          </p>
          <div className={styles.links}>
            <a
              href="https://github.com/alexspearsi"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              RS School React Course
            </a>
          </div>
        </div>
      </main>
    </>
  );
};
