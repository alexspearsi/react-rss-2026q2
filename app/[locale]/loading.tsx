import { ArticleSkeleton } from '@/components/skeleton/ArticleSkeleton';

export default function Loading() {
  return (
    <main>
      <div style={{ height: 48, marginBottom: 16 }} />
      {Array.from({ length: 10 }).map((_, i) => (
        <ArticleSkeleton key={i} />
      ))}
    </main>
  )
}