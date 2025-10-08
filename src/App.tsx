import Card from './components/Card';
import './App.css';

function App() {
  // Use local assets from the 'public' folder
  const imageUrl = '/images/sample-image.jpg';
  const videoUrl = '/videos/sample-video.mp4';

  return (
    <div className="App">
      <Card 
        type="image" 
        src={imageUrl} 
        alt="A sample fantasy landscape" 
        effects={['border', 'interactive-sparkle', 'glow']}
        title="Whispering Peaks"
        description="A mystical mountain range that hums with ancient energy."
        rarity="legendary"
        edition="Founders Pack"
        date="2025-Q4"
      />
      <Card 
        type="video" 
        src={videoUrl} 
        alt="A sample abstract video" 
        effects={['border', 'sparkle', 'glow']}
        title="Orb of Chaos"
        description="A swirling vortex of unpredictable magical power."
        rarity="rare"
        edition="Core Set"
        date="2025-Q2"
      />
    </div>
  );
}

export default App;
