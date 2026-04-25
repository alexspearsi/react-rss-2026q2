interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export function SearchBar({ value, onChange, onSearch }: Props) {
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={onChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}
