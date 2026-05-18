import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ArticleDetailSkeleton } from './ArticleDetailSkeleton';

describe('ArticleDetailSkeleton', () => {
  it('renders without crashing', () => {
    const { container } = render(<ArticleDetailSkeleton />);

    expect(container.firstChild).not.toBeNull();
  });
});
