import { useEffect, useRef, useState } from "react";
import { Input } from "../atoms";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  debounceMs = 400,
}: SearchInputProps) => {
  const [draft, setDraft] = useState(value);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChangeRef.current(draft);
    }, debounceMs);
    return () => clearTimeout(timeout);
  }, [draft, debounceMs]);

  return (
    <Input
      type="search"
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      placeholder={placeholder}
    />
  );
};
