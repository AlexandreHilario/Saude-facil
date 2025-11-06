import { useState, useEffect } from "react";
import { Heart, Trash2, Building, Pill } from "lucide-react";
import MenuDown from "../components/MenuDown";
import Header from "../components/Header";

export default function Favoritos() {
  const [username, setUsername] = useState("Usuário");
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("loggedUser");
    if (nomeSalvo) setUsername(nomeSalvo);

    const favoritosSalvos = [
      { tipo: "Medicamento", nome: "Dipirona Sódica", detalhe: "UBS Centro" },
      { tipo: "Medicamento", nome: "Amoxicilina", detalhe: "UBS Boa Vista" },
      { tipo: "Unidade", nome: "UBS Jardim", detalhe: "Rua Esperança, 45" },
    ];
    setFavoritos(favoritosSalvos);
  }, []);

  const removerFavorito = (index) => {
    const novosFavoritos = favoritos.filter((_, i) => i !== index);
    setFavoritos(novosFavoritos);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 flex flex-col">
      <Header username={username} onLogout={handleLogout} />

      <div className="px-4 mt-5">
        {favoritos.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <Heart className="mx-auto mb-3 text-gray-400" size={40} />
            <p>Você ainda não adicionou nenhum favorito.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {favoritos.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 flex justify-between items-center"
              >
                <div className="flex items-start gap-3">
                  {item.tipo === "Medicamento" ? (
                    <Pill className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <Building className="w-5 h-5 text-blue-600 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium text-gray-800">{item.nome}</p>
                    <p className="text-xs text-gray-500">
                      {item.tipo} — {item.detalhe}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removerFavorito(index)}
                  className="text-gray-400 hover:text-red-600 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <MenuDown />
    </div>
  );
}
