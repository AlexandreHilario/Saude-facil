import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import MenuDown from "../components/MenuDown";
import { useNavigate } from "react-router-dom";

export default function Servicos() {
  const [selectedServico, setSelectedServico] = useState(null);
  const [username, setUsername] = useState("Usuário");
  const navigate = useNavigate();

   useEffect(() => {
      const nomeSalvo = localStorage.getItem("loggedUser");
      if (nomeSalvo) setUsername(nomeSalvo);
    }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "/login";
  };

  const servicos = [
    {
      nome: "Vacinação",
      descricao: "Serviço de imunização contra doenças como gripe, COVID-19, hepatite, e outras.",
      local: "UBS Centro",
      horario: "Seg a Sex - 8h às 17h",
    },
    {
      nome: "Atendimento Médico",
      descricao: "Consultas médicas com clínico geral e encaminhamento para especialistas.",
      local: "UBS Boa Vista",
      horario: "Seg a Sex - 7h às 16h",
    },
    {
      nome: "Saúde Bucal",
      descricao: "Atendimento odontológico preventivo e corretivo para todas as idades.",
      local: "UBS Jardim",
      horario: "Seg a Sex - 8h às 17h",
    },
    {
      nome: "Pré-natal",
      descricao: "Acompanhamento médico para gestantes durante toda a gestação.",
      local: "UBS Santo Antônio",
      horario: "Seg a Sex - 8h às 14h",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      <Header username={username} onLogout={handleLogout} />
      
      <div className="px-4 mt-4">
        <ArrowLeft className="text-gray-700" onClick={() => navigate(-1)}/>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Serviços do SUS
        </h2>

        <ul className="space-y-3">
          {servicos.map((s, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-2xl shadow cursor-pointer hover:bg-gray-50 transition"
              onClick={() => setSelectedServico(s)}
            >
              <p className="font-semibold text-gray-800">{s.nome}</p>
              <p className="text-sm text-gray-500">{s.local}</p>
            </li>
          ))}
        </ul>
      </div>

      <MenuDown />

      {selectedServico && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-5 w-11/12 max-w-md">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              {selectedServico.nome}
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              {selectedServico.descricao}
            </p>
            <p className="text-xs text-gray-500">
              <strong>Local:</strong> {selectedServico.local}
            </p>
            <p className="text-xs text-gray-500 mb-4">
              <strong>Horário:</strong> {selectedServico.horario}
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
