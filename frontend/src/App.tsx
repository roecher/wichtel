import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { WichtelReveal } from './pages/WichtelReveal';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wichtel/:token" element={<WichtelReveal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
