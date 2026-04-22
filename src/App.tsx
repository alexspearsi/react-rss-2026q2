import { Component } from 'react';
import type { Article, ArticlesResponse } from './types/article';
import ArticleCard from './components/card/ArticleCard';

class App extends Component {
  state = {
    data: [] as Article[],
    loading: true,
  };

  componentDidMount(): void {
    fetch('https://api.spaceflightnewsapi.net/v4/articles')
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

  render() {
    const { data, loading } = this.state;

    console.log(data);

    return (
      <div>
        <header>
          <input type="text"></input>
          <input type="submit"></input>
        </header>

        {!loading ? (
          <div className="list">
            {this.state.data.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          'Loading...'
        )}
      </div>
    );
  }
}

export default App;
