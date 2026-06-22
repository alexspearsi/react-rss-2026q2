import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { Header } from '@/components/header/Header';
import { routing } from '@i18n/routing';
import { ThemeProvider } from '@/context/ThemeContext';
import { StoreProvider } from '@/store/StoreProvider';
import { Flyout } from '@/components/flyout/Flyout';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ru')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <ThemeProvider>
              <Header />
              {children}
              <Flyout  />
            </ThemeProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
