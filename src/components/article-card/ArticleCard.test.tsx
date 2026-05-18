import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import { ArticleCard } from './ArticleCard';
import type { Article } from '../../types/article';

const MOCK_ARTICLE: Article = {
  id: 1,
  title: 'Test Article Title',
  summary: 'Test summary text',
  url: 'https://news.com/article',
  image_url: 'https://news.com/img.jpg',
  news_site: 'NASA',
  published_at: '2024-06-15T12:00:00Z',
  updated_at: '2024-06-15T12:00:00Z',
  featured: false,
  authors: [],
  launches: [],
  events: [],
};

describe('ArticleCard', () => {
  it('renders article title', () => {
    render(
      <MemoryRouter>
        <ArticleCard article={MOCK_ARTICLE} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'Test Article Title' }),
    ).toBeInTheDocument();
  });

  it('renders news site name', () => {
    render(
      <MemoryRouter>
        <ArticleCard article={MOCK_ARTICLE} />
      </MemoryRouter>,
    );

    expect(screen.getByText('NASA')).toBeInTheDocument();
  });

  it('renders article summary', () => {
    render(
      <MemoryRouter>
        <ArticleCard article={MOCK_ARTICLE} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Test summary text')).toBeInTheDocument();
  });

  it('renders article image with correct src and alt', () => {
    render(
      <MemoryRouter>
        <ArticleCard article={MOCK_ARTICLE} />
      </MemoryRouter>,
    );

    const img = screen.getByRole('img', { name: 'Test Article Title' });
    expect(img).toHaveAttribute('src', 'https://news.com/img.jpg');
  });

  it('renders link to article detail page', () => {
    render(
      <MemoryRouter>
        <ArticleCard article={MOCK_ARTICLE} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/articles/1');
  });
});
