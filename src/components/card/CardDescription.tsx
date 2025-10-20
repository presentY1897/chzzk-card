import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { CardData, ChzzkClip } from "@/types";

interface CardDescriptionProps {
  card: CardData;
}

const CardDescription = ({ card }: CardDescriptionProps) => {
  const { id, title, description, edition, date, type, clipId } = card;
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

  const displayTitle = type === "embed" ? clip?.contentTitle : title;
  const displayDescription =
    type === "embed" && clip?.ownerChannel?.channelName
      ? `by ${clip.ownerChannel.channelName}`
      : description;

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
        {displayDescription && (
          <motion.p
            className="card-description"
            layoutId={`card-description-${id}`}
          >
            {displayDescription}
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
