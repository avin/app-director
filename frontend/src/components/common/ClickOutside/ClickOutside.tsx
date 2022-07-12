import React, { useCallback, useEffect, useRef } from 'react';

interface Props {
  container?: React.ComponentType | 'div' | 'button' | 'header';
  onClickOutside(e: Event): void;
  [x: string]: unknown;
}

let isTouch = false;

const ClickOutside = ({
  container: Container = 'div',
  children,
  onClickOutside,
  ...props
}: React.PropsWithChildren<Props>) => {
  const containerRef = useRef<React.ElementRef<typeof Container>>(null);

  const handle = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (e.type === 'touchend') {
        isTouch = true;
      }

      if (e.type === 'click' && isTouch) {
        return;
      }

      const el = containerRef.current;

      if (el && !(el as HTMLElement).contains(e.target as Node)) {
        onClickOutside(e);
      }
    },
    [onClickOutside],
  );

  useEffect(() => {
    document.addEventListener('touchend', handle, true);
    document.addEventListener('click', handle, true);

    return () => {
      document.removeEventListener('touchend', handle, true);
      document.removeEventListener('click', handle, true);
    };
  }, [handle]);

  return (
    <Container {...props} ref={containerRef}>
      {children}
    </Container>
  );
};

export default ClickOutside;
