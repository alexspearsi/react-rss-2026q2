import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type ArticlesResponse, type Article } from '../types/article';

export const PAGE_SIZE = 10;
const CACHE_TTL = Number(import.meta.env.VITE_CACHE_TTL ?? 60);

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spaceflightnewsapi.net/v4',
  }),
  keepUnusedDataFor: CACHE_TTL,
  tagTypes: ['Articles', 'Article'],
  endpoints: (builder) => ({
    getArticles: builder.query<
      ArticlesResponse,
      { query: string; page: number }
    >({
      query: ({ query, page }) => {
        const params = new URLSearchParams();

        if (query) {
          params.set('search', query);
        }

        params.set('limit', String(PAGE_SIZE));
        params.set('offset', String((page - 1) * PAGE_SIZE));

        return `/articles?${params}`;
      },
      providesTags: ['Articles'],
    }),
    getArticleById: builder.query<Article, string>({
      query: (id) => `/articles/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Article', id }],
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleByIdQuery } = articlesApi;
