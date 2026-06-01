import { MemoryRouter } from 'react-router';

import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../test-utils';
import type { Article } from '../../types/article';

import { ArticleCard } from './ArticleCard';

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
    renderWithProviders(
      <MemoryRouter>
        <ArticleCard article={MOCK_ARTICLE} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Test Article Title' })).toBeInTheDocument();
  });

  it('renders news site name', () => {
    renderWithProviders(
      <MemoryRouter>
        <ArticleCard article={MOCK_ARTICLE} />
      </MemoryRouter>,
    );

    expect(screen.getByText('NASA')).toBeInTheDocument();
  });

  it('renders article summary', () => {
    renderWithProviders(
      <MemoryRouter>
        <ArticleCard article={MOCK_ARTICLE} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Test summary text')).toBeInTheDocument();
  });

  it('renders article image with correct src and alt', () => {
    renderWithProviders(
      <MemoryRouter>
        <ArticleCard article={MOCK_ARTICLE} />
      </MemoryRouter>,
    );

    const img = screen.getByRole('img', { name: 'Test Article Title' });
    expect(img).toHaveAttribute('src', 'https://news.com/img.jpg');
  });

  it('renders link to article detail page', () => {
    renderWithProviders(
      <MemoryRouter>
        <ArticleCard article={MOCK_ARTICLE} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/articles/1');
  });

  it('checkbox toggles item selection in store', () => {
    const { store } = renderWithProviders(
      <MemoryRouter>
        <ArticleCard article={MOCK_ARTICLE} />
      </MemoryRouter>,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(store.getState().selectedItems.items).toHaveLength(1);

    fireEvent.click(checkbox);
    expect(store.getState().selectedItems.items).toHaveLength(0);
  });
});
