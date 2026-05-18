import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders nothing when total pages is 1 or less', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalCount={5}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders page buttons', () => {
    render(
      <Pagination
        currentPage={1}
        totalCount={30}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
  });

  it('disables prev button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalCount={30}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: '←' })).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination
        currentPage={3}
        totalCount={30}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: '→' })).toBeDisabled();
  });

  it('calls onPageChange with next page on → click', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={1}
        totalCount={30}
        pageSize={10}
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByRole('button', { name: '→' }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with prev page on ← click', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={2}
        totalCount={30}
        pageSize={10}
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByRole('button', { name: '←' }));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange with selected page number', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={1}
        totalCount={30}
        pageSize={10}
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByRole('button', { name: '2' }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('shows ellipsis for many pages', () => {
    render(
      <Pagination
        currentPage={5}
        totalCount={100}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getAllByText('…').length).toBeGreaterThan(0);
  });
});
