import { useState, useEffect } from "react";
import { Heart, Trash2 } from "lucide-react";
import MenuDown from "../components/MenuDown";
import Header from "../components/Header";

export default function Favoritos() {
  const [username, setUsername] = useState("Usuário");
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("loggedUser");
    if (nomeSalvo) setUsername(nomeSalvo);

    // Mock de favoritos salvos (depois pode vir do backend ou localStorage)
    const favoritosSalvos = [
      {
        tipo: "Medicamento",
        nome: "Dipirona Sódica",
        detalhe: "UBS Centro",
      },
      {
        tipo: "Medicamento",
        nome: "Amoxicilina",
        detalhe: "UBS Boa Vista",
      },
      {
        tipo: "Unidade",
        nome: "UBS Jardim",
        detalhe: "Rua Esperança, 45",
      },
    ];
    setFavoritos(favoritosSalvos);
  }, []);

  const removerFavorito = (index) => {
    const novosFavoritos = favoritos.filter((_, i) => i !== index);
    setFavoritos(novosFavoritos);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "/login"; // redireciona pra tela de login
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* Header */}
      <Header username={username} onLogout={handleLogout} />

      {/* Lista de Favoritos */}
      <div className="px-4 mt-5">
        {favoritos.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <Heart className="mx-auto mb-3 text-gray-400" size={40} />
            <p>Você ainda não adicionou nenhum favorito.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {favoritos.map((item, index) => (
              <li
                key={index}
                className="bg-white rounded-2xl shadow p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">{item.nome}</p>
                  <p className="text-xs text-gray-500">
                    {item.tipo} — {item.detalhe}
                  </p>
                </div>
                <button
                  onClick={() => removerFavorito(index)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <MenuDown />
    </div>
  );
}
