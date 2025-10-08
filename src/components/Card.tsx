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
// ... (rest of the component is the same) ...
      <div className="card">
        {effects.includes('shine') && <div className="card-shine"></div>}
        {effects.includes('glow') && <div className="card-glow"></div>}
        {effects.includes('sparkle') && <div className="card-sparkle"></div>}
        {effects.includes('interactive-sparkle') && <div className="card-interactive-sparkle"></div>}
        <div className="card-content">
          {type === 'image' && (
            <img className="card-media" src={src} alt={alt} />
// ... (rest of the component is the same) ...
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
