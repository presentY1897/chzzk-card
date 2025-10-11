import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { CardData } from "../types";
import { useCardTilt } from "../hooks/useCardTilt";
import CardSurfaceEffects from "./CardEffects";
import "./Card.css";

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
  const { cardRef, rotateX, rotateY, eventHandlers } = useCardTilt(isAnimating);

  return (
    <motion.div
      ref={cardRef}
      className="card-container"
      layoutId={`card-container-${id}`}
      onClick={onClick}
      {...eventHandlers}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {effects.includes("border") && (
        <div className="card-border" data-rarity={rarity}></div>
      )}
      <div className="card">
        <CardSurfaceEffects effects={effects} />
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
            {type === "embed" && (
              <iframe
                className="card-media card-embed"
                src={src}
                title={title || "Embedded Content"}
                width="240"
                height="360"
                frameBorder="0"
                // allow="autoplay; clipboard-write; web-share"
                allowFullScreen
              ></iframe>
            )}
          </motion.div>{" "}
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
