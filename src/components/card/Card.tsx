import { motion } from "framer-motion";
import type { CardData } from "../../types";
import CardSurfaceEffects from "../CardEffects";
import "./Card.css";
import CardInnerContent from "./CardInnerContent";
import CardDescription from "./CardDescription";
import Cube from "../Cube";

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
  title,
  description,
  rarity,
  edition,
  date,
}: CardProps) => {
  return (
    <Cube
      frontContent={
        <motion.div
          className="card-container"
          layoutId={`card-container-${id}`}
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
      }
      backContent={
        <motion.div
          className="card-container"
          style={{ backgroundColor: "black" }}
        >
          <img
            style={{ width: "70%" }}
            src={"./images/chzzklogo_kor(Green).png"}
          />
        </motion.div>
      }
      halfWidth={120}
      halfHeight={180}
      halfLength={0}
    />
  );
};

export default Card;
