import { motion } from "framer-motion";
import type { CardData } from "@/types";
import { BASE_CARD_STYLE } from "@/config";
import Cube from "@/components/Cube";
import CardSurfaceEffects from "@/components/card/CardEffects";
import CardInnerContent from "./CardInnerContent";
import CardDescription from "./CardDescription";
import "./Card.css";

interface CardProps {
  card: CardData;
  initialCardFaceState: "front" | "back";
}

const CardFront = ({ card }: { card: CardData }) => {
  const { rarity, effects = [] } = card;

  return (
    <motion.div className="border card-container">
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
  );
};

const CardBack = () => {
  return (
    <motion.div
      className="border card-container"
      style={{ backgroundColor: "black" }}
    >
      <img style={{ width: "70%" }} src={"./images/chzzklogo_kor(Green).png"} />
    </motion.div>
  );
};

const Card = ({ card, initialCardFaceState = "front" }: CardProps) => {
  const { halfWidth, halfHeight, halfLength } = BASE_CARD_STYLE;

  return (
    <Cube
      frontContent={<CardFront card={card} />}
      backContent={<CardBack />}
      halfWidth={halfWidth}
      halfHeight={halfHeight}
      halfLength={halfLength}
      initialFace={initialCardFaceState}
    />
  );
};

export default Card;
