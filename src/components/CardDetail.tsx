import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { CardData, ChzzkClip } from "../types";
import "./CardDetail.css";

interface CardDetailProps extends CardData {
  onClick?: () => void;
}

const CardDetail = ({
  id,
  type,
  src,
  clipId,
  alt,
  title,
  description,
  edition,
  date,
  onClick,
}: CardDetailProps) => {
  const [clip, setClip] = useState<ChzzkClip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (type === "embed" && clipId) {
      const fetchClip = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `/api/service/v1/play-info/clip/${clipId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setClip(data.content);
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      };

      fetchClip();
    }
  }, [type, clipId]);

  const displayTitle = clip?.contentTitle || title;
  const displayDescription = clip?.ownerChannel?.channelName
    ? `by ${clip.ownerChannel.channelName}`
    : description;

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
          className="card-detail-text-content"
          layoutId={`card-text-content-${id}`}
        >
          <motion.h2
            className="card-detail-title"
            layoutId={`card-title-${id}`}
          >
            {displayTitle}
          </motion.h2>
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
                src={`https://chzzk.naver.com/embed/clip/${clipId}?autoplay=true`}
                title={displayTitle || "Embedded Content"}
                frameBorder="0"
                allow="autoplay; clipboard-write; web-share"
                allowFullScreen
              ></iframe>
            )}
          </motion.div>
          <motion.p
            className="card-detail-description"
            layoutId={`card-description-${id}`}
          >
            {displayDescription}
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
