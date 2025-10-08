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
      />
      <Card 
        type="video" 
        src={videoUrl} 
        alt="A sample abstract video" 
      />
    </div>
  );
}

export default App;
