export const getUrlQueryParam = (paramName: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
};
