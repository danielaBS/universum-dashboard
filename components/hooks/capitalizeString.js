export const capitalizeStr = (str) => {
  const lower = str.toString().toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
};
