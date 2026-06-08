import type { FormSubmission } from '../../types/form.types';

import styles from './FormCard.module.css';

interface Props {
  submission: FormSubmission;
  isNew: boolean;
}

const FormCard = ({ submission, isNew }: Props) => {
  return (
    <div className={`${styles.card} ${isNew ? styles.new : ''}`}>
      {submission.image && <img src={submission.image} alt="profile" className={styles.image} />}
      <div className={styles.info}>
        <p>
          <strong>Name:</strong> {submission.name}
        </p>
        <p>
          <strong>Age:</strong> {submission.age}
        </p>
        <p>
          <strong>Email:</strong> {submission.email}
        </p>
        <p>
          <strong>Gender:</strong> {submission.gender}
        </p>
        <p>
          <strong>Country:</strong> {submission.country}
        </p>
        <p>
          <strong>Terms:</strong> {submission.termsAccepted ? 'Accepted' : '—'}
        </p>
      </div>
    </div>
  );
};

export default FormCard;
