export const toTitleCase = (s: string) => {
  const res = `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
  return res;
};
