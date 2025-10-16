import { motion } from "framer-motion";
import type { CardData } from "../../types";

const CardInnerContent = ({
  id,
  type,
  src,
  title,
  alt = "Card media",
}: CardData) => {
  return (
    <motion.div
      className="card-media-wrapper"
      layoutId={`card-media-wrapper-${id}`}
    >
      {type === "image" && <img className="card-media" src={src} alt={alt} />}
      {type === "video" && (
        <video
          className="card-media"
          src={src}
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      {type === "embed" && (
        <iframe
          className="card-media card-embed"
          src={src}
          title={title || "Embedded Content"}
          frameBorder="0"
          // allow="autoplay; clipboard-write; web-share"
          allowFullScreen
        ></iframe>
      )}
    </motion.div>
  );
};

export default CardInnerContent;
