import { ArticleListPending } from '../../src/components/article-list/ArticleListPending';
import { ArticlesLayout } from '../../src/components/articles-layout/ArticlesLayout';
import { ArticleList } from '../../src/components/article-list/ArticleList';
import { Pagination } from '../../src/components/pagination/Pagination';
import { SearchBar } from '../../src/components/search/SearchBar';
import { NavProvider } from '../../src/context/NavContext';
import { fetchArticles } from '../../src/lib/api';
import { PAGE_SIZE } from '../../src/store/articlesApi';

type Props = {
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  const { page, search } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const query = search ?? '';

  const data = await fetchArticles(query, currentPage);

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
        />
        <Pagination currentPage={currentPage} totalCount={data.count} pageSize={PAGE_SIZE} />
      </NavProvider>
    </main>
  );
}
