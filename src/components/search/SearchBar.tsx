import styles from './SearchBar.module.css';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export const SearchBar = ({ value, onChange, onSearch }: Props) => {
  const handleSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();

    onSearch();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={onChange}
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
};
