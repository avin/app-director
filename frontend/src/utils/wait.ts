/**
 * Вернуть промис ожидания
 * @param ms - время в мс для ожидания завершения промиса
 * @returns {Promise}
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Вернуть бесконечный промис (ждать бесконечность)
 * @returns {Promise}
 */
export function waitInfinity() {
  return new Promise(() => {});
}
