import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { CardData } from "../types";
import "./Card.css"; // CardEffects.css is no longer needed

interface CardProps extends CardData {
  isAnimating?: boolean;
  onClick?: () => void;
}

const Card = ({
  id,
  type,
  src,
  alt = "Card media",
  effects = [],
  isAnimating = false,
  onClick,
  title,
  description,
  rarity,
  edition,
  date,
}: CardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [20, -20]);
  const rotateY = useTransform(x, [-100, 100], [-20, 20]);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAnimating) {
      x.set(0);
      y.set(0);
    }
  }, [isAnimating, x, y]);

  const handlePointerMove = (
    clientX: number,
    clientY: number,
    rect: DOMRect
  ) => {
    if (isAnimating) return;
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;
    const xPct = localX / rect.width - 0.5;
    const yPct = localY / rect.height - 0.5;
    x.set(yPct * -200);
    y.set(xPct * 200);

    if (cardRef.current) {
      cardRef.current.style.setProperty("--x", `${localX}px`);
      cardRef.current.style.setProperty("--y", `${localY}px`);
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
    if (isAnimating) return;
    x.set(0);
    y.set(0);
    if (cardRef.current) {
      cardRef.current.style.setProperty("--x", `50%`);
      cardRef.current.style.setProperty("--y", `50%`);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="card-container"
      layoutId={`card-container-${id}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handlePointerLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handlePointerLeave}
      onTouchCancel={handlePointerLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {effects.includes("border") && (
        <div className="card-border" data-rarity={rarity}></div>
      )}
      <div className="card">
        {effects.includes("shine") && <div className="card-shine"></div>}
        {effects.includes("glow") && <div className="card-glow"></div>}
        {effects.includes("sparkle") && <div className="card-sparkle"></div>}
        {effects.includes("interactive-sparkle") && (
          <div className="card-interactive-sparkle"></div>
        )}
        <div className="card-content">
          <motion.div
            className="card-media-wrapper"
            layoutId={`card-media-wrapper-${id}`}
          >
            {type === "image" && (
              <img className="card-media" src={src} alt={alt} />
            )}
            {type === "video" && (
              <video
                className="card-media"
                src={src}
                autoPlay
                loop
                muted
                playsInline
              />
            )}
          </motion.div>
          <motion.div
            className="card-text-content"
            layoutId={`card-text-content-${id}`}
          >
            {title && (
              <motion.h2 className="card-title" layoutId={`card-title-${id}`}>
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p
                className="card-description"
                layoutId={`card-description-${id}`}
              >
                {description}
              </motion.p>
            )}
            <div className="card-footer">
              {edition && (
                <motion.span
                  className="card-edition"
                  layoutId={`card-edition-${id}`}
                >
                  {edition}
                </motion.span>
              )}
              {date && (
                <motion.span className="card-date" layoutId={`card-date-${id}`}>
                  {date}
                </motion.span>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
