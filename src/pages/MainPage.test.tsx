import { fireEvent, screen } from '@testing-library/react';

import { renderWithStore } from '../test-utils';

import MainPage from './MainPage';

describe('MainPage', () => {
  it('renders form open buttons', () => {
    renderWithStore(<MainPage />);

    expect(screen.getByRole('button', { name: /uncontrolled form/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /react hook form/i })).toBeInTheDocument();
  });

  it('shows empty state when there are no submissions', () => {
    renderWithStore(<MainPage />);

    expect(screen.getByText(/no submissions yet/i)).toBeInTheDocument();
  });

  it('opens modal when uncontrolled form button is clicked', () => {
    renderWithStore(<MainPage />);

    fireEvent.click(screen.getByRole('button', { name: /uncontrolled form/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('opens modal when hook form button is clicked', () => {
    renderWithStore(<MainPage />);

    fireEvent.click(screen.getByRole('button', { name: /react hook form/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes modal when ESC is pressed', () => {
    renderWithStore(<MainPage />);

    fireEvent.click(screen.getByRole('button', { name: /uncontrolled form/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
