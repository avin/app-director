import React, { useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import styles from './WrappedUp.module.scss';
import { blockFocus } from '@/utils/blockFocus';

interface Props extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  // is open state
  open?: boolean;
  // animation duration
  duration?: number;
  // container className
  className?: string;
  // unmount on exit
  unmountOnExit?: boolean;
  // классы для CSSTransition
  cssTransitionClassNames?: CSSTransitionClassNames;
}

const WrappedUp = ({
  children,
  open = false,
  duration = 0,
  style,
  cssTransitionClassNames,
  unmountOnExit = false,
  ...props
}: Props) => {
  const measureRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const changeHeightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = open ? 'auto' : '0px';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (changeHeightTimerRef.current) {
      clearTimeout(changeHeightTimerRef.current);
    }

    if (contentRef.current && measureRef.current) {
      if (open) {
        contentRef.current.style.height = `${measureRef.current.clientHeight}px`;
        changeHeightTimerRef.current = setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.style.height = 'auto';
          }
        }, duration);
      } else {
        contentRef.current.style.height = `${measureRef.current.clientHeight}px`;
        void contentRef.current.offsetWidth;
        contentRef.current.style.height = `0px`;
      }
    }
  }, [open, duration]);

  useEffect(() => {
    let blockFocusDispose;
    if (!open) {
      if (contentRef.current) {
        blockFocusDispose = blockFocus(contentRef.current);
      }
    }

    return () => {
      if (blockFocusDispose) {
        blockFocusDispose();
      }
    };
  }, [open]);

  return (
    <TransitionGroup>
      {open && (
        <CSSTransition
          timeout={duration}
          unmountOnExit={unmountOnExit}
          classNames={cssTransitionClassNames}
          nodeRef={contentRef}
        >
          <div ref={contentRef} style={{ ...style, height: 0, overflow: 'hidden' }} {...props}>
            <div ref={measureRef} className={styles.measure}>
              {children}
            </div>
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

export default WrappedUp;
