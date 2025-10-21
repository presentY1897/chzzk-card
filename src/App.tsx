import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Card from "./components/card/Card";
import CardDetail from "./components/CardDetail";
import "./App.css";
import { useFetchChzzkClipRecommendedList } from "./hooks/useChzzkFetch";
import type { ChzzkClipPreviewInfo } from "./types";
import { convertChzzkPreviewClipInfoToCardData } from "./tools/dataTool";

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: cardList, loading, error } = useFetchChzzkClipRecommendedList();

  const selectedCard =
    selectedId !== null
      ? convertChzzkPreviewClipInfoToCardData(cardList[selectedId], selectedId)
      : null;

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        예상치 못한 에러가 발생했습니다. Error: {error.message}
      </div>
    );
  }

  return (
    <div className="App">
      <div className="card-grid">
        {cardList?.map((item: ChzzkClipPreviewInfo, index: number) => (
          <Card
            key={index}
            card={convertChzzkPreviewClipInfoToCardData(item, index)}
            initialCardFaceState="back"
            onClick={() => setSelectedId(index)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedCard && (
          <CardDetail onClick={() => setSelectedId(null)} {...selectedCard} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
