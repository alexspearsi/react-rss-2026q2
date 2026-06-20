'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { Link } from '../../../i18n/navigation';
import moonIcon from '../../assets/icons/moon.svg';
import sunIcon from '../../assets/icons/sun.svg';
import { useTheme } from '../../context/ThemeContext';

import styles from './Header.module.css';

export function Header() {
  const t = useTranslations('nav');
  const tTheme = useTranslations('theme');
  const { theme, toggleTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: string) {
    const withoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${next}${withoutLocale}`);
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          {t('articles')}
        </Link>
        <Link href="/about" className={styles.navLink}>
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

        <button
          className={styles.langButton}
          onClick={() => switchLocale(locale === 'en' ? 'ru' : 'en')}
        >
          {locale === 'en' ? 'RU' : 'EN'}
        </button>
      </nav>
    </header>
  );
}
