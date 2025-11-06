import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import MenuDown from "../components/MenuDown";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Busca() {
  const [username, setUsername] = useState("Usuário");
  const [tipoBusca, setTipoBusca] = useState("medicamentos");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const medicamentos = [
    { id: 1, nome: "Insulina Regular", unidade: "UBS Centro", endereco: "Rua das Flores, 123", distancia: "2km", qtd: "101 unid." },
    { id: 2, nome: "Paracetamol", unidade: "UBS Boa Vista", endereco: "Av. Paulista, 210", distancia: "3km", qtd: "89 unid." },
    { id: 3, nome: "Dipirona Sódica", unidade: "UBS Recife", endereco: "Rua Mirabela, 180", distancia: "2.5km", qtd: "55 unid." },
    { id: 4, nome: "Amoxicilina", unidade: "UBS Norte", endereco: "Av. Brasil, 520", distancia: "4km", qtd: "120 unid." },
    { id: 5, nome: "Ibuprofeno", unidade: "UBS Jardim", endereco: "Rua Esperança, 45", distancia: "3.2km", qtd: "76 unid." },
    { id: 6, nome: "Omeprazol", unidade: "UBS Santo Antônio", endereco: "Av. Bela Vista, 890", distancia: "2.8km", qtd: "95 unid." },
    { id: 7, nome: "Metformina", unidade: "UBS Santa Luzia", endereco: "Rua das Oliveiras, 34", distancia: "3km", qtd: "64 unid." },
    { id: 8, nome: "Loratadina", unidade: "UBS Boa Vista", endereco: "Av. Paulista, 210", distancia: "3km", qtd: "41 unid." },
    { id: 9, nome: "Ácido Fólico", unidade: "UBS Centro", endereco: "Rua das Flores, 123", distancia: "2km", qtd: "50 unid." },
    { id: 10, nome: "Vitamina D", unidade: "UBS Recife", endereco: "Rua Mirabela, 180", distancia: "2km", qtd: "30 unid." },
  ];

  const unidades = [
    { id: 1, nome: "UBS Centro", endereco: "Rua das Flores, 123 - Centro", distancia: "2km", horario: "Aberto até 17h" },
    { id: 2, nome: "UBS Boa Vista", endereco: "Av. Paulista, 210", distancia: "3km", horario: "Aberto até 16h" },
    { id: 3, nome: "UBS Recife", endereco: "Rua Mirabela, 180", distancia: "2.5km", horario: "Aberto até 18h" },
    { id: 4, nome: "UBS Santo Antônio", endereco: "Av. Bela Vista, 890", distancia: "2.8km", horario: "Aberto até 17h" },
    { id: 5, nome: "UBS Jardim", endereco: "Rua Esperança, 45", distancia: "3.2km", horario: "Aberto até 15h" },
    { id: 6, nome: "UBS Santa Luzia", endereco: "Rua das Oliveiras, 34", distancia: "3km", horario: "Aberto até 17h" },
  ];

  const lista =
    tipoBusca === "medicamentos"
      ? medicamentos.filter((item) =>
          item.nome.toLowerCase().includes(query.toLowerCase())
        )
      : unidades.filter((item) =>
          item.nome.toLowerCase().includes(query.toLowerCase())
        );

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header username={username} onLogout={handleLogout} />
      <div className="p-4 bg-white flex items-center gap-3 shadow-sm">
        <ArrowLeft className="text-gray-700" onClick={() => navigate(-1)}/>
        <h1 className="font-semibold text-lg">Buscar</h1>
      </div>

      <div className="flex justify-around bg-white shadow-sm">
        <button
          onClick={() => {
            setTipoBusca("medicamentos");
            setQuery("");
          }}
          className={`flex-1 py-3 ${
            tipoBusca === "medicamentos"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500"
          }`}
        >
          Medicamentos
        </button>
        <button
          onClick={() => {
            setTipoBusca("unidades");
            setQuery("");
          }}
          className={`flex-1 py-3 ${
            tipoBusca === "unidades"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500"
          }`}
        >
          Unidades
        </button>
      </div>

      <div className="px-4">
        <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="p-4 space-y-3">
        {query.length > 0 ? (
          lista.length > 0 ? (
            lista.map((item) =>
              tipoBusca === "medicamentos" ? (
                <Link
                  key={item.id}
                  to={`/medicamento/${item.id}`}
                  className="bg-white rounded-2xl p-4 shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{item.nome}</p>
                    <p className="text-sm text-gray-500">{item.unidade}</p>
                    <p className="text-xs text-gray-400">{item.endereco}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-semibold">{item.qtd}</p>
                    <p className="text-xs text-gray-500">{item.distancia}</p>
                  </div>
                </Link>
              ) : (
                <Link
                  key={item.id}
                  to={`/unidade/${item.id}`}
                  className="bg-white rounded-2xl p-4 shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{item.nome}</p>
                    <p className="text-sm text-gray-500">{item.endereco}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 text-sm">{item.distancia}</p>
                    <p className="text-xs text-gray-500">{item.horario}</p>
                  </div>
                </Link>
              )
            )
          ) : (
            <p className="text-center text-gray-400 mt-10">
              Nenhum resultado encontrado.
            </p>
          )
        ) : (
          <p className="text-center text-gray-400 mt-10">
            Digite para buscar {tipoBusca === "medicamentos" ? "um medicamento" : "uma unidade"}...
          </p>
        )}
      </div>

      <MenuDown />
    </div>
  );
}
