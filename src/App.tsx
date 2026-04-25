import { Component } from 'react';
import type { Article, ArticlesResponse } from './types/article';
import ArticleCard from './components/card/ArticleCard';
import { fetchArticles } from './api/articles';
import { SearchBar } from './components/search/SearchBar';

const STORAGE_KEY = 'search_query';

interface State {
  data: Article[];
  query: string;
  loading: boolean;
}
class App extends Component<object, State> {
  constructor(props: object) {
    super(props);

    this.state = {
      data: [] as Article[],
      query: localStorage.getItem(STORAGE_KEY) ?? '',
      loading: true,
    };
  }

  componentDidMount(): void {
    this.loadArticles();
  }

  loadArticles = () => {
    this.setState({ loading: true });

    fetchArticles(this.state.query)
      .then((data: ArticlesResponse) => {
        this.setState({ data: data.results, loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    localStorage.setItem(STORAGE_KEY, query);

    this.setState({ query });
  };

  render() {
    const { data, loading, query } = this.state;

    return (
      <>
        <header>
          <SearchBar
            value={query}
            onChange={this.inputHandler}
            onSearch={this.loadArticles}
          />
        </header>

        <main>
          {loading ? (
            'Loading...'
          ) : (
            <div className="list">
              {data.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </main>
      </>
    );
  }
}

export default App;
