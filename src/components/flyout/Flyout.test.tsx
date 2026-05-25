import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Flyout } from './Flyout';
import type { Article } from '../../types/article';
import { renderWithProviders } from '../../test-utils';

const MOCK_ARTICLE: Article = {
  id: 1,
  title: 'Test Article',
  summary: 'Test summary',
  url: 'https://news.com/article',
  image_url: 'https://news.com/img.jpg',
  news_site: 'NASA',
  published_at: '2024-06-15T12:00:00Z',
  updated_at: '2024-06-15T12:00:00Z',
  featured: false,
  authors: [],
  launches: [],
  events: [],
};

describe('Flyout', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders nothing when no items are selected', () => {
    const { container } = renderWithProviders(<Flyout />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders when at least one item is selected', () => {
    renderWithProviders(<Flyout />, { preloadedItems: [MOCK_ARTICLE] });
    expect(screen.getByText(/selected/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Unselect all' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Download' }),
    ).toBeInTheDocument();
  });

  it('displays the correct number of selected items', () => {
    const items = [MOCK_ARTICLE, { ...MOCK_ARTICLE, id: 2 }];

    renderWithProviders(<Flyout />, { preloadedItems: items });
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('clears all items when "Unselect all" is clicked', () => {
    const { store } = renderWithProviders(<Flyout />, {
      preloadedItems: [MOCK_ARTICLE],
    });

    fireEvent.click(screen.getByRole('button', { name: 'Unselect all' }));

    expect(store.getState().selectedItems.items).toHaveLength(0);
  });

  it('triggers file download when "Download" is clicked', () => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test-url');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    renderWithProviders(<Flyout />, { preloadedItems: [MOCK_ARTICLE] });
    fireEvent.click(screen.getByRole('button', { name: 'Download' }));

    expect(URL.createObjectURL).toHaveBeenCalledOnce();
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalledOnce();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:test-url');
  });

  it('uses item count in the downloaded filename', () => {
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test-url');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});

    const downloadAttr: string[] = [];
    const originalCreate = document.createElement.bind(document);

    vi.spyOn(document, 'createElement').mockImplementation(
      (tag: string, options?: ElementCreationOptions) => {
        const el = originalCreate(tag, options);

        if (tag === 'a') {
          vi.spyOn(el as HTMLAnchorElement, 'click').mockImplementation(() => {
            downloadAttr.push((el as HTMLAnchorElement).download);
          });
        }

        return el;
      },
    );

    const items = [
      MOCK_ARTICLE,
      { ...MOCK_ARTICLE, id: 2 },
      { ...MOCK_ARTICLE, id: 3 },
    ];

    renderWithProviders(<Flyout />, { preloadedItems: items });

    fireEvent.click(screen.getByRole('button', { name: 'Download' }));

    expect(downloadAttr[0]).toBe('3_items.csv');
  });
});
