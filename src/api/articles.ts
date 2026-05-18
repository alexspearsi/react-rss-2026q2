const BASE_URL = 'https://api.spaceflightnewsapi.net/v4/articles';

const PAGE_SIZE = 10;

export { PAGE_SIZE };

export async function fetchArticles(
  query: string,
  page: number,
  signal?: AbortSignal,
) {
  const params = new URLSearchParams();

  if (query) {
    params.set('search', query);
  }

  params.set('limit', String(PAGE_SIZE));
  params.set('offset', String((page - 1) * PAGE_SIZE));

  const res = await fetch(`${BASE_URL}?${params}`, { signal });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
}

export async function fetchArticleById(id: string, signal: AbortSignal) {
  const res = await fetch(`${BASE_URL}/${id}`, { signal });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
}
