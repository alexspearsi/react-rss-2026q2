import { ArticleDetailSkeleton } from '../../../../src/components/skeleton/ArticleDetailSkeleton';
import { ArticlesLayout } from '../../../../src/components/articles-layout/ArticlesLayout';

export default function Loading() {
  return (
    <main>
      <div style={{ height: 48, marginBottom: 16 }} />
      <ArticlesLayout
        list={<div />}
        detail={<ArticleDetailSkeleton />}
      />
    </main>
  );
}
