import React, {
  forwardRef,
  ReactElement,
  ReactNode,
  useEffect,
  useRef
} from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { animated, useSpring } from 'react-spring';

let timeout: any;

const Backdrop = styled.div`
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
  position: fixed;
  width: 100%;
  height: 100%;
`;

export function Modal({
  children,
  isOpen,
  onClose
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}) {
  const elementRef = useRef<HTMLDivElement | undefined>(undefined);

  useEffect(() => {
    elementRef.current = window.document.createElement('div');
  }, []);

  useEffect(() => {
    clearTimeout(timeout);

    if (elementRef.current !== undefined) {
      elementRef.current.style.position = 'fixed';
      elementRef.current.style.top = '0';
      elementRef.current.style.right = '0';
      elementRef.current.style.bottom = '0';
      elementRef.current.style.left = '0';

      if (isOpen) {
        elementRef.current.style.zIndex = '1300';
      } else {
        timeout = setTimeout(() => {
          if (elementRef.current !== undefined) {
            elementRef.current.style.zIndex = '-1';
            window.document.body.removeChild(elementRef.current);
          }
        }, 500);
      }

      window.document.body.appendChild(elementRef.current);
    }

    return () => {
      clearTimeout(timeout);

      if (
        elementRef.current &&
        window.document.body.contains(elementRef.current)
      ) {
        window.document.body.removeChild(elementRef.current);
      }
    };
  }, [isOpen]);

  if (elementRef.current === undefined) {
    return null;
  }

  return createPortal(
    <Fade in={isOpen}>
      <>
        <Backdrop aria-hidden="true" onClick={onClose} />
        {children}
      </>
    </Fade>,
    elementRef.current
  );
}

// Fade component.
type FadeProps = {
  children?: ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
};

const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    transitionDuration: '500s',
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});