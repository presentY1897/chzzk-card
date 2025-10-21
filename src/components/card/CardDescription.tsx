import { motion } from "framer-motion";
import type { CardData, ChzzkClipInfo } from "@/types";

interface CardDescriptionProps {
  card: CardData;
  clipInfo: ChzzkClipInfo | null;
}

const CardDescription = ({ card, clipInfo }: CardDescriptionProps) => {
  const { id, title, description, edition, date } = card;
  const displayTitle = clipInfo?.contentTitle || title;
  const displayCardStreamer = clipInfo?.ownerChannel?.channelName || edition;

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
          {displayCardStreamer && (
            <motion.span
              className="card-edition"
              layoutId={`card-edition-${id}`}
            >
              {displayCardStreamer}
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
