import { useState, useEffect } from "react";
import { Heart, Trash2, Building, Pill } from "lucide-react";
import MenuDown from "../components/MenuDown";
import Header from "../components/Header";
import { supabase } from "../config/DataBase"; // 👈 IMPORTANTE

export default function Favoritos() {
  const [username, setUsername] = useState("Usuário");
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchFavoritos = async () => {
      const user = JSON.parse(localStorage.getItem("loggedUserData"));
      if (!user) return;

      setUsername(user.nome_usuario);

      const { data, error } = await supabase
        .from("favoritos")
        .select(`
          id_favorito,
          tipo,
          detalhe,
          medicamentos:medicamentos (nome_medicamento)
        `)
        .eq("id_usuario", user.id_usuario);

      if (error) {
        console.error("Erro ao carregar favoritos:", error);
        return;
      }

      const formatados = data.map((fav) => ({
        tipo: fav.tipo,
        nome: fav.medicamentos?.nome_medicamento || "Desconhecido",
        detalhe: fav.detalhe,
      }));

      setFavoritos(formatados);
    };

    fetchFavoritos();
  }, []);

  const removerFavorito = async (index) => {
    const user = JSON.parse(localStorage.getItem("loggedUserData"));
    const favorito = favoritos[index];

    const { error } = await supabase
      .from("favoritos")
      .delete()
      .eq("id_usuario", user.id_usuario)
      .eq("tipo", favorito.tipo)
      .eq("detalhe", favorito.detalhe);

    if (error) console.error("Erro ao remover:", error);
    else setFavoritos(favoritos.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("loggedUserData");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 flex flex-col">
      <Header username={username} onLogout={handleLogout} />

      <div className="px-4 mt-5 overflow-y-auto max-h-[70vh]">
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
