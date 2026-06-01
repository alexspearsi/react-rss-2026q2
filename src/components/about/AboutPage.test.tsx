import { MemoryRouter } from 'react-router';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AboutPage } from './AboutPage';

describe('AboutPage', () => {
  it('renders author name', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Alex' })).toBeInTheDocument();
  });

  it('renders GitHub link', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link', { name: 'GitHub' });

    expect(link).toHaveAttribute('href', 'https://github.com/alexspearsi');
  });

  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: 'Articles' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });
});
