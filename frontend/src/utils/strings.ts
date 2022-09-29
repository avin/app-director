export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const pluralize = (str: string) => {
  if (str.endsWith('s')) {
    return `${str}es`;
  }
  if (str.endsWith('y')) {
    return str.replace(/y$/, 'ies');
  }
  return `${str}s`;
};

export const defaultValuesQueryParam = (values: Record<string, unknown>) => {
  const val = encodeURIComponent(JSON.stringify(values));
  return `defaultValues=${val}`;
};
