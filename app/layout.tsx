import type { Metadata } from 'next';

import '../src/index.css';

export const metadata: Metadata = {
  title: 'Space Articles',
  description: 'Space flight news aggregator'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
