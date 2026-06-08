import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithStore } from '../../test-utils';

import UncontrolledForm from './UncontrolledForm';

describe('UncontrolledForm', () => {
  it('renders all required fields', () => {
    renderWithStore(<UncontrolledForm onClose={vi.fn()} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it('submit button is always enabled (validates on submit only)', () => {
    renderWithStore(<UncontrolledForm onClose={vi.fn()} />);

    expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled();
  });

  it('does not show errors before submit', () => {
    renderWithStore(<UncontrolledForm onClose={vi.fn()} />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'lowercase' },
    });

    expect(screen.queryByText(/first letter must be uppercase/i)).not.toBeInTheDocument();
  });

  it('shows password strength indicator while typing', async () => {
    renderWithStore(<UncontrolledForm onClose={vi.fn()} />);

    await userEvent.type(screen.getByLabelText('Password'), 'abc');

    expect(screen.getByText(/strength/i)).toBeInTheDocument();
  });

  it('calls onClose after successful submission', async () => {
    const onClose = vi.fn();

    renderWithStore(<UncontrolledForm onClose={onClose} />);

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

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
