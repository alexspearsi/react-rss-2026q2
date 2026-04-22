import type { Article } from '../../types/article';
import './Card.css';

interface Props {
  article: Article;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function ArticleCard({ article }: Props) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card"
    >
      <img
        src={article.image_url}
        alt={article.title}
        className="card__image"
      />

      <div className="card__body">
        <div className="card__header">
          <span className="card__site">{article.news_site}</span>
          <span className="card__date">{formatDate(article.published_at)}</span>
        </div>

        <h3 className="card__title">{article.title}</h3>
      </div>
    </a>
  );
}
