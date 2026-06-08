import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithStore } from '../../test-utils';

import HookForm from './HookForm';

describe('HookForm', () => {
  it('renders all required fields', () => {
    renderWithStore(<HookForm onClose={vi.fn()} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it('submit button is disabled when form is empty', () => {
    renderWithStore(<HookForm onClose={vi.fn()} />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('shows validation error for invalid name in real time', async () => {
    renderWithStore(<HookForm onClose={vi.fn()} />);

    await userEvent.type(screen.getByLabelText('Name'), 'lowercase');

    await waitFor(() => {
      expect(screen.getByText(/first letter must be uppercase/i)).toBeInTheDocument();
    });
  });

  it('shows password strength indicator while typing', async () => {
    renderWithStore(<HookForm onClose={vi.fn()} />);

    await userEvent.type(screen.getByLabelText('Password'), 'abc');

    expect(screen.getByText(/strength/i)).toBeInTheDocument();
  });

  it('calls onClose after successful submission', async () => {
    const onClose = vi.fn();

    renderWithStore(<HookForm onClose={onClose} />);

    await userEvent.type(screen.getByLabelText('Name'), 'John');
    await userEvent.type(screen.getByLabelText('Age'), '25');
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
    await userEvent.selectOptions(screen.getByLabelText('Gender'), 'male');
    await userEvent.type(screen.getByLabelText('Password'), 'Password1!');
    await userEvent.type(screen.getByLabelText('Confirm Password'), 'Password1!');
    await userEvent.type(screen.getByLabelText('Country'), 'Germany');

    const file = new File(['img'], 'photo.png', { type: 'image/png' });
    await userEvent.upload(screen.getByLabelText(/image/i), file);

    await userEvent.click(screen.getByLabelText(/terms/i));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled();
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
