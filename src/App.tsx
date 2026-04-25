import { Component } from 'react';
import type { Article, ArticlesResponse } from './types/article';
import { fetchArticles } from './api/articles';
import { SearchBar } from './components/search/SearchBar';
import { ArticleList } from './components/article-list/ArticleList';

const STORAGE_KEY = 'search_query';

interface State {
  data: Article[];
  query: string;
  loading: boolean;
  error: string | null;
}
class App extends Component<object, State> {
  constructor(props: object) {
    super(props);

    this.state = {
      data: [] as Article[],
      query: localStorage.getItem(STORAGE_KEY) ?? '',
      loading: true,
      error: null,
    };
  }

  componentDidMount(): void {
    this.loadArticles();
  }

  loadArticles = () => {
    this.setState({ loading: true, error: null });

    fetchArticles(this.state.query)
      .then((data: ArticlesResponse) => {
        this.setState({ data: data.results, loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          loading: false,
          error: 'Failed to load articles. Please try again.',
        });
      });
  };

  handleSearch = () => {
    const trimmed = this.state.query.trim();
    const saved = localStorage.getItem(STORAGE_KEY) ?? '';

    if (trimmed === saved) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, trimmed);
    this.setState({ query: trimmed }, this.loadArticles);
  };

  inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  render() {
    const { data, loading, query, error } = this.state;

    return (
      <>
        <header>
          <SearchBar
            value={query}
            onChange={this.inputHandler}
            onSearch={this.handleSearch}
          />
        </header>

        <main>
          <ArticleList articles={data} loading={loading} error={error} />
        </main>
      </>
    );
  }
}

export default App;
