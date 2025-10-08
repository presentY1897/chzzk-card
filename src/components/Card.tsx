import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import './Card.css';

interface CardProps {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

const Card = ({ type, src, alt = 'Card media' }: CardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct * 200);
    y.set(yPct * 200);

    if (cardRef.current) {
      cardRef.current.style.setProperty('--x', `${mouseX}px`);
      cardRef.current.style.setProperty('--y', `${mouseY}px`);
    }
  };

  const handleMouseLeave = () => {
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
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="card-border"></div>
      <div className="card">
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
