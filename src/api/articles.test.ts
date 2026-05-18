import { describe, it, vi, expect } from 'vitest';
import { fetchArticles, fetchArticleById } from './articles';

describe('fetchArticles', () => {
  it('calls fetch with correct URL', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [], count: 0 }),
    });

    await fetchArticles('NASA', 1);

    expect(fetch).toHaveBeenCalledWith(
      'https://api.spaceflightnewsapi.net/v4/articles?search=NASA&limit=10&offset=0',
      { signal: undefined },
    );
  });

  it('calls fetch with correct offset for page 2', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [], count: 0 }),
    });

    await fetchArticles('', 2);

    expect(fetch).toHaveBeenCalledWith(
      'https://api.spaceflightnewsapi.net/v4/articles?limit=10&offset=10',
      { signal: undefined },
    );
  });

  it('throws when response is not ok', async () => {
    window.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });

    await expect(fetchArticles('', 1)).rejects.toThrow('Error: 500');
  });
});

describe('fetchArticleById', () => {
  it('calls fetch with correct URL', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 42 }),
    });

    const signal = new AbortController().signal;
    await fetchArticleById('42', signal);

    expect(fetch).toHaveBeenCalledWith(
      'https://api.spaceflightnewsapi.net/v4/articles/42',
      { signal },
    );
  });

  it('throws when response is not ok', async () => {
    window.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 });

    const signal = new AbortController().signal;

    await expect(fetchArticleById('99', signal)).rejects.toThrow('Error: 404');
  });
});
