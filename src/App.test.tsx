import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchArticles } from './api/articles';
import App from './App';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';

vi.mock('./api/articles');

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('calls fetchArticles', async () => {
    vi.mocked(fetchArticles).mockResolvedValue({ results: [] });

    render(<App />);

    await screen.findByText('Nothing found');

    expect(fetchArticles).toHaveBeenCalledTimes(1);
  });

  it('shows skeleton', async () => {
    vi.mocked(fetchArticles).mockReturnValue(new Promise(() => {}));

    render(<App />);

    const skeletons = screen.queryAllByTestId('skeleton');
    expect(skeletons).toHaveLength(10);
  });

  it('reads localstorage', async () => {
    vi.mocked(fetchArticles).mockResolvedValue({ results: [] });
    localStorage.setItem('search_query', 'NASA');

    render(<App />);

    expect(screen.getByRole('textbox')).toHaveValue('NASA');

    await screen.findByText('Nothing found');
  });

  it('shows error when API fails', async () => {
    vi.mocked(fetchArticles).mockRejectedValue(new Error('Network error'));

    render(<App />);

    await screen.findByText('Failed to load articles. Please try again.');
  });

  it('saves search to localStorage on search', async () => {
    vi.mocked(fetchArticles).mockResolvedValue({ results: [] });

    render(<App />);

    const user = userEvent.setup();
    const input = screen.getByRole('textbox');

    await user.clear(input);
    await user.type(input, 'SpaceX');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(localStorage.getItem('search_query')).toBe('SpaceX');
  });

  it('ErrorBoundary catches error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(fetchArticles).mockResolvedValue({ results: [] });

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>,
    );

    await screen.findByText('Nothing found');

    const user = userEvent.setup();

    await user.click(screen.getByText('Error Boundary'));

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('reloads the page after clicking on Error Boundary button', async () => {
    const reloadMock = vi.fn();
    vi.stubGlobal('location', { ...window.location, reload: reloadMock });

    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(fetchArticles).mockResolvedValue({ results: [] });

    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>,
    );

    await screen.findByText('Nothing found');

    await user.click(screen.getByText('Error Boundary'));

    await screen.findByText('Something went wrong');

    await user.click(screen.getByText('Click to reload the page'));

    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
