import { motion } from "framer-motion";
import type { CardData } from "../../types";

const CardDescription = ({
  id,
  title,
  description,
  edition,
  date,
}: CardData) => {
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
          <motion.span className="card-edition" layoutId={`card-edition-${id}`}>
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
  );
};

export default CardDescription;
