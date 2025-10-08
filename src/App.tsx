import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Card from "./components/Card";
import CardDetail from "./components/CardDetail";
import "./App.css";

const cardData = [
  {
    id: 1,
    type: "image" as const,
    src: "/images/sample-image.jpg",
    alt: "A sample fantasy landscape",
    effects: [
      "border" as const,
      "interactive-sparkle" as const,
      "glow" as const,
    ],
    title: "Whispering Peaks",
    description: "A mystical mountain range that hums with ancient energy.",
    rarity: "legendary" as const,
    edition: "Founders Pack",
    date: "2025-Q4",
  },
  {
    id: 2,
    type: "video" as const,
    src: "/videos/sample-video.mp4",
    alt: "A sample abstract video",
    effects: ["border" as const, "sparkle" as const, "glow" as const],
    title: "Orb of Chaos",
    description: "A swirling vortex of unpredictable magical power.",
    rarity: "rare" as const,
    edition: "Core Set",
    date: "2025-Q2",
  },
];

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedItem =
    selectedId !== null
      ? cardData.find((item) => item.id === selectedId)
      : null;

  return (
    <div className="App">
      <div className="card-grid">
        {cardData.map((item) => (
          <Card
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            isAnimating={selectedId !== null}
            {...item}
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
