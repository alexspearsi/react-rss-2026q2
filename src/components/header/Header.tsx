'use client';

import moonIcon from '@/assets/icons/moon.svg';
import sunIcon from '@/assets/icons/sun.svg';
import { useTheme } from '@/context/ThemeContext';
import { Link } from '@i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import styles from './Header.module.css';

export function Header() {
  const t = useTranslations('nav');
  const tTheme = useTranslations('theme');
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const locale = pathname.split('/')[1] as 'en' | 'ru';

  function switchLocale() {
    const next = locale === 'en' ? 'ru' : 'en';
    const segments = pathname.split('/');

    segments[1] = next;
    window.location.href = segments.join('/');
  }

  const isArticlesActive = pathname === `/${locale}` || pathname === `/${locale}/`;
  const isAboutActive = pathname.startsWith(`/${locale}/about`);

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
