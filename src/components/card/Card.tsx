import { motion } from "framer-motion";
import type { CardData } from "../../types";
import CardSurfaceEffects from "../CardEffects";
import "./Card.css";
import CardInnerContent from "./CardInnerContent";
import CardDescription from "./CardDescription";
import Cube from "../Cube";

interface CardProps {
  card: CardData;
  onClick?: () => void;
}

const Card = ({ card, onClick }: CardProps) => {
  const { id, effects = [], rarity } = card;
  return (
    <Cube
      onClick={onClick}
      frontContent={
        <motion.div
          className="card-container"
          layoutId={`card-container-${id}`}
        >
          {effects.includes("border") && (
            <div className="card-border" data-rarity={rarity}></div>
          )}
          <div className="card">
            <CardSurfaceEffects effects={effects} />
            <div className="card-content">
              <CardInnerContent card={card} />
              <CardDescription card={card} />
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
