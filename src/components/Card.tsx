import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import './Card.css';

interface CardProps {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  effects?: ('border' | 'shine' | 'glow' | 'sparkle' | 'interactive-sparkle')[];
}

const Card = ({ type, src, alt = 'Card media', effects = [] }: CardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (clientX: number, clientY: number, rect: DOMRect) => {
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;

    const xPct = localX / rect.width - 0.5;
    const yPct = localY / rect.height - 0.5;

    x.set(yPct * -200); // Inverting y for more natural rotation
    y.set(xPct * 200);

    if (cardRef.current) {
      cardRef.current.style.setProperty('--x', `${localX}px`);
      cardRef.current.style.setProperty('--y', `${localY}px`);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    handlePointerMove(event.clientX, event.clientY, rect);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const touch = event.touches[0];
    if (touch) {
      handlePointerMove(touch.clientX, touch.clientY, rect);
    }
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
    if (cardRef.current) {
      cardRef.current.style.setProperty('--x', `50%`);
      cardRef.current.style.setProperty('--y', `50%`);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="card-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handlePointerLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handlePointerLeave}
      onTouchCancel={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {effects.includes('border') && <div className="card-border"></div>}
      <div className="card">
        {effects.includes('shine') && <div className="card-shine"></div>}
        {effects.includes('glow') && <div className="card-glow"></div>}
        {effects.includes('sparkle') && <div className="card-sparkle"></div>}
        {effects.includes('interactive-sparkle') && <div className="card-interactive-sparkle"></div>}
        <div className="card-content">
          {type === 'image' && (
            <img className="card-media" src={src} alt={alt} />
          )}
          {type === 'video' && (
            <video className="card-media" src={src} autoPlay loop muted playsInline />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;