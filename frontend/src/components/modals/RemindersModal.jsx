import { useEffect, useState } from "react";
import { X, CalendarDays } from "lucide-react";
import { supabase } from "../../config/DataBase";

export default function RemindersModal({ onClose }) {
  const [lembretes, setLembretes] = useState([]);
  const user = JSON.parse(localStorage.getItem("loggedUserData"));
  const userId = user?.id_usuario;

  useEffect(() => {
    const fetchLembretes = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("lembretes")
        .select(`
          id_lembrete,
          mensagem,
          criado_em,
          medicamentos (
            nome_medicamento
          )
        `)
        .eq("id_usuario", userId)
        .order("criado_em", { ascending: false });

      if (error) {
        console.error("Erro ao buscar lembretes:", error);
      } else {
        setLembretes(data);
      }
    };

    fetchLembretes();
  }, [userId]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-11/12 max-w-md rounded-2xl p-5 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <CalendarDays className="text-green-600" />
          Seus Lembretes
        </h2>

        {lembretes.length === 0 ? (
          <p className="text-gray-500 text-sm text-center mt-4">
            Nenhum lembrete salvo ainda.
          </p>
        ) : (
          <div className="max-h-72 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {lembretes.map((item) => (
              <div
                key={item.id_lembrete}
                className="border border-gray-100 rounded-xl p-3 bg-gray-50 hover:bg-gray-100 transition"
              >
                <p className="text-sm font-medium text-green-700">
                 {item.medicamentos?.nome_medicamento || "Medicamento desconhecido"}
                </p>
                <p className="text-sm text-gray-700 mt-1">{item.mensagem}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(item.criado_em).toLocaleString("pt-BR")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
