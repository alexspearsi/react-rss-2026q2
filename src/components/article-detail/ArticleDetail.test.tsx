import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import { ArticleDetail } from './ArticleDetail';
import { fetchArticleById } from '../../api/articles';
import type { Article } from '../../types/article';

vi.mock('../../api/articles');

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
  return render(
    <MemoryRouter initialEntries={[`/articles/${id}${search}`]}>
      <Routes>
        <Route path="/articles/:id" element={<ArticleDetail />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ArticleDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows skeleton while loading', () => {
    vi.mocked(fetchArticleById).mockReturnValue(new Promise(() => {}));

    renderWithRoute();

    expect(screen.queryByText('Read full article')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders article content after loading', async () => {
    vi.mocked(fetchArticleById).mockResolvedValue(MOCK_ARTICLE);

    renderWithRoute();

    expect(
      await screen.findByRole('heading', { name: 'Test Article Title' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Test summary text')).toBeInTheDocument();
    expect(screen.getByText('NASA')).toBeInTheDocument();
  });

  it('renders read full article link', async () => {
    vi.mocked(fetchArticleById).mockResolvedValue(MOCK_ARTICLE);

    renderWithRoute();

    const link = await screen.findByText('Read full article');

    expect(link).toHaveAttribute('href', 'https://news.com/article');
  });

  it('shows error message when API fails', async () => {
    vi.mocked(fetchArticleById).mockRejectedValue(new Error('Network error'));

    renderWithRoute();

    expect(
      await screen.findByText('Failed to load articles.'),
    ).toBeInTheDocument();
  });

  it('renders close button and navigates back on click', async () => {
    const user = userEvent.setup();

    vi.mocked(fetchArticleById).mockResolvedValue(MOCK_ARTICLE);

    renderWithRoute();

    const closeButton = await screen.findByRole('button', { name: 'x' });

    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);
  });
});
