import { useState, useEffect } from "react";
import {
  Home,
  Map,
  Heart,
  User,
  Package,
  Syringe,
  Baby,
} from "lucide-react";
import MenuDown from "../components/MenuDown";
import Header from "../components/Header";

export default function HomePage() {
  const [username, setUsername] = useState("Usuário");
  const [showMedicamentos, setShowMedicamentos] = useState(false);
  const [showUnidades, setShowUnidades] = useState(false);

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("loggedUser");
    if (nomeSalvo) setUsername(nomeSalvo);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "/login"; 
  };

  const medicamentos = [
    { nome: "Dipirona Sódica", qtd: "12 caixas", unidade: "UBS Centro" },
    { nome: "Amoxicilina", qtd: "8 caixas", unidade: "UBS Boa Vista" },
    { nome: "Paracetamol", qtd: "15 caixas", unidade: "UBS Recife" },
    { nome: "Insulina NPH", qtd: "Indisponível", unidade: "UBS Norte" },
    { nome: "Omeprazol", qtd: "20 caixas", unidade: "UBS Jardim" },
    { nome: "Metformina", qtd: "10 caixas", unidade: "UBS Santo Antônio" },
  ];

  const unidades = [
    { nome: "UBS Centro", endereco: "Rua das Flores, 123", distancia: "2km" },
    { nome: "UBS Boa Vista", endereco: "Av. Paulista, 210", distancia: "3km" },
    { nome: "UBS Recife", endereco: "Rua Mirabela, 180", distancia: "4km" },
    { nome: "UBS Jardim", endereco: "Rua Esperança, 45", distancia: "3.2km" },
    { nome: "UBS Santo Antônio", endereco: "Av. Bela Vista, 890", distancia: "2.8km" },
  ];

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
          <p className="text-2xl font-bold text-green-700">
            {totalMedicamentos}
          </p>
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
          <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow">
            <Package className="text-green-600" />
            <p className="text-sm mt-1">Medicamentos</p>
          </div>
          <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow">
            <Syringe className="text-green-600" />
            <p className="text-sm mt-1">Insulina</p>
          </div>
          <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow">
            <Baby className="text-green-600" />
            <p className="text-sm mt-1">Fraldas</p>
          </div>
          <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow cursor-pointer hover:bg-gray-50 transition"
              onClick={() => window.location.href = "/servicos"}>
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
              {medicamentos.map((m, index) => (
                <li
                  key={index}
                  className="border-b border-gray-100 pb-2 text-sm text-gray-700"
                >
                  <p className="font-medium">{m.nome}</p>
                  <p className="text-xs text-gray-500">
                    {m.qtd} — {m.unidade}
                  </p>
                </li>
              ))}
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

      {showUnidades && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-5 w-11/12 max-w-md">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Unidades Próximas
            </h2>
            <ul className="space-y-3 max-h-60 overflow-y-auto">
              {unidades.map((u, index) => (
                <li
                  key={index}
                  className="border-b border-gray-100 pb-2 text-sm text-gray-700"
                >
                  <p className="font-medium">{u.nome}</p>
                  <p className="text-xs text-gray-500">
                    {u.endereco} — {u.distancia}
                  </p>
                </li>
              ))}
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
