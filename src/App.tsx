import { useEffect, useState } from 'react';
import type { Article, ArticlesResponse } from './types/article';
import { fetchArticles } from './api/articles';
import { SearchBar } from './components/search/SearchBar';
import { ArticleList } from './components/article-list/ArticleList';
import styles from './App.module.css';

const STORAGE_KEY = 'search_query';

const App = () => {
  const [inputValue, setInputValue] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) ?? '',
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) ?? '',
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState<Article[]>([]);

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

  function handleSearch() {
    const trimmed = inputValue.trim();
    const saved = localStorage.getItem(STORAGE_KEY) ?? '';

    if (trimmed === saved) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, trimmed);

    setIsLoading(true);
    setError(null);
    setSearchQuery(trimmed);
  }

  return (
    <>
      <header>
        <SearchBar
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSearch={handleSearch}
        />
      </header>

      <button
        className={styles.errorButton}
        onClick={() => setError('Error Boundary Error')}
      >
        Error Boundary
      </button>

      <main>
        <ArticleList articles={data} loading={isLoading} error={error} />
      </main>
    </>
  );
};

export default App;
