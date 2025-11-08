import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import MenuDown from "../components/MenuDown";
import SearchBar from "../components/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { supabase } from "../config/DataBase";

export default function Busca() {
  const [username, setUsername] = useState("Usuário");
  const [tipoBusca, setTipoBusca] = useState("medicamentos");
  const [query, setQuery] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // busca medicamentos
      const { data: meds, error: medsError } = await supabase
        .from("medicamentos")
        .select("*");

      if (medsError) {
        console.error("Erro ao carregar medicamentos:", medsError);
        return;
      }

      // busca estoque
      const { data: estoques, error: estError } = await supabase
        .from("estoque")
        .select("*");

      if (estError) {
        console.error("Erro ao carregar estoque:", estError);
        return;
      }

      // combina medicamentos + estoque
      const medicamentosComEstoque = meds.map((m) => {
        const estoque = estoques.find((e) => e.id_medicamento === m.id_medicamento);
        return {
          ...m,
          quantidade_estoque: estoque ? estoque.quantidade_estoque : 0,
        };
      });

      setMedicamentos(medicamentosComEstoque);

      // busca unidades
      const { data: unis, error: unisError } = await supabase
        .from("unidades")
        .select("*");

      if (unisError) console.error("Erro ao carregar unidades:", unisError);
      else setUnidades(unis);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("loggedUser");
    if (nomeSalvo) setUsername(nomeSalvo);
  }, []);

  const lista =
    tipoBusca === "medicamentos"
      ? medicamentos.filter((item) =>
          item.nome_medicamento?.toLowerCase().includes(query.toLowerCase())
        )
      : unidades.filter((item) =>
          item.nome_unidade?.toLowerCase().includes(query.toLowerCase())
        );

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header username={username} onLogout={handleLogout} />

      <div className="p-4 bg-white flex items-center gap-3 shadow-sm">
        <ArrowLeft className="text-gray-700 cursor-pointer" onClick={() => navigate(-1)} />
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
                  key={item.id_medicamento}
                  to={`/medicamento/${item.id_medicamento}`}
                  className="bg-white rounded-2xl p-4 shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{item.nome_medicamento}</p>
                    <p className="text-sm text-gray-500">{item.categoria}</p>
                    <p className="text-xs text-gray-400">
                      Validade:{" "}
                      {item.validade
                        ? new Date(item.validade).toLocaleDateString("pt-BR")
                        : "—"}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        item.disponivel ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {item.disponivel ? "Disponível" : "Indisponível"}
                    </p>
                  </div>

                </Link>
              ) : (
                <Link
                  key={item.id_unidade}
                  to={`/unidade/${item.id_unidade}`}
                  className="bg-white rounded-2xl p-4 shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{item.nome_unidade}</p>
                    <p className="text-sm text-gray-500">{item.endereco}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{item.cidade}</p>
                    <p className="text-green-600 text-sm">{item.telefone}</p>
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
            Digite para buscar{" "}
            {tipoBusca === "medicamentos" ? "um medicamento" : "uma unidade"}...
          </p>
        )}
      </div>

      <MenuDown />
    </div>
  );
}
