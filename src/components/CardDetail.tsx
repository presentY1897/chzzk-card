import { motion } from "framer-motion";
import type { CardData } from "../types";
import "./CardDetail.css";

interface CardDetailProps extends CardData {
  onClick?: () => void;
}

const CardDetail = ({
  id,
  type,
  src,
  alt,
  title,
  description,
  rarity,
  edition,
  date,
  onClick,
}: CardDetailProps) => {
  return (
    <motion.div
      className="backdrop"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="card-detail-container"
        layoutId={`card-container-${id}`}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.div
          className="card-detail-media-wrapper"
          layoutId={`card-media-wrapper-${id}`}
        >
          {type === "image" && (
            <img className="card-detail-media" src={src} alt={alt} />
          )}
          {type === "video" && (
            <video
              className="card-detail-media"
              src={src}
              autoPlay
              loop
              muted
              playsInline
            />
          )}
          {type === "embed" && (
            <iframe
              className="card-detail-media"
              src={`${src}?autoplay=true`} // Start playing when opened
              title={title || "Embedded Content"}
              frameBorder="0"
              allow="autoplay; clipboard-write; web-share"
              allowFullScreen
            ></iframe>
          )}
        </motion.div>
        <motion.div
          className="card-detail-text-content"
          layoutId={`card-text-content-${id}`}
        >
          <motion.h2
            className="card-detail-title"
            layoutId={`card-title-${id}`}
          >
            {title}
          </motion.h2>
          <motion.p
            className="card-detail-description"
            layoutId={`card-description-${id}`}
          >
            {description}
          </motion.p>
          <div className="card-detail-footer">
            <motion.span
              className="card-detail-edition"
              layoutId={`card-edition-${id}`}
            >
              {edition}
            </motion.span>
            <motion.span
              className="card-detail-date"
              layoutId={`card-date-${id}`}
            >
              {date}
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CardDetail;
