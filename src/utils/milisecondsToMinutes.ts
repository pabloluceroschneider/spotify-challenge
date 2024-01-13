export const milisecondsToMinutes = (miliseconds: number) => {
  const minutes = Math.floor(miliseconds / 60000);
  const seconds = String(miliseconds % 60000).slice(0, 2);
  return `${minutes}:${seconds}`;
};
