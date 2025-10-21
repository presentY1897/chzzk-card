import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Card from "./components/card/Card";
import CardDetail from "./components/CardDetail";
import cardData from "./data.json";
import "./App.css";
import { useFetchChzzkClipRecommendedList } from "./hooks/useChzzkFetch";
import type { ChzzkClipPreviewInfo } from "./types";

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const cardList = useFetchChzzkClipRecommendedList();

  const selectedItem =
    selectedId !== null
      ? cardData.find((item) => item.id === selectedId)
      : null;

  return (
    <div className="App">
      <div className="card-grid">
        {cardList?.map((item: ChzzkClipPreviewInfo, index: number) => (
          <Card
            key={index}
            card={{
              id: index,
              type: "image",
              effects: ["border"],
              src: item.thumbnailImageUrl,
              clipId: item.clipUID,
              title: item.clipTitle,
              edition: {
                name: item.ownerChannel?.channelName,
                imageUrl: item.ownerChannel?.channelImageUrl,
              },
              date: item.createdDate,
            }}
            initialCardFaceState="back"
            onClick={() => setSelectedId(index)}
          />
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
