export const truncate = (str, lengthOfStr) => {
  if (str.length > lengthOfStr) {
    return `${str.substring(0, lengthOfStr)}...`;
  }
  return str;
};
