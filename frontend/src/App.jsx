import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Busca from "./pages/Busca";
import Mapa from "./pages/Mapa";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/buscar" element={<Busca/>} />
        <Route path="/mapa" element={<Mapa/>} />
      </Routes>
    </Router>
  );
}
