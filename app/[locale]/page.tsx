import { Suspense } from 'react';

import { ArticleListPending } from '../../src/components/article-list/ArticleListPending';
import { ArticlesLayout } from '../../src/components/articles-layout/ArticlesLayout';
import { ArticleList } from '../../src/components/article-list/ArticleList';
import { ArticleDetailPanel } from '../../src/components/article-detail/ArticleDetail';
import { ArticleDetailSkeleton } from '../../src/components/skeleton/ArticleDetailSkeleton';
import { Pagination } from '../../src/components/pagination/Pagination';
import { SearchBar } from '../../src/components/search/SearchBar';
import { NavProvider } from '../../src/context/NavContext';
import { fetchArticle, fetchArticles } from '../../src/lib/api';
import { PAGE_SIZE } from '../../src/store/articlesApi';

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
