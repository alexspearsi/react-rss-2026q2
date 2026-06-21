'use client';

import { useNav } from '../../context/NavContext';
import { ArticleSkeleton } from '../skeleton/ArticleSkeleton';

type ArticlePendingProps = {
  children: React.ReactNode;
};
export function ArticleListPending({ children }: ArticlePendingProps) {
  const { isPending } = useNav();

  if (isPending) {
    return (
      <div>
        {Array.from({ length: 10 }).map((_, i) => (
          <ArticleSkeleton key={i} />
        ))}
      </div>
    );
  }

  return <>{children}</>;
}
