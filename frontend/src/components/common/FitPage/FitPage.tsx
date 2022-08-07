import React, { useCallback, useEffect, useRef } from 'react';
import styles from './FitPage.module.scss';

interface Props {
  minHeight?: number;
  bottomOffset?: number;
}

const FitPage = ({ children, bottomOffset = 0, minHeight = 0 }: React.PropsWithChildren<Props>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const resizeContainer = useCallback(() => {
    if (!containerRef.current) {
      return;
    }
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const windowHeight = window.innerHeight;

    container.style.height = `${Math.max(windowHeight - rect.y - bottomOffset, minHeight)}px`;
  }, [bottomOffset, minHeight]);

  useEffect(() => {
    resizeContainer();
    window.addEventListener('resize', resizeContainer);
    return () => {
      window.removeEventListener('resize', resizeContainer);
    };
  }, [resizeContainer]);

  return <div ref={containerRef}>{children}</div>;
};

export default FitPage;
