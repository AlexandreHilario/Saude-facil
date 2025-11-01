import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Busca from "./pages/Busca";
import Mapa from "./pages/Mapa";
import UnidadeDetalhe from "./pages/UnidadeDetalhe";
import MedicamentoDetalhe from "./pages/MedicamentoDetalhe";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/buscar" element={<Busca/>} />
        <Route path="/unidade/:id" element={<UnidadeDetalhe />} />
        <Route path="/medicamento/:id" element={<MedicamentoDetalhe />} />
        <Route path="/mapa" element={<Mapa/>} />
      </Routes>
    </Router>
  );
}
