'use client';

import moonIcon from '@/assets/icons/moon.svg';
import sunIcon from '@/assets/icons/sun.svg';
import { useTheme } from '@/context/ThemeContext';
import { Link, usePathname, useRouter } from '@i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import styles from './Header.module.css';

export function Header() {
  const t = useTranslations('nav');
  const tTheme = useTranslations('theme');
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale() as 'en' | 'ru';

  function switchLocale() {
    const next = locale === 'en' ? 'ru' : 'en';
    const search = searchParams.toString();

    router.replace(`${pathname}${search ? `?${search}` : ''}`, { locale: next });
  }

  const isArticlesActive = pathname === '/' || pathname === '';
  const isAboutActive = pathname.startsWith('/about');

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link
          href="/"
          className={`${styles.navLink} ${isArticlesActive ? styles.navLinkActive : ''}`}
        >
          {t('articles')}
        </Link>
        <Link
          href="/about"
          className={`${styles.navLink} ${isAboutActive ? styles.navLinkActive : ''}`}
        >
          {t('about')}
        </Link>

        <button className={styles.themeButton} onClick={toggleTheme}>
          <Image
            src={theme === 'dark' ? sunIcon : moonIcon}
            alt={theme === 'dark' ? tTheme('switchToLight') : tTheme('switchToDark')}
            width={18}
            height={18}
          />
        </button>

        <button className={styles.langButton} onClick={switchLocale}>
          {locale === 'en' ? 'RU' : 'EN'}
        </button>
      </nav>
    </header>
  );
}
