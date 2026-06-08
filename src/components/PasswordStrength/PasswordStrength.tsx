import { getPasswordStrength } from '../../utils/password-strength';

import styles from './PasswordStrength.module.css';

interface PasswordStrengthProps {
  password: string;
}

const LABELS = ['Weak', 'Fair', 'Good', 'Strong'];
const COLORS = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71'];

const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  if (!password) return null;

  const { hasNumber, hasUppercase, hasLowercase, hasSpecial, score } =
    getPasswordStrength(password);

  return (
    <div className={styles.strength}>
      <div className={styles.label} style={{ color: COLORS[score - 1] ?? '#999' }}>
        Strength: {score > 0 ? LABELS[score - 1] : 'Too weak'}
      </div>
      <ul className={styles.list}>
        <li className={hasNumber ? styles.met : undefined}>1 number</li>
        <li className={hasUppercase ? styles.met : undefined}>1 uppercase</li>
        <li className={hasLowercase ? styles.met : undefined}>1 lowercase</li>
        <li className={hasSpecial ? styles.met : undefined}>1 special character</li>
      </ul>
    </div>
  );
};

export default PasswordStrength;
