import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ArticleList } from './ArticleList';
import type { Article } from '../../types/article';

const ERROR_STRING = 'Failed to load';

const MOCK_ARTICLE: Article = {
  id: 1,
  title: 'Test title',
  summary: 'Test summary',
  url: 'https://news.com',
  image_url: 'https://news.com/img.jpg',
  news_site: 'NASA',
  published_at: '13241234123412341234',
  updated_at: '1234123412341324134',
  featured: false,
  authors: [],
  launches: [],
  events: [],
};

describe('ArticleList', () => {
  it('renders error message', () => {
    render(<ArticleList articles={[]} loading={false} error={ERROR_STRING} />);

    const error = screen.getByText(ERROR_STRING);

    expect(error).toBeInTheDocument();
  });

  it('renders loading', () => {
    render(<ArticleList articles={[]} loading={true} error={null} />);

    const skeletons = screen.getAllByTestId('skeleton');

    expect(skeletons).toHaveLength(10);
  });

  it('renders nothing found message', () => {
    render(<ArticleList articles={[]} loading={false} error={null} />);

    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('renders cards', () => {
    const cards = Array.from({ length: 8 }, (_, i) => ({
      ...MOCK_ARTICLE,
      id: i + 1,
    }));

    render(<ArticleList articles={cards} loading={false} error={null} />);

    const skeletons = screen.queryByTestId('skeleton');
    expect(skeletons).not.toBeInTheDocument();

    const nothingFound = screen.queryByText('Nothing found');
    expect(nothingFound).not.toBeInTheDocument();

    expect(screen.getAllByRole('heading')).toHaveLength(8);
  });
});
