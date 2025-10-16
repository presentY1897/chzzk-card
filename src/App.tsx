import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Card from "./components/card/Card";
import CardDetail from "./components/CardDetail";
import { cardData } from "./data";
import "./App.css";
import Cube from "./components/Cube";
import CardInnerContent from "./components/card/CardInnerContent";

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
      <div>
        <Cube
          // frontContent={<Card key={123123} {...cardData[0]}></Card>}
          frontContent={
            <CardInnerContent
              type={cardData[0].type}
              src={cardData[0].src}
            ></CardInnerContent>
          }
          halfWidth={120}
          halfHeight={180}
          halfLength={4}
        ></Cube>
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
