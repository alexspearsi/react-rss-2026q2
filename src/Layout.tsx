import { useEffect, useState } from 'react';
import type { Article, ArticlesResponse } from './types/article';
import { fetchArticles, PAGE_SIZE } from './api/articles';
import { SearchBar } from './components/search/SearchBar';
import { ArticleList } from './components/article-list/ArticleList';
import { Pagination } from './components/pagination/Pagination';
import styles from './App.module.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  NavLink,
  Outlet,
  useMatch,
  useNavigate,
  useSearchParams,
} from 'react-router';

const STORAGE_KEY = 'search_query';

export const Layout = () => {
  const [searchQuery, setSearchQuery] = useLocalStorage(STORAGE_KEY, '');
  const [inputValue, setInputValue] = useState<string>(searchQuery);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState<Article[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [throwError, setThrowError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);

  const isDetailOpen = !!useMatch('/articles/:id');
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    fetchArticles(searchQuery, currentPage, controller.signal)
      .then((data: ArticlesResponse) => {
        setData(data.results);
        setTotalCount(data.count);
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
  }, [searchQuery, currentPage]);

  function handlePageChange(page: number) {
    setIsLoading(true);
    setError(null);
    setSearchParams((prev) => {
      prev.set('page', String(page));
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
    setSearchParams((prev) => {
      prev.set('page', '1');
      return prev;
    });
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
          onClick={
            isDetailOpen ? () => navigate(`/?page=${currentPage}`) : undefined
          }
        >
          <ArticleList articles={data} loading={isLoading} error={error} />
        </div>

        {isDetailOpen && (
          <div className={styles.detail}>
            <Outlet />
          </div>
        )}
      </main>

      {!isLoading && !error && (
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};
