import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ArticleList } from './ArticleList';
import { MemoryRouter } from 'react-router';
import type { Article } from '../../types/article';
import { renderWithProviders } from '../../test-utils';

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
    renderWithProviders(
      <ArticleList articles={[]} loading={false} error={ERROR_STRING} />,
    );

    expect(screen.getByText(ERROR_STRING)).toBeInTheDocument();
  });

  it('renders loading', () => {
    renderWithProviders(
      <ArticleList articles={[]} loading={true} error={null} />,
    );

    expect(screen.getAllByTestId('skeleton')).toHaveLength(10);
  });

  it('renders nothing found message', () => {
    renderWithProviders(
      <ArticleList articles={[]} loading={false} error={null} />,
    );

    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('renders cards', () => {
    const cards = Array.from({ length: 8 }, (_, i) => ({
      ...MOCK_ARTICLE,
      id: i + 1,
    }));

    renderWithProviders(
      <MemoryRouter>
        <ArticleList articles={cards} loading={false} error={null} />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
    expect(screen.queryByText('Nothing found')).not.toBeInTheDocument();
    expect(screen.getAllByRole('heading')).toHaveLength(8);
  });
});
