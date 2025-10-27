import { motion } from "framer-motion";
import type { CardData } from "@/types";
import Cube from "@/components/Cube";
import CardSurfaceEffects from "@/components/card/CardEffects";
import CardInnerContent from "./CardInnerContent";
import CardDescription from "./CardDescription";
import "./Card.css";

interface CardProps {
  card: CardData;
  initialCardFaceState: "front" | "back";
}

const Card = ({ card, initialCardFaceState = "front" }: CardProps) => {
  const { effects = [], rarity } = card;

  return (
    <Cube
      frontContent={
        <motion.div className="card-container">
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
      initialFace={initialCardFaceState}
    />
  );
};

export default Card;
