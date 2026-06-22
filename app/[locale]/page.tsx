import { Suspense } from 'react';

import { ArticleListPending } from '@/components/article-list/ArticleListPending';
import { ArticlesLayout } from '@/components/articles-layout/ArticlesLayout';
import { ArticleList } from '@/components/article-list/ArticleList';
import { ArticleDetailPanel } from '@/components/article-detail/ArticleDetail';
import { ArticleDetailSkeleton } from '@/components/skeleton/ArticleDetailSkeleton';
import { Pagination } from '@/components/pagination/Pagination';
import { SearchBar } from '@/components/search/SearchBar';
import { NavProvider } from '@/context/NavContext';
import { fetchArticle, fetchArticles } from '@/lib/api';
import { PAGE_SIZE } from '@/store/articlesApi';

type Props = {
  searchParams: Promise<{ page?: string; search?: string; article?: string }>;
};

async function DetailSection({ id, backHref }: { id: string; backHref: string }) {
  const article = await fetchArticle(id);

  return <ArticleDetailPanel article={article} backHref={backHref} />;
}

export default async function HomePage({ searchParams }: Props) {
  const { page, search, article } = await searchParams;
  
  const currentPage = Math.max(1, Number(page) || 1);
  
  const query = search ?? '';

  const data = await fetchArticles(query, currentPage);

  const backHref = `?page=${currentPage}${query ? `&search=${query}` : ''}`;

  return (
    <main>
      <SearchBar initialValue={query} />
      <NavProvider>
        <ArticlesLayout
          list={
            <ArticleListPending>
              <ArticleList articles={data.results} loading={false} error={null} />
            </ArticleListPending>
          }
          detail={
            article ? (
              <Suspense key={article} fallback={<ArticleDetailSkeleton />}>
                <DetailSection id={article} backHref={backHref} />
              </Suspense>
            ) : undefined
          }
        />
        <Pagination currentPage={currentPage} totalCount={data.count} pageSize={PAGE_SIZE} />
      </NavProvider>
    </main>
  );
}
