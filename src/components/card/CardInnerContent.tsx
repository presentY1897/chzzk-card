import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { CardData, ChzzkClip } from "@/types";

interface CardInnerContentProps {
  card: CardData;
}

const CardInnerContent = ({ card }: CardInnerContentProps) => {
  const { id, type, src, title, alt = "Card media", clipId } = card;
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
          src={`https://chzzk.naver.com/embed/clip/${clipId}`}
          title={clip?.contentTitle || title || "Embedded Content"}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
    </motion.div>
  );
};

export default CardInnerContent;
