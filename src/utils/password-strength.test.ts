import { getPasswordStrength } from './password-strength';

describe('getPasswordStrength', () => {
  it('returns score 0 for empty string', () => {
    expect(getPasswordStrength('').score).toBe(0);
  });

  it('finds number', () => {
    expect(getPasswordStrength('1').hasNumber).toBe(true);
  });

  it('finds uppercase letter', () => {
    expect(getPasswordStrength('A').hasUppercase).toBe(true);
  });

  it('finds lowercase letter', () => {
    expect(getPasswordStrength('a').hasLowercase).toBe(true);
  });

  it('finds special character', () => {
    expect(getPasswordStrength('!').hasSpecial).toBe(true);
  });

  it('returns score 4 for password with all criteria', () => {
    const result = getPasswordStrength('Password123!');

    expect(result.score).toBe(4);
    expect(result.hasNumber).toBe(true);
    expect(result.hasUppercase).toBe(true);
    expect(result.hasLowercase).toBe(true);
    expect(result.hasSpecial).toBe(true);
  });

  it('returns score 2 when only lowercase and number present', () => {
    const result = getPasswordStrength('abc123');
    expect(result.score).toBe(2);
    expect(result.hasUppercase).toBe(false);
    expect(result.hasSpecial).toBe(false);
  });
});
