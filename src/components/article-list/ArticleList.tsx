import { Component } from 'react';
import type { Article } from '../../types/article';
import { ArticleCard } from '../card/ArticleCard';

interface Props {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

export class ArticleList extends Component<Props> {
  render() {
    const { articles, loading, error } = this.props;

    if (loading) {
      return <p className="loading">Loading...</p>;
    }

    if (error) {
      return <p className="error">{error}</p>;
    }

    return (
      <div className="list">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>
    );
  }
}
