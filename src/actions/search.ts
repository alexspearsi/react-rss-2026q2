'use server';

import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';

export async function searchAction(_: null, formData: FormData) {
  const locale = await getLocale();

  const query = ((formData.get('search') as string) ?? '').trim();

  const params = new URLSearchParams();

  if (query) {
    params.set('search', query);
  }

  params.set('page', '1');

  redirect(`/${locale}?${params.toString()}`);
}
