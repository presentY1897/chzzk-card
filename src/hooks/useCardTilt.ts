import React, { useRef, useEffect } from 'react';
import { useMotionValue, useTransform, animate } from 'framer-motion';

type CardEventHandlers = {
  onMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
  onTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: () => void;
  onTouchCancel: () => void;
};

export const useCardTilt = (isAnimating: boolean) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [20, -20]);
  const rotateY = useTransform(x, [-100, 100], [-20, 20]);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAnimating) {
      animate(x, 0, { duration: 0.3, ease: 'easeOut' });
      animate(y, 0, { duration: 0.3, ease: 'easeOut' });
    }
  }, [isAnimating, x, y]);

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (isAnimating || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;
    const xPct = localX / rect.width - 0.5;
    const yPct = localY / rect.height - 0.5;
    x.set(yPct * -200);
    y.set(xPct * 200);

    cardRef.current.style.setProperty('--x', `${localX}px`);
    cardRef.current.style.setProperty('--y', `${localY}px`);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    handlePointerMove(event.clientX, event.clientY);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (touch) {
      handlePointerMove(touch.clientX, touch.clientY);
    }
  };

  const handlePointerLeave = () => {
    if (isAnimating || !cardRef.current) return;
    x.set(0);
    y.set(0);
    cardRef.current.style.setProperty('--x', `50%`);
    cardRef.current.style.setProperty('--y', `50%`);
  };

  const eventHandlers: CardEventHandlers = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handlePointerLeave,
    onTouchMove: handleTouchMove,
    onTouchEnd: handlePointerLeave,
    onTouchCancel: handlePointerLeave,
  };

  return {
    cardRef,
    rotateX,
    rotateY,
    eventHandlers,
  };
};
