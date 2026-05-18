import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ArticleSkeleton } from './ArticleSkeleton';

describe('ArticleSkeleton', () => {
  it('renders with data-testid skeleton', () => {
    render(<ArticleSkeleton />);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });
});
