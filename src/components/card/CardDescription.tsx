import { motion } from "framer-motion";
import type { CardData } from "../../types";

interface CardDescriptionProps {
  card: CardData;
}

const CardDescription = ({ card }: CardDescriptionProps) => {
  const { id, title, description, edition, date } = card;
  return (
    <motion.div
      className="card-text-content"
      layoutId={`card-text-content-${id}`}
    >
      {title && (
        <motion.h2 className="card-title" layoutId={`card-title-${id}`}>
          {title}
        </motion.h2>
      )}
      <footer className="card-footer">
        {description && (
          <motion.p
            className="card-description"
            layoutId={`card-description-${id}`}
          >
            {description}
          </motion.p>
        )}
        <div className="card-footer-info">
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
      </footer>
    </motion.div>
  );
};

export default CardDescription;
