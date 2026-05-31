import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import App from './App';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';
import { MemoryRouter } from 'react-router';
import { renderWithProviders } from './test-utils';

const mockFetchSuccess = (data: unknown) => {
  vi.mocked(fetch).mockResolvedValue(
    new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
  );
};

const mockFetchError = () => {
  vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 500 }));
};

describe('App', () => {
  beforeAll(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  beforeEach(() => {
    localStorage.clear();

    vi.clearAllMocks();
  });

  it('shows skeleton while loading', () => {
    vi.mocked(fetch).mockReturnValue(new Promise(() => {}));

    renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.queryAllByTestId('skeleton')).toHaveLength(10);
  });

  it('renders nothing found after loading empty results', async () => {
    mockFetchSuccess({ results: [], count: 0 });

    renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    await screen.findByText('Nothing found');
  });

  it('reads localstorage', async () => {
    mockFetchSuccess({ results: [], count: 0 });

    localStorage.setItem('search_query', 'NASA');

    renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('textbox')).toHaveValue('NASA');

    await screen.findByText('Nothing found');
  });

  it('shows error when API fails', async () => {
    mockFetchError();

    renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    await screen.findByText('Failed to load articles. Please try again');
  });

  it('saves search to localStorage on search', async () => {
    mockFetchSuccess({ results: [], count: 0 });

    renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const user = userEvent.setup();
    const input = screen.getByRole('textbox');

    await user.clear(input);
    await user.type(input, 'SpaceX');
    await user.click(screen.getByRole('button', { name: 'Search' }));

    expect(localStorage.getItem('search_query')).toBe('SpaceX');
  });

  it('refresh button triggers refetch', async () => {
    mockFetchSuccess({ results: [], count: 0 });

    renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    await screen.findByText('Nothing found');

    mockFetchSuccess({ results: [], count: 0 });

    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Refresh' }));

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it('caches data and does not refetch on re-render', async () => {
    mockFetchSuccess({ results: [], count: 0 });

    const { store, unmount } = renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    await screen.findByText('Nothing found');

    unmount();

    renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      { store },
    );

    await screen.findByText('Nothing found');

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('ErrorBoundary catches error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    mockFetchSuccess({ results: [], count: 0 });

    renderWithProviders(
      <MemoryRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </MemoryRouter>,
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

    mockFetchSuccess({ results: [], count: 0 });

    const user = userEvent.setup();

    renderWithProviders(
      <MemoryRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </MemoryRouter>,
    );

    await screen.findByText('Nothing found');

    await user.click(screen.getByText('Error Boundary'));

    await screen.findByText('Something went wrong');

    await user.click(screen.getByText('Click to reload the page'));

    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
