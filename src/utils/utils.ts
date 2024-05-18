export const generateSessionId = () => {
  // TODO: use crypto library instead.
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
