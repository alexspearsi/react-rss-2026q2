import { useController, useForm, useWatch } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addSubmission } from '../../store/slices/submitssion-slice';
import { imageToBase64 } from '../../utils/image-to-base-64';
import { formSchema } from '../../validation/form.schema';
import type { FormValues } from '../../validation/form.schema';
import CountryAutocomplete from '../CountryAutocomplete/CountryAutocomplete';
import PasswordStrength from '../PasswordStrength/PasswordStrength';

import styles from './Form.module.css';

interface Props {
  onClose: () => void;
}

const HookForm = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries.list);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    mode: 'onChange',
  });

  const passwordValue = useWatch({ control, name: 'password' }) ?? '';

  const {
    field: { onChange: onImageChange, ref: imageRef },
    fieldState: { error: imageError },
  } = useController({ name: 'image', control });

  const {
    field: { value: countryValue, onChange: onCountryChange },
    fieldState: { error: countryError },
  } = useController({ name: 'country', control, defaultValue: '' });

  const onSubmit = async (data: FormValues) => {
    if (!countries.includes(data.country)) {
      setError('country', { message: 'Country must be selected from the list' });
      return;
    }

    const imageBase64 = await imageToBase64(data.image);

    dispatch(
      addSubmission({
        name: data.name,
        age: data.age,
        email: data.email,
        gender: data.gender,
        termsAccepted: data.termsAccepted,
        password: data.password,
        country: data.country,
        image: imageBase64,
      }),
    );

    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
      <h2>React Hook Form</h2>

      <div className={styles.field}>
        <label htmlFor="hf-name">Name</label>
        <input id="hf-name" type="text" {...register('name')} />
        <span className={styles.error}>{errors.name?.message}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="hf-age">Age</label>
        <input id="hf-age" type="number" min={0} {...register('age')} />
        <span className={styles.error}>{errors.age?.message}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="hf-email">Email</label>
        <input id="hf-email" type="text" {...register('email')} />
        <span className={styles.error}>{errors.email?.message}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="hf-gender">Gender</label>
        <select id="hf-gender" defaultValue="" {...register('gender')}>
          <option value="" disabled>
            Select gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <span className={styles.error}>{errors.gender?.message}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="hf-country">Country</label>
        <CountryAutocomplete
          id="hf-country"
          name="country"
          value={countryValue}
          onChange={onCountryChange}
          error={countryError?.message}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="hf-password">Password</label>
        <input id="hf-password" type="password" {...register('password')} />
        <PasswordStrength password={passwordValue} />
        <span className={styles.error}>{errors.password?.message}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="hf-confirm">Confirm Password</label>
        <input id="hf-confirm" type="password" {...register('confirmPassword')} />
        <span className={styles.error}>{errors.confirmPassword?.message}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="hf-image">Image (jpg/png, max 2 MB)</label>
        <input
          id="hf-image"
          type="file"
          accept="image/jpeg,image/png"
          ref={imageRef}
          onChange={(e) => onImageChange(e.target.files?.[0] ?? null)}
        />
        <span className={styles.error}>{imageError?.message}</span>
      </div>

      <div className={styles.field}>
        <input id="hf-terms" type="checkbox" {...register('termsAccepted')} />
        <label htmlFor="hf-terms">I accept the Terms & Conditions</label>
        <span className={styles.error}>{errors.termsAccepted?.message}</span>
      </div>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default HookForm;
