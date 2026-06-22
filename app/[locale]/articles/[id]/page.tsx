import { Suspense } from 'react';

import { ArticleDetailPanel } from '@/components/article-detail/ArticleDetail';
import { ArticlesLayout } from '@/components/articles-layout/ArticlesLayout';
import { ArticleList } from '@/components/article-list/ArticleList';
import { Pagination } from '@/components/pagination/Pagination';
import { SearchBar } from '@/components/search/SearchBar';
import { ArticleDetailSkeleton } from '@/components/skeleton/ArticleDetailSkeleton';
import { fetchArticle, fetchArticles } from '@/lib/api';
import { PAGE_SIZE } from '@/store/articlesApi';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
};

async function ListSection({ query, currentPage }: { query: string; currentPage: number }) {
  const data = await fetchArticles(query, currentPage);

  return <ArticleList articles={data.results} loading={false} error={null} />;
}

async function DetailSection({ id, backHref }: { id: string; backHref: string }) {
  const article = await fetchArticle(id);

  return <ArticleDetailPanel article={article} backHref={backHref} />;
}

async function PaginationSection({ query, currentPage }: { query: string; currentPage: number }) {
  const data = await fetchArticles(query, currentPage);

  return <Pagination currentPage={currentPage} totalCount={data.count} pageSize={PAGE_SIZE} />;
}

export default async function ArticleDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { page, search } = await searchParams;
  
  const currentPage = Math.max(1, Number(page) || 1);
  const query = search ?? '';
  const backHref = `/?page=${currentPage}${query ? `&search=${query}` : ''}`;

  return (
    <main>
      <div className="hideOnMobile">
        <SearchBar initialValue={query} />
      </div>
      <ArticlesLayout
        list={
          <Suspense fallback={<div />}>
            <ListSection query={query} currentPage={currentPage} />
          </Suspense>
        }
        detail={
          <Suspense fallback={<ArticleDetailSkeleton />}>
            <DetailSection id={id} backHref={backHref} />
          </Suspense>
        }
      />
      <div className="hideOnMobile">
        <Suspense fallback={null}>
          <PaginationSection query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </main>
  );
}
