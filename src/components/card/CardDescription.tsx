import { motion } from "framer-motion";
import type { CardData } from "@/types";
import "./CardDescription.css";

interface CardDescriptionProps {
  card: CardData;
}

const CardDescription = ({ card }: CardDescriptionProps) => {
  const { id, title, description, edition, date } = card;
  const displayTitle = title;
  const displayCardStreamer = edition?.name;
  const channelImageUrl = edition?.imageUrl;

  return (
    <motion.div
      className="card-text-content"
      layoutId={`card-text-content-${id}`}
    >
      {displayTitle && (
        <motion.h2 className="card-title" layoutId={`card-title-${id}`}>
          {displayTitle}
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
          <div className="card-edition">
            {channelImageUrl && (
              <img
                className="card-channel-image"
                src={channelImageUrl}
                alt="Channel Owner Image"
              />
            )}
            {displayCardStreamer && (
              <motion.span
                className="card-edition"
                layoutId={`card-edition-${id}`}
              >
                {displayCardStreamer}
              </motion.span>
            )}
          </div>
          {date && (
            <motion.span className="card-date" layoutId={`card-date-${id}`}>
              {new Date(date).toLocaleDateString()}
            </motion.span>
          )}
        </div>
      </footer>
    </motion.div>
  );
};

export default CardDescription;
