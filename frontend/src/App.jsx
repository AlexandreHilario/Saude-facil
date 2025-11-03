import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Busca from "./pages/Busca";
import Mapa from "./pages/Mapa";
import UnidadeDetalhe from "./pages/UnidadeDetalhe";
import MedicamentoDetalhe from "./pages/MedicamentoDetalhe";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ProtectedRoute from "./components/ProtectRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />

        {/* Rotas Protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buscar"
          element={
            <ProtectedRoute>
              <Busca />
            </ProtectedRoute>
          }
        />
        <Route
          path="/unidade/:id"
          element={
            <ProtectedRoute>
              <UnidadeDetalhe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medicamento/:id"
          element={
            <ProtectedRoute>
              <MedicamentoDetalhe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mapa"
          element={
            <ProtectedRoute>
              <Mapa />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
