import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainGame from './pages/mainGame';
import Gameover from './pages/Gameover';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<MainGame />} />
            <Route path="/gameover" element={<Gameover />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
