import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addSubmission } from '../../store/slices/submitssion-slice';
import { imageToBase64 } from '../../utils/image-to-base-64';
import { formSchema } from '../../validation/form.schema';
import type { FormValues } from '../../validation/form.schema';
import CountryAutocomplete from '../CountryAutocomplete/CountryAutocomplete';
import PasswordStrength from '../PasswordStrength/PasswordStrength';

import styles from './Form.module.css';

type FormErrors = Partial<Record<keyof FormValues, string>>;

interface Props {
  onClose: () => void;
}

const UncontrolledForm = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries.list);

  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordValue, setPasswordValue] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const rawValues = {
      name: data.get('name') as string,
      age: data.get('age') as string,
      email: data.get('email') as string,
      gender: data.get('gender') as string,
      termsAccepted: (form.elements.namedItem('termsAccepted') as HTMLInputElement).checked,
      password: data.get('password') as string,
      confirmPassword: data.get('confirmPassword') as string,
      country: data.get('country') as string,
      image: (form.elements.namedItem('image') as HTMLInputElement).files?.[0] ?? null,
    };

    const result = formSchema.safeParse(rawValues);

    if (!result.success) {
      const fieldErrors: FormErrors = {};

      for (const err of result.error.issues) {
        const field = err.path[0] as keyof FormValues;

        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      }

      setErrors(fieldErrors);

      return;
    }

    if (!countries.includes(result.data.country)) {
      setErrors({ country: 'Country must be selected from the list' });

      return;
    }

    const imageBase64 = await imageToBase64(result.data.image);

    dispatch(
      addSubmission({
        name: result.data.name,
        age: result.data.age,
        email: result.data.email,
        gender: result.data.gender,
        termsAccepted: result.data.termsAccepted,
        password: result.data.password,
        country: result.data.country,
        image: imageBase64,
      }),
    );

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <h2>Uncontrolled Form</h2>

      <div className={styles.field}>
        <label htmlFor="uc-name">Name</label>
        <input id="uc-name" name="name" type="text" />
        <span className={styles.error}>{errors.name}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="uc-age">Age</label>
        <input id="uc-age" name="age" type="number" min={0} />
        <span className={styles.error}>{errors.age}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="uc-email">Email</label>
        <input id="uc-email" name="email" type="text" />
        <span className={styles.error}>{errors.email}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="uc-gender">Gender</label>
        <select id="uc-gender" name="gender" defaultValue="">
          <option value="" disabled>
            Select gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <span className={styles.error}>{errors.gender}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="uc-country">Country</label>
        <CountryAutocomplete id="uc-country" name="country" />
        <span className={styles.error}>{errors.country}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="uc-password">Password</label>
        <input
          id="uc-password"
          name="password"
          type="password"
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <PasswordStrength password={passwordValue} />
        <span className={styles.error}>{errors.password}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="uc-confirm">Confirm Password</label>
        <input id="uc-confirm" name="confirmPassword" type="password" />
        <span className={styles.error}>{errors.confirmPassword}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="uc-image">Image (jpg/png, max 2 MB)</label>
        <input id="uc-image" name="image" type="file" accept="image/jpeg,image/png" />
        <span className={styles.error}>{errors.image}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="uc-terms">
          <input id="uc-terms" name="termsAccepted" type="checkbox" /> I accept the Terms &
          Conditions
        </label>
        <span className={styles.error}>{errors.termsAccepted}</span>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
