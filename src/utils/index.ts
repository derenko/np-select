import { NpBaseSelectOption } from '@/types';

export const debounce = (cb: (...args: any[]) => void, timeout = 500) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(this, args);
    }, timeout);
  };
};

export const onClickOutside = (target: Node, callback: () => void) => {
  document.addEventListener('click', e => {
    if (e.currentTarget !== target && !target.contains(e.target as Node)) {
      callback();
    }
  });
};

export const multiWordSearch = (
  array: NpBaseSelectOption[],
  search: string,
) => {
  const searchWords = search.toLowerCase().split(' ');

  return array.filter(item =>
    searchWords.every(word => item.label.toLowerCase().includes(word)),
  );
};
