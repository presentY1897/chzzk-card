import { Routes, Route, Link } from "react-router-dom";
import CardPackListPage from "./pages/CardPackListPage";
import CardListPage from "./pages/CardListPage";
import CardStackPage from "./pages/CardStackPage";
import "./App.css";

function App() {
  return (
    <div className="App`">
      <nav className="navigation-menu">
        <Link to="/card-pack-list">Card Packs</Link>
        <Link to="/card-list">Card List</Link>
        <Link to="/card-stack">Card Stack</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CardPackListPage />} />
        <Route path="/card-pack-list" element={<CardPackListPage />} />
        <Route path="/card-list" element={<CardListPage />} />
        <Route path="/card-stack" element={<CardStackPage />} />
      </Routes>
    </div>
  );
}

export default App;
