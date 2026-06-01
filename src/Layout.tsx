import { useState } from 'react';
import { NavLink, Outlet, useMatch, useNavigate, useSearchParams } from 'react-router';

import styles from './App.module.css';
import moonIcon from './assets/icons/moon.svg';
import sunIcon from './assets/icons/sun.svg';
import { ArticleList } from './components/article-list/ArticleList';
import { Flyout } from './components/flyout/Flyout';
import { Pagination } from './components/pagination/Pagination';
import { SearchBar } from './components/search/SearchBar';
import { useTheme } from './context/ThemeContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { PAGE_SIZE, articlesApi, useGetArticlesQuery } from './store/articlesApi';
import { useAppDispatch } from './store/hooks';

const STORAGE_KEY = 'search_query';

export const Layout = () => {
  const [searchQuery, setSearchQuery] = useLocalStorage(STORAGE_KEY, '');
  const [inputValue, setInputValue] = useState<string>(searchQuery);
  const [throwError, setThrowError] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);

  const isDetailOpen = !!useMatch('/articles/:id');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useGetArticlesQuery({
    query: searchQuery,
    page: currentPage,
  });

  const articles = data?.results ?? [];
  const totalCount = data?.count ?? 0;
  const error = isError ? 'Failed to load articles. Please try again' : null;

  function handlePageChange(page: number) {
    setSearchParams((prev) => {
      prev.set('page', String(page));

      return prev;
    });
  }

  if (throwError) {
    throw new Error('Error Boundary');
  }

  function handleSearch() {
    const trimmed = inputValue.trim();

    if (trimmed === searchQuery) {
      return;
    }

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
          <button className={styles.themeButton} onClick={toggleTheme}>
            <img
              src={theme === 'dark' ? sunIcon : moonIcon}
              alt={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
              width={18}
              height={18}
            />
          </button>
          <button className={styles.errorButton} onClick={() => setThrowError(true)}>
            Error Boundary
          </button>
          <button
            className={styles.refreshButton}
            onClick={() => dispatch(articlesApi.util.invalidateTags(['Articles']))}
          >
            Refresh
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
          onClick={isDetailOpen ? () => navigate(`/?page=${currentPage}`) : undefined}
        >
          <ArticleList articles={articles} loading={isLoading} error={error} />
        </div>

        {isDetailOpen && (
          <div className={styles.detail}>
            <Outlet />
          </div>
        )}
      </main>

      {!isLoading && !isError && (
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      )}
      <Flyout />
    </>
  );
};
