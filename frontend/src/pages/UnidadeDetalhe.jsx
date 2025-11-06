import { ArrowLeft, Heart, Building, Phone, Clock } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

export default function UnidadeDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const unidade = {
    nome: "UBS Centro",
    endereco: "Rua das flores, 123 - Centro",
    distancia: "2km",
    horario: "Aberto até 17h",
    telefone: "(81) 123456789",
    funcionamento: "Segunda a sexta: 7h às 17h\nSábado: 9h às 12h",
    insumos: [
      { nome: "Insulina Regular", qtd: "101 unid.", atualizado: "há 1h" },
      { nome: "Insulina NPH", qtd: "98 unid.", atualizado: "há 2h" },
      { nome: "Dipirona Sódica", qtd: "77 unid.", atualizado: "há 30min" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="p-4 bg-white shadow-sm flex justify-between items-center">
        <ArrowLeft className="text-gray-700" onClick={() => navigate(-1)} />
        <h1 className="font-semibold">{unidade.nome}</h1>
        <Heart className="text-gray-700" />
      </div>

      <div className="bg-white m-4 p-4 rounded-2xl shadow">
        <div className="flex items-start gap-3">
          <Building className="text-green-600 w-6 h-6" />
          <div>
            <p className="font-semibold">{unidade.nome}</p>
            <p className="text-sm text-gray-500">{unidade.endereco}</p>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <span>{unidade.distancia}</span> • <span>{unidade.horario}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white m-4 p-4 rounded-2xl shadow">
        <p className="font-semibold mb-3">Insumos Disponíveis</p>
        <div className="space-y-3">
          {unidade.insumos.map((i, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-xl p-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{i.nome}</p>
                <p className="text-xs text-gray-500">Atualizado {i.atualizado}</p>
              </div>
              <p className="text-green-600 font-semibold text-sm">{i.qtd}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white m-4 p-4 rounded-2xl shadow space-y-2">
        <div className="flex items-center gap-2 text-gray-700">
          <Phone size={18} />
          <p>{unidade.telefone}</p>
        </div>
        <div className="flex items-start gap-2 text-gray-700">
          <Clock size={18} />
          <p className="whitespace-pre-line text-sm">{unidade.funcionamento}</p>
        </div>
      </div>
    </div>
  );
}
