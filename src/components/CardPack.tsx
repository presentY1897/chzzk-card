import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import type { CardData } from '../types';
import './CardPack.css';

interface CardPackProps {
  card: CardData;
}

const PACK_WIDTH = 260;

const wrapperVariants = {
  open: {
    x: [-PACK_WIDTH / 2, 0],
    scale: [0.9, 1],
    opacity: [0.8, 1],
    transition: { duration: 0.4 }
  },
  closed: {
    x: 0,
    scale: 1,
    opacity: 1
  }
};

const cardVariants = {
  hidden: {
    scale: 0.5,
    rotateY: 90,
    opacity: 0
  },
  visible: {
    scale: 1,
    rotateY: 0,
    opacity: 1,
    transition: { delay: 0.4, duration: 0.5, ease: 'easeOut' }
  }
};

const flashVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: [0, 1, 0],
    transition: { duration: 0.4, delay: 0.2 }
  }
};

const CardPack = ({ card }: CardPackProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    if (Math.abs(info.offset.x) > PACK_WIDTH / 3) {
      setIsOpen(true);
    }
  };

  return (
    <div className="card-pack-container">
      <motion.div
        className="card-reveal-wrapper"
        variants={cardVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
      >
        <Card {...card} isAnimating={!isOpen} />
      </motion.div>

      <motion.div 
        className="flash-effect"
        variants={flashVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
      />

      {!isOpen && (
        <motion.div 
          className="pack-wrapper"
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpen ? 0 : 1, transition: { delay: 0.2 } }}
        >
          <motion.div 
            className="pack-tear-grip"
            drag="x"
            dragConstraints={{ left: -(PACK_WIDTH/2), right: (PACK_WIDTH/2) }}
            dragElasticity={0.2}
            onDragEnd={handleDragEnd}
          />
          <motion.div 
            className="pack-front left"
            animate={{ x: isOpen ? -PACK_WIDTH : 0, opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div 
            className="pack-front right"
            animate={{ x: isOpen ? PACK_WIDTH : 0, opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default CardPack;