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
