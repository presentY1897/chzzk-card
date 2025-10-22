import React from "react";
import { motion } from "framer-motion";
import move from "lodash-move";
import "./CardStack.css";

const CARD_OFFSET = 2;
const SCALE_FACTOR = 0.006;

const CardStack = ({ cardList }: { cardList: React.ReactElement[] }) => {
  const [cards, setCards] = React.useState(cardList);
  const moveToEnd = (from: number) => {
    setCards(move(cards, from, cards.length - 1));
  };

  return (
    <div className="card-stack-wrapper">
      <ul className="card-stack">
        {cards.map((card, index) => {
          const canDrag = index === 0;

          return (
            <motion.li
              key={index}
              className="card-stack-item"
              style={{
                cursor: canDrag ? "grab" : "auto",
              }}
              animate={{
                top: index * -CARD_OFFSET,
                scale: 1 - index * SCALE_FACTOR,
                zIndex: cardList.length - index,
              }}
              drag={canDrag ? "x" : false}
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              onDragEnd={() => moveToEnd(index)}
            >
              {card}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};
export default CardStack;
