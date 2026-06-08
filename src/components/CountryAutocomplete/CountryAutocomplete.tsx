import { useAppSelector } from '../../store/hooks';

import styles from './CountryAutocomplete.module.css';

interface CountryAutocompleteProps {
  id: string;
  name: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

const CountryAutocomplete = ({
  id,
  name,
  defaultValue,
  value,
  onChange,
  error,
}: CountryAutocompleteProps) => {
  const countries = useAppSelector((state) => state.countries.list);
  const listId = `${id}-list`;

  return (
    <div>
      <input
        id={id}
        name={name}
        type="text"
        list={listId}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        autoComplete="off"
      />
      <datalist id={listId}>
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default CountryAutocomplete;
