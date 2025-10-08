import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Card from './components/Card';
import CardDetail from './components/CardDetail';
import { cardData } from './data';
import './App.css';

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedItem = selectedId !== null ? cardData.find(item => item.id === selectedId) : null;

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
          <CardDetail 
            onClick={() => setSelectedId(null)}
            {...selectedItem} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;