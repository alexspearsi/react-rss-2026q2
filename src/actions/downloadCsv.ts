'use server';

import type { Article } from '../types/article';

export async function downloadCsv(items: Article[]): Promise<string> {
  const header = ['id', 'title', 'summary', 'url', 'news_site', 'published_at'];

  const rows = items.map((item) => [
    item.id,
    `"${item.title.replace(/"/g, '""')}"`,
    `"${item.summary.replace(/"/g, '""')}"`,
    item.url,
    item.news_site,
    item.published_at,
  ]);

  return [header, ...rows].map((row) => row.join(',')).join('\n');
}
