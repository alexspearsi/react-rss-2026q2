import { describe, it, vi, expect } from 'vitest';
import { fetchArticles } from './articles';

describe('fetchArticles', () => {
  it('calls fetch with correct URL', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [] }),
    });

    await fetchArticles('NASA');

    expect(fetch).toHaveBeenCalledWith(
      'https://api.spaceflightnewsapi.net/v4/articles?search=NASA',
      { signal: undefined },
    );
  });

  it('throws when response is not ok', async () => {
    window.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });

    await expect(fetchArticles('')).rejects.toThrow('Error: 500');
  });
});
