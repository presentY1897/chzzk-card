import { motion } from "framer-motion";
import type { CardData } from "../../types";
import { useCardTilt } from "../../hooks/useCardTilt";
import CardSurfaceEffects from "../CardEffects";
import "./Card.css";
import CardInnerContent from "./CardInnerContent";
import CardDescription from "./CardDescription";

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
          <CardInnerContent
            id={id}
            type={type}
            src={src}
            title={title}
            alt={alt}
          />{" "}
          <CardDescription
            id={id}
            title={title}
            description={description}
            edition={edition}
            date={date}
            type={type}
            src={src}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
