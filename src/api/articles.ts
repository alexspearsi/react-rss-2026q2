const BASE_URL = 'https://api.spaceflightnewsapi.net/v4/articles';

export async function fetchArticles(query: string, signal?: AbortSignal) {
  const url = query
    ? `${BASE_URL}?search=${encodeURIComponent(query)}`
    : BASE_URL;

  const res = await fetch(url, { signal });

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
