import { fireEvent, render, screen } from '@testing-library/react';

import Modal from './Modal';

describe('Modal', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <p>content</p>
      </Modal>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders children when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <p>modal content</p>
      </Modal>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('modal content')).toBeInTheDocument();
  });

  it('calls onClose when ESC key is pressed', () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>content</p>
      </Modal>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>content</p>
      </Modal>,
    );

    fireEvent.click(screen.getByLabelText('Close modal'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>content</p>
      </Modal>,
    );

    fireEvent.click(screen.getByRole('dialog'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>inner content</p>
      </Modal>,
    );

    fireEvent.click(screen.getByText('inner content'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders via portal into document.body, not into component container', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <p>content</p>
      </Modal>,
    );

    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(document.body.querySelector('[role="dialog"]')).not.toBeNull();
  });
});
