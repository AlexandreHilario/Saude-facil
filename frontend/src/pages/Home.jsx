import { useState, useEffect } from "react";
import { Map, Pill } from "lucide-react";
import MenuDown from "../components/MenuDown";
import Header from "../components/Header";
import { supabase } from "../config/DataBase";

export default function HomePage() {
  const [username, setUsername] = useState("Usuário");
  const [showMedicamentos, setShowMedicamentos] = useState(false);
  const [showUnidades, setShowUnidades] = useState(false);
  const [unidades, setUnidades] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [medsPorCategoria, setMedsPorCategoria] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("loggedUserData");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUsername(parsed.nome_usuario || "Usuário");
    }
    const fetchData = async () => {
      const { data: unids, error: unidsError } = await supabase
        .from("unidades")
        .select("*");
      if (unidsError) console.error("Erro ao buscar unidades:", unidsError);
      else setUnidades(unids || []);

      const { data: meds, error: medsError } = await supabase
        .from("medicamentos")
        .select("*")
        .eq("disponivel", true);
      if (medsError) console.error("Erro ao buscar medicamentos:", medsError);
      else {
        setMedicamentos(meds || []);
        const cats = [...new Set(meds.map((m) => m.categoria))];
        setCategorias(cats);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUserData");
    window.location.href = "/login";
  };

  const abrirModalCategoria = (categoria) => {
    setCategoriaSelecionada(categoria);
    const filtrados = medicamentos.filter(
      (m) => m.categoria === categoria && m.disponivel
    );
    setMedsPorCategoria(filtrados);
  };

  const totalMedicamentos = medicamentos.length;
  const totalUnidades = unidades.length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      <Header username={username} onLogout={handleLogout} />

      <div className="px-4 grid grid-cols-2 gap-3 mt-4">
        <div
          className="bg-white rounded-2xl p-4 shadow cursor-pointer hover:bg-gray-50 transition"
          onClick={() => setShowMedicamentos(true)}
        >
          <p className="text-gray-500 text-sm">Medicamentos Disponíveis</p>
          <p className="text-2xl font-bold text-green-700">{totalMedicamentos}</p>
        </div>

        <div
          className="bg-white rounded-2xl p-4 shadow cursor-pointer hover:bg-gray-50 transition"
          onClick={() => setShowUnidades(true)}
        >
          <p className="text-gray-500 text-sm">Unidades Próximas</p>
          <p className="text-2xl font-bold text-green-700">{totalUnidades}</p>
        </div>
      </div>

      <div className="px-4 mt-6">
        <p className="font-semibold text-gray-800 mb-3">Categorias</p>
        <div className="grid grid-cols-3 gap-3">
          
          {categorias.map((cat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 flex flex-col items-center shadow cursor-pointer hover:bg-gray-50 transition"
              onClick={() => abrirModalCategoria(cat)}
            >
              <Pill className="text-green-600"/>
              <p className="text-sm text-center font-medium text-gray-700">
                {cat}
              </p>
            </div>
          ))}

          <div
            className="bg-white rounded-2xl p-4 flex flex-col items-center shadow cursor-pointer hover:bg-gray-50 transition"
            onClick={() => (window.location.href = "/servicos")}
          >
            <Map className="text-green-600" />
            <p className="text-sm mt-1">Serviços</p>
          </div>
        </div>
      </div>

      <MenuDown />

      {showMedicamentos && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-5 w-11/12 max-w-md">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Medicamentos Disponíveis
            </h2>
            <ul className="space-y-3 max-h-60 overflow-y-auto">
              {medicamentos.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Nenhum medicamento disponível no momento.
                </p>
              ) : (
                medicamentos.map((m, index) => (
                  <li
                    key={index}
                    className="border-b border-gray-100 pb-2 text-sm text-gray-700"
                  >
                    <p className="font-medium">{m.nome_medicamento}</p>
                    <p className="text-xs text-gray-500">
                      Categoria: {m.categoria}
                    </p>
                    <p className="text-xs text-gray-400">
                      Validade:{" "}
                      {m.validade
                        ? new Date(m.validade).toLocaleDateString("pt-BR")
                        : "Não informada"}
                    </p>
                  </li>
                ))
              )}
            </ul>
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg w-full"
              onClick={() => setShowMedicamentos(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {categoriaSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-5 w-11/12 max-w-md">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              {categoriaSelecionada}
            </h2>
            <ul className="space-y-3 max-h-60 overflow-y-auto">
              {medsPorCategoria.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Nenhum medicamento disponível nesta categoria.
                </p>
              ) : (
                medsPorCategoria.map((m, index) => (
                  <li
                    key={index}
                    className="border-b border-gray-100 pb-2 text-sm text-gray-700"
                  >
                    <p className="font-medium">{m.nome_medicamento}</p>
                    <p className="text-xs text-gray-500">
                      Validade:{" "}
                      {m.validade
                        ? new Date(m.validade).toLocaleDateString("pt-BR")
                        : "Não informada"}
                    </p>
                  </li>
                ))
              )}
            </ul>
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg w-full"
              onClick={() => setCategoriaSelecionada(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {showUnidades && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-5 w-11/12 max-w-md">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Unidades Próximas
            </h2>
            <ul className="space-y-3 max-h-60 overflow-y-auto">
              {unidades.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Nenhuma unidade cadastrada.
                </p>
              ) : (
                unidades.map((u, index) => (
                  <li
                    key={index}
                    className="border-b border-gray-100 pb-2 text-sm text-gray-700"
                  >
                    <p className="font-medium">{u.nome_unidade}</p>
                    <p className="text-xs text-gray-500">
                      {u.endereco} — {u.cidade}
                    </p>
                  </li>
                ))
              )}
            </ul>
            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg w-full"
              onClick={() => setShowUnidades(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
