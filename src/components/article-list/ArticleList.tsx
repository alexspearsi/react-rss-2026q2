import { Component } from 'react';
import type { Article } from '../../types/article';
import { ArticleCard } from '../article-card/ArticleCard';
import { ArticleSkeleton } from '../skeleton/ArticleSkeleton';
import styles from './ArticleList.module.css';

interface Props {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

export class ArticleList extends Component<Props> {
  render() {
    const { articles, loading, error } = this.props;

    if (loading) {
      return (
        <div>
          {Array.from({ length: 10 }).map((_, index) => (
            <ArticleSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return <p className="error">{error}</p>;
    }

    if (articles.length === 0) {
      return <p className={styles.notFound}>Nothing found</p>;
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
