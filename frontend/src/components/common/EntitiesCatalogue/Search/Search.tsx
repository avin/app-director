import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Search.module.scss';
import { Button, ControlGroup, InputGroup } from '@blueprintjs/core';
import debounce from 'lodash/debounce';

interface Props {
  onChange: (v: string) => void;
  defaultValue?: string;
}

const Search = ({ onChange, defaultValue }: Props) => {
  const [value, setValue] = useState(defaultValue || '');

  const onChangeDebounced = useMemo(() => {
    return debounce((val: string) => {
      onChange(val);
    }, 500);
  }, [onChange]);

  useEffect(() => {
    onChangeDebounced(value);
  }, [onChangeDebounced, value]);

  const handleSearchValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue(value);
  }, []);

  const handleClear = useCallback(() => {
    setValue('');
  }, []);

  return (
    <ControlGroup className={styles.searchControlGroup}>
      <InputGroup
        placeholder="Быстрый поиск..."
        leftIcon="search"
        onChange={handleSearchValue}
        value={value}
        fill
        rightElement={value ? <Button icon="cross" onClick={handleClear} minimal /> : undefined}
      />
    </ControlGroup>
  );
};

export default Search;
