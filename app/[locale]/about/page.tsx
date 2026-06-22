import { getTranslations } from 'next-intl/server';

import { routing } from '@i18n/routing';

import styles from './about.module.css';

export const dynamic = 'force-static';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <p className={styles.label}>{t('label')}</p>
        <h1 className={styles.name}>{t('name')}</h1>
        <p className={styles.bio}>{t('bio')}</p>
        <div className={styles.links}>
          <a
            href="https://github.com/alexspearsi"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {t('github')}
          </a>
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {t('course')}
          </a>
        </div>
      </div>
    </main>
  );
}
