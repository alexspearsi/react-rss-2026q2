export interface PasswordStrength {
  hasNumber: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasSpecial: boolean;
  score: number;
}

export function getPasswordStrength(password: string): PasswordStrength {
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const score = [hasNumber, hasUppercase, hasLowercase, hasSpecial].filter((item) =>
    Boolean(item),
  ).length;

  return { hasNumber, hasUppercase, hasLowercase, hasSpecial, score };
}
