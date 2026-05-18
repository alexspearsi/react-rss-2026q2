import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders 404 code and message', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('renders back to articles button', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('button', { name: 'back to articles' }),
    ).toBeInTheDocument();
  });

  it('navigates on back button click without errors', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'back to articles' }));
  });
});
