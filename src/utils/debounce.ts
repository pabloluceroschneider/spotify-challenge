export const debounce = <F extends (...args: any) => any>(
  callback: Function,
  waitFor = 300
) => {
  let timeout: number = 0;

  const debounced = (...args: any) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => callback(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};
