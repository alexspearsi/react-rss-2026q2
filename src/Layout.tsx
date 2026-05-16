import { useEffect, useState } from 'react';
import type { Article, ArticlesResponse } from './types/article';
import { fetchArticles } from './api/articles';
import { SearchBar } from './components/search/SearchBar';
import { ArticleList } from './components/article-list/ArticleList';
import styles from './App.module.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import { NavLink, Outlet, useMatch, useNavigate } from 'react-router';

const STORAGE_KEY = 'search_query';

export const Layout = () => {
  const [searchQuery, setSearchQuery] = useLocalStorage(STORAGE_KEY, '');
  const [inputValue, setInputValue] = useState<string>(searchQuery);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState<Article[]>([]);
  const [throwError, setThrowError] = useState(false);

  const isDetailOpen = !!useMatch('/articles/:id');
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    fetchArticles(searchQuery, controller.signal)
      .then((data: ArticlesResponse) => {
        setData(data.results);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        if (err.name === 'AbortError') {
          return;
        }

        setIsLoading(false);
        setError('Failed to load articles. Please try again.');
      });

    return () => controller.abort();
  }, [searchQuery]);

  if (throwError) {
    throw new Error('Error Boundary');
  }

  function handleSearch() {
    const trimmed = inputValue.trim();

    if (trimmed === searchQuery) {
      return;
    }

    setError(null);
    setIsLoading(true);
    setSearchQuery(trimmed);
  }

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
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
          <button
            className={styles.errorButton}
            onClick={() => {
              setThrowError(true);
              setError('Error Boundary Error');
            }}
          >
            Error Boundary
          </button>
        </nav>
        <SearchBar
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSearch={handleSearch}
        />
      </header>

      <main className={styles.layout}>
        <div
          className={`${styles.list} ${isDetailOpen ? styles.listHidden : styles.listExpanded}`}
          onClick={isDetailOpen ? () => navigate('/') : undefined}
        >
          <ArticleList articles={data} loading={isLoading} error={error} />
        </div>

        {isDetailOpen && (
          <div className={styles.detail}>
            <Outlet />
          </div>
        )}
      </main>
    </>
  );
};
