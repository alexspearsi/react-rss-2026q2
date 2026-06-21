import { ArticleDetailSkeleton } from '../../../../src/components/skeleton/ArticleDetailSkeleton';
import { ArticlesLayout } from '../../../../src/components/articles-layout/ArticlesLayout';
import { ArticleSkeleton } from '../../../../src/components/skeleton/ArticleSkeleton';

export default function Loading() {
  return (
    <main>
      <ArticlesLayout
        list={
          <div>
            {Array.from({ length: 10 }).map((_, i) => (
              <ArticleSkeleton key={i} />
            ))}
          </div>
        }
        detail={<ArticleDetailSkeleton />}
      />
    </main>
  );
}
