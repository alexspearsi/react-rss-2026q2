import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import { ArticleDetail } from './ArticleDetail';
import type { Article } from '../../types/article';
import { renderWithProviders } from '../../test-utils';

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

function renderWithRoute(id = '1', search = '') {
  return renderWithProviders(
    <MemoryRouter initialEntries={[`/articles/${id}${search}`]}>
      <Routes>
        <Route path="/articles/:id" element={<ArticleDetail />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ArticleDetail', () => {
  beforeAll(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows skeleton while loading', () => {
    vi.mocked(fetch).mockReturnValue(new Promise(() => {}));

    renderWithRoute();

    expect(screen.queryByText('Read full article')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders article content after loading', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(MOCK_ARTICLE), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    renderWithRoute();

    expect(
      await screen.findByRole('heading', { name: 'Test Article Title' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Test summary text')).toBeInTheDocument();
    expect(screen.getByText('NASA')).toBeInTheDocument();
  });

  it('renders read full article link', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(MOCK_ARTICLE), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    renderWithRoute();

    const link = await screen.findByText('Read full article');

    expect(link).toHaveAttribute('href', 'https://news.com/article');
  });

  it('shows error message when API fails', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 500 }));

    renderWithRoute();

    expect(
      await screen.findByText('Failed to load article.'),
    ).toBeInTheDocument();
  });

  it('shows try again button on error', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 500 }));

    renderWithRoute();

    expect(
      await screen.findByRole('button', { name: 'Try again' }),
    ).toBeInTheDocument();
  });

  it('renders close button', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(MOCK_ARTICLE), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    renderWithRoute();

    const closeButton = await screen.findByRole('button', { name: 'x' });

    expect(closeButton).toBeInTheDocument();
  });

  it('renders refresh button', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(MOCK_ARTICLE), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    renderWithRoute();

    expect(
      await screen.findByRole('button', { name: /refresh/i }),
    ).toBeInTheDocument();
  });

  it('refetches data when refresh button is clicked', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(MOCK_ARTICLE), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    renderWithRoute();

    await screen.findByRole('heading', { name: 'Test Article Title' });

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /refresh/i }));

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('caches article and does not refetch on re-render', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(MOCK_ARTICLE), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const { store, unmount } = renderWithRoute();

    await screen.findByRole('heading', { name: 'Test Article Title' });

    unmount();

    renderWithProviders(
      <MemoryRouter initialEntries={['/articles/1']}>
        <Routes>
          <Route path="/articles/:id" element={<ArticleDetail />} />
        </Routes>
      </MemoryRouter>,
      { store },
    );

    await screen.findByRole('heading', { name: 'Test Article Title' });

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
