import config from '@/config';
import { FocusStyleManager } from '@blueprintjs/core';

export const prepareBrowser = () => {
  FocusStyleManager.onlyShowFocusOnTabs();
};

/**
 * Спрятать ошибки TS в консоли браузера (смотрите в системной консоли)
 */
export const hideTsErrorsInConsole = (): void => {
  // Скрывает TS ошибки в консоли браузера
  const oWarn = console.warn;
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].indexOf('TypeScript error') !== -1
    ) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    oWarn(...args);
  };
};

/**
 * Вставить скрипт на страницу
 * @param src
 */
export const injectJs = async (src: string): Promise<void> => {
  const data = await fetch(src, {
    method: 'GET',
  }).then((r) => r.text());

  // eslint-disable-next-line no-eval
  eval(data);
};

/**
 * Скрыть лоадер который появляется до загрузки приложения (вшит в index.html)
 */
export const hidePageLoadingSpinner = (): void => {
  const pageLoadingEl = document.getElementById(config.pageLoadingElementId);
  if (pageLoadingEl) {
    pageLoadingEl.style.display = 'none';
  }
};
