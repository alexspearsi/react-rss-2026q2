import { describe, expect, it } from 'vitest';

import type { Article } from '../types/article';

import reducer, { clearItems, toggleItem } from './selectedItemsSlice';

const MOCK_ARTICLE: Article = {
  id: 1,
  title: 'Test Article',
  summary: 'Test summary',
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

describe('selectedItemsSlice', () => {
  it('returns empty initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual({ items: [] });
  });

  it('toggleItem adds article when not yet selected', () => {
    const state = reducer(undefined, toggleItem(MOCK_ARTICLE));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(1);
  });

  it('toggleItem removes article when already selected', () => {
    const withItem = reducer(undefined, toggleItem(MOCK_ARTICLE));
    const state = reducer(withItem, toggleItem(MOCK_ARTICLE));

    expect(state.items).toHaveLength(0);
  });

  it('toggleItem does not affect other items', () => {
    const second = { ...MOCK_ARTICLE, id: 2 };

    const withTwo = reducer(reducer(undefined, toggleItem(MOCK_ARTICLE)), toggleItem(second));

    const state = reducer(withTwo, toggleItem(MOCK_ARTICLE));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(2);
  });

  it('clearItems empties the selection', () => {
    const withItems = reducer({ items: [MOCK_ARTICLE, { ...MOCK_ARTICLE, id: 2 }] }, clearItems());

    expect(withItems.items).toHaveLength(0);
  });
});
