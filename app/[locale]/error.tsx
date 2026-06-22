'use client';

import { useTranslations } from 'next-intl';

export default function Error({ reset }: { reset: () => void }) {
  const t = useTranslations('error');

  return (
    <main>
      <h2>{t('title')}</h2>
      <button onClick={reset}>{t('retry')}</button>
    </main>
  );
}
