import { describe, expect, it } from 'vitest';

import { formatDate } from './format-date';

describe('formatDate', () => {
  it('returns a non-empty string for a valid date', () => {
    const result = formatDate('2024-06-15T12:00:00Z');

    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });

  it('includes the year in the output', () => {
    const result = formatDate('2024-06-15T12:00:00Z');

    expect(result).toContain('2024');
  });

  it('includes the month name in the output', () => {
    const result = formatDate('2024-06-15T12:00:00Z');

    expect(result).toContain('Jun');
  });
});
