import { motion } from "framer-motion";
import type { CardData } from "@/types";
import "./CardInnerContent.css";

interface CardInnerContentProps {
  card: CardData;
}

const CardInnerContent = ({ card }: CardInnerContentProps) => {
  const { src, alt = "Card media" } = card;
  return (
    <motion.div className="card-media-wrapper">
      <img className="card-media" src={src} alt={alt} />
    </motion.div>
  );
};

export default CardInnerContent;
