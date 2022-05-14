/**
 * Блокировщик для фокуса (фокус не выставится на элементы внутри выбранного элемента)
 * @param element
 */
export const blockFocus = (element: HTMLElement): (() => void) => {
  const focusableEls: NodeListOf<HTMLInputElement> = element.querySelectorAll(
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]'
  );

  focusableEls.forEach((el) => {
    const originalTabIndex = el.tabIndex;
    el.tabIndex = -1;
    el.dataset.originalTabIndex = String(originalTabIndex || '');
  });

  return () => {
    focusableEls.forEach((el) => {
      const { originalTabIndex } = el.dataset;
      delete el.dataset.originalTabIndex;
      if (originalTabIndex) {
        el.tabIndex = Number(originalTabIndex);
      } else {
        el.removeAttribute('tabindex');
      }
    });
  };
};
