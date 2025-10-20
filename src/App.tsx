import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Card from "./components/card/Card";
import CardDetail from "./components/CardDetail";
import type { CardData } from "@/types";
import "./App.css";

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRecommendedClips = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "/api/service/v1/home/recommended/clips?filterType=WITHIN_1_DAY&orderType=RECOMMEND"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const clips = data.content.data.map((item: any, index: number) => ({
          id: index,
          type: "embed",
          clipId: item.clipUID,
          title: item.clipTitle,
          rarity: "common",
          effects: ["border", "sparkle", "glow"],
          thumbnailImageUrl: item.thumbnailImageUrl,
          ownerChannel: item.ownerChannel,
        }));
        setCardData(clips);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedClips();
  }, []);

  const selectedItem =
    selectedId !== null
      ? cardData.find((item) => item.id === selectedId)
      : null;

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <div className="card-grid">
        {cardData.map((item) => (
          <div key={item.id} onDoubleClick={() => setSelectedId(item.id)}>
            <Card card={item} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <CardDetail onClick={() => setSelectedId(null)} {...selectedItem} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
