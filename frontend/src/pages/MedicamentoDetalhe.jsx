import { ArrowLeft, Heart, MapPin, Building } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../config/DataBase";

export default function MedicamentoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicamento, setMedicamento] = useState(null);
  const [unidades, setUnidades] = useState([]);
  const [notificar, setNotificar] = useState(false);
  const [lembrete, setLembrete] = useState("");
  const [adicionarLembrete, setAdicionarLembrete] = useState(false);
  const [favorito, setFavorito] = useState(false);

  const user = JSON.parse(localStorage.getItem("loggedUserData")); 
  const userId = user?.id_usuario;

  const handleFavoritar = async () => {
    if (!userId) return alert("Usuário não autenticado.");
  
    if (favorito) {
      const { error } = await supabase
        .from("favoritos")
        .delete()
        .eq("id_usuario", userId)
        .eq("id_medicamento", id);
  
      if (!error) setFavorito(false);
      else console.error("Erro ao remover favorito:", error);
    } else {
      const { error } = await supabase.from("favoritos").insert([
        {
          id_usuario: userId,
          id_medicamento: id,
          tipo: "Medicamento",
          detalhe: "Favorito adicionado via app",
        },
      ]);
  
      if (!error) setFavorito(true);
      else console.error("Erro ao adicionar favorito:", error);
    }
  };

  useEffect(() => {
    const fetchMedicamento = async () => {
      const { data: med, error: medError } = await supabase
        .from("medicamentos")
        .select("*")
        .eq("id_medicamento", id)
        .single();

      if (medError) console.error("Erro medicamento:", medError);
      else setMedicamento(med);

      if (med?.disponivel) {
        const { data: unidadesData, error: unidError } = await supabase
          .from("estoque")
          .select(`
            quantidade_estoque,
            unidades (
              id_unidade,
              nome_unidade,
              endereco,
              cidade
            )
          `)
          .eq("id_medicamento", id);

        if (unidError) console.error("Erro unidades:", unidError);
        else setUnidades(unidadesData);
      }
    };

    fetchMedicamento();
  }, [id]);

  if (!medicamento) return <p className="p-4">Carregando...</p>;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="p-4 bg-white shadow-sm flex justify-between items-center">
        <ArrowLeft
          className="text-gray-700 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="font-semibold">{medicamento.nome_medicamento}</h1>
        <Heart
          onClick={handleFavoritar}
          className={`cursor-pointer transition ${
            favorito ? "text-red-500 fill-red-500" : "text-gray-700"
          }`}
        />
      </div>

      <div className="bg-white m-4 p-4 rounded-2xl shadow">
        <h2 className="font-semibold text-lg mb-2">
          {medicamento.nome_medicamento}
        </h2>
        <p className="text-sm text-gray-600">
          {medicamento.principio_ativo || "Sem descrição detalhada"}
        </p>
        <div className="mt-2 text-sm text-gray-700">
          <p>
            <strong>Validade:</strong>{" "}
            {medicamento.validade
              ? new Date(medicamento.validade).toLocaleDateString("pt-BR")
              : "Não informada"}
          </p>
          <p>
            <strong>Disponível:</strong>{" "}
            {medicamento.disponivel ? "Sim" : "Não"}
          </p>
        </div>
      </div>
      
      <div className="bg-white m-4 p-4 rounded-2xl shadow">
        <p className="font-semibold mb-3">Disponível em</p>

        {!medicamento.disponivel ? (
          <p className="text-sm text-red-500">
            Este medicamento não está disponível no momento.
          </p>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-xl">
            {unidades.length === 0 ? (
              <p className="text-sm text-gray-500">Nenhuma unidade disponível</p>
            ) : (
              unidades.map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-100 rounded-xl p-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-green-600" />
                      <p className="font-medium">{item.unidades.nome_unidade}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {item.unidades.endereco} - {item.unidades.cidade}
                    </p>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {item.quantidade_estoque} unidades
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="bg-white m-4 p-4 rounded-2xl shadow space-y-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={notificar}
            onChange={() => setNotificar(!notificar)}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-700">
            Deseja receber notificação quando disponível?
          </span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={adicionarLembrete}
            onChange={() => setAdicionarLembrete(!adicionarLembrete)}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-700">Adicionar lembrete</span>
        </label>

        {adicionarLembrete && (
          <div className="space-y-2">
            <textarea
              value={lembrete}
              onChange={(e) => setLembrete(e.target.value)}
              placeholder="Escreva a mensagem do lembrete..."
              className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={async () => {
                if (!userId) return alert("Usuário não autenticado.");
                if (!lembrete.trim()) return alert("Digite uma mensagem.");

                const { error } = await supabase.from("lembretes").insert([
                  {
                    id_usuario: userId,
                    id_medicamento: id,
                    mensagem: lembrete.trim(),
                  },
                ]);

                if (error) {
                  console.error("Erro ao salvar lembrete:", error);
                  alert("Erro ao salvar lembrete.");
                } else {
                  alert("Lembrete salvo com sucesso!");
                  setLembrete("");
                  setAdicionarLembrete(false);
                }
              }}
              className="bg-green-600 text-white w-full py-2 rounded-xl hover:bg-green-700 transition"
            >
              Salvar lembrete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
