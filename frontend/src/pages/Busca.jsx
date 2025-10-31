import { useState } from "react";
import { ArrowLeft, Search, Mic, MapPin, Home, Map, Heart, User } from "lucide-react";
import MenuDown from "../components/MenuDown";
import SearchBar from "../components/SearchBar";

export default function Busca() {

  const [query, setQuery] = useState("");
  const results = [
    {
      id: 1,
      nome: "Insulina Regular",
      unidade: "UBS Centro",
      endereco: "Rua das Flores, 123",
      distancia: "2km",
      qtd: "101 unid.",
      status: "disponível",
      atualizado: "há 1h",
    },
    {
      id: 2,
      nome: "Insulina Regular",
      unidade: "UBS Paulista",
      endereco: "Rua do Jardim, 234",
      distancia: "4km",
      qtd: "20 unid.",
      status: "baixo",
      atualizado: "há 10h",
    },
    {
      id: 3,
      nome: "Insulina NPH",
      unidade: "UBS Recife",
      endereco: "Rua Mirabela, 180",
      distancia: "2km",
      qtd: "Indisponível",
      status: "indisponível",
      atualizado: "há 1h",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Busque na sua localidade"
      />
      
      <div className="p-4 flex-1">
        {results.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl p-4 mb-3 shadow border ${
              item.status === "disponível"
                ? "border-blue-400"
                : item.status === "baixo"
                ? "border-yellow-400"
                : "border-gray-300"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">{item.nome}</p>
                <p className="text-gray-600 text-sm">{item.unidade}</p>
                <p className="text-gray-500 text-sm">{item.endereco}</p>
              </div>
              <div className="text-right">
                {item.status === "disponível" && (
                  <p className="text-green-600 text-sm font-medium">● {item.qtd}</p>
                )}
                {item.status === "baixo" && (
                  <p className="text-yellow-600 text-sm font-medium">● {item.qtd}</p>
                )}
                {item.status === "indisponível" && (
                  <p className="text-red-600 text-sm font-medium">● {item.qtd}</p>
                )}
                <p className="text-gray-400 text-xs">Atualizado {item.atualizado}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                {item.distancia}
              </div>
              <button className="bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-teal-700">
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>

      <MenuDown/>
    </div>
  );
}
