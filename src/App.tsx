import { Component } from 'react';
import type { Article, ArticlesResponse } from './types/article';
import ArticleCard from './components/card/ArticleCard';

class App extends Component {
  state = {
    data: [] as Article[],
    query: '',
    loading: true,
  };

  componentDidMount(): void {
    fetch(
      `https://api.spaceflightnewsapi.net/v4/articles/?search=${this.state.query}`
    )
      .then((res) => res.json())
      .then((data: ArticlesResponse) => {
        this.setState({
          data: data.results,
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  searchHandler = () => {
    this.setState({ loading: true });

    const url = this.state.query
      ? `https://api.spaceflightnewsapi.net/v4/articles?search=${encodeURIComponent(this.state.query)}`
      : 'https://api.spaceflightnewsapi.net/v4/articles';

    fetch(url)
      .then((res) => res.json())
      .then((data: ArticlesResponse) => {
        this.setState({ data: data.results, loading: false });
      });
  };

  render() {
    const { data, loading } = this.state;

    console.log(data);

    return (
      <>
        <header>
          <input
            type="text"
            placeholder="Search articles..."
            value={this.state.query}
            onChange={this.inputHandler}
          />
          <input type="submit" value="Search" onClick={this.searchHandler} />
        </header>

        <main>
          {!loading ? (
            <div className="list">
              {this.state.data.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            'Loading...'
          )}
        </main>
      </>
    );
  }
}

export default App;
