import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';
import { describe, it, expect, vi } from 'vitest';

describe('SearchBar', () => {
  it('renders input and search button', () => {
    render(<SearchBar value="" onChange={vi.fn()} onSearch={vi.fn()} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SearchBar value="" onChange={onChange} onSearch={vi.fn()} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'hello');

    expect(onChange).toHaveBeenCalled();
  });

  it('calls onSearch when form is submitted', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar value="" onChange={vi.fn()} onSearch={onSearch} />);

    const button = screen.getByRole('button');

    await user.click(button);

    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('displays the passed value in input', () => {
    render(
      <SearchBar value="hello world" onChange={vi.fn()} onSearch={vi.fn()} />,
    );

    expect(screen.getByRole('textbox')).toHaveValue('hello world');
  });
});
