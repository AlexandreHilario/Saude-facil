import { ArrowLeft, Heart, MapPin, Building } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MedicamentoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notificar, setNotificar] = useState(false);
  const [lembrete, setLembrete] = useState("");
  const [adicionarLembrete, setAdicionarLembrete] = useState(false);
  const [favorito, setFavorito] = useState(false);

  const medicamento = {
    id,
    nome: "Insulina Regular",
    descricao:
      "A Insulina Regular é um tipo de insulina de ação rápida utilizada para controlar os níveis de glicose no sangue em pessoas com diabetes.",
    unidades: [
      {
        id: 1,
        nome: "UBS Centro",
        endereco: "Rua das Flores, 123 - Centro",
        distancia: "2km",
        qtd: "101 unid.",
        atualizado: "há 1h",
        horario: "Aberto até 17h",
      },
      {
        id: 2,
        nome: "UBS Boa Vista",
        endereco: "Av. Paulista, 210",
        distancia: "3km",
        qtd: "58 unid.",
        atualizado: "há 2h",
        horario: "Aberto até 16h",
      },
      {
        id: 3,
        nome: "UBS Aurora",
        endereco: "Av. Recife, 1200",
        distancia: "6km",
        qtd: "Indisponível",
        atualizado: "há 5h",
        horario: "Fechada",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="p-4 bg-white shadow-sm flex justify-between items-center">
        <ArrowLeft
          className="text-gray-700 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="font-semibold">{medicamento.nome}</h1>
        <Heart
          onClick={() => setFavorito(!favorito)}
          className={`cursor-pointer transition ${
            favorito ? "text-red-500 fill-red-500" : "text-gray-700"
          }`}
        />
      </div>

      <div className="bg-white m-4 p-4 rounded-2xl shadow">
        <h2 className="font-semibold text-lg mb-2">{medicamento.nome}</h2>
        <p className="text-sm text-gray-600">{medicamento.descricao}</p>
      </div>

      <div className="bg-white m-4 p-4 rounded-2xl shadow">
        <p className="font-semibold mb-3">Disponível em</p>
        <div className="space-y-3">
          {medicamento.unidades.map((u) => (
            <div
              key={u.id}
              className="border border-gray-100 rounded-xl p-3 flex justify-between items-center"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-green-600" />
                  <p className="font-medium">{u.nome}</p>
                </div>
                <p className="text-xs text-gray-500">{u.endereco}</p>
                <div className="flex items-center text-xs text-gray-400 mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  {u.distancia} • {u.horario}
                </div>
              </div>

              <div className="text-right">
                {u.qtd === "Indisponível" ? (
                  <p className="text-red-600 font-medium text-sm">
                    Indisponível
                  </p>
                ) : (
                  <p className="text-green-600 font-medium text-sm">{u.qtd}</p>
                )}
                <p className="text-xs text-gray-400">
                  Atualizado {u.atualizado}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NOVAS OPÇÕES */}
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
          <textarea
            value={lembrete}
            onChange={(e) => setLembrete(e.target.value)}
            placeholder="Escreva a mensagem do lembrete..."
            className="w-full border border-gray-200 rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        )}
      </div>
    </div>
  );
}
