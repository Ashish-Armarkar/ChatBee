export const sessionData = () => {
  return JSON.parse(localStorage.getItem("session") ?? "");
};
