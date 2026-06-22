import type { Article, ArticlesResponse } from '../types/article';

import { PAGE_SIZE } from '../store/articlesApi';

const ARTICLES_API = 'https://api.spaceflightnewsapi.net/v4/articles';
const FETCH_OPTIONS = { next: { revalidate: 60 } };

export async function fetchArticles(query: string, page: number): Promise<ArticlesResponse> {
  const params = new URLSearchParams();

  if (query) {
    params.set('search', query);
  }

  params.set('limit', String(PAGE_SIZE));
  params.set('offset', String((page - 1) * PAGE_SIZE));

  const res = await fetch(`${ARTICLES_API}?${params}`, FETCH_OPTIONS);

  if (!res.ok) {
    throw new Error('Failed to fetch articles');
  }

  return res.json();
}

export async function fetchArticle(id: string): Promise<Article> {
  const res = await fetch(`${ARTICLES_API}/${id}`, FETCH_OPTIONS);

  if (!res.ok) {
    throw new Error('Failed to fetch article');
  }

  return res.json();
}
