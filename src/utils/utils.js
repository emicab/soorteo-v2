export const delayRedirect = (navigate, path) => {
  setTimeout(() => {
    navigate(path);
  }, 50);
};
