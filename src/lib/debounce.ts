export function debounce<
  T extends (...args: never[]) => void
>(
  callback: T,
  delay: number
) {
  let timeout:
    | ReturnType<typeof setTimeout>
    | undefined;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
