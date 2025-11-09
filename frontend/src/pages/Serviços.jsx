import { useState, useEffect } from "react";
import Header from "../components/Header";
import MenuDown from "../components/MenuDown";
import { supabase } from "../config/DataBase";
import { useNavigate } from "react-router-dom";

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [selectedServico, setSelectedServico] = useState(null);
  const [username, setUsername] = useState("Usuário");
  const navigate = useNavigate();

  useEffect(() => {
    const nomeSalvo = JSON.parse(localStorage.getItem("loggedUserData"));
    if (nomeSalvo) setUsername(nomeSalvo.nome_usuario);
    buscarServicos();
  }, []);

  const buscarServicos = async () => {
    const { data, error } = await supabase
      .from("servicos")
      .select(`
        id_servico,
        nome_servico,
        descricao,
        id_unidade,
        unidades (nome_unidade)
      `);

    if (error) {
      console.error("Erro ao buscar serviços:", error.message);
    } else {
      setServicos(data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUserData");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      <Header username={username} onLogout={handleLogout} />

      <div className="px-4 mt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Serviços do SUS
        </h2>

        {servicos.length === 0 ? (
          <p className="text-gray-500 text-sm">Nenhum serviço encontrado.</p>
        ) : (
          <ul className="space-y-3">
            {servicos.map((s) => (
              <li
                key={s.id_servico}
                className="bg-white p-4 rounded-2xl shadow cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setSelectedServico(s)}
              >
                <p className="font-semibold text-gray-800">{s.nome_servico}</p>
                <p className="text-sm text-gray-500">
                  {s.unidades?.nome_unidade || "Sem unidade"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <MenuDown />

      {selectedServico && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-5 w-11/12 max-w-md">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              {selectedServico.nome_servico}
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              {selectedServico.descricao}
            </p>
            <p className="text-xs text-gray-500 mb-4">
              <strong>Unidade:</strong>{" "}
              {selectedServico.unidades?.nome_unidade || "Sem unidade"}
            </p>
            <button
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg w-full"
              onClick={() => setSelectedServico(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
