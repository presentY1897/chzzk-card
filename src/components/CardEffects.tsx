import React from 'react';
import type { CardEffect } from '../types';
import './CardEffects.css';

interface CardEffectsProps {
  effects: CardEffect[];
}

const CardSurfaceEffects = ({ effects }: CardEffectsProps) => {
  return (
    <>
      {effects.includes('shine') && <div className="card-shine"></div>}
      {effects.includes('glow') && <div className="card-glow"></div>}
      {effects.includes('sparkle') && <div className="card-sparkle"></div>}
      {effects.includes('interactive-sparkle') && <div className="card-interactive-sparkle"></div>}
    </>
  );
};

export default CardSurfaceEffects;
