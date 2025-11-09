import { useEffect, useState } from "react";
import { ArrowLeft, Heart, Building, Phone, Clock } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../config/DataBase";

export default function UnidadeDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [unidade, setUnidade] = useState(null);
  const [insumos, setInsumos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: unidadeData, error: unidadeError } = await supabase
        .from("unidades")
        .select("*")
        .eq("id_unidade", id)
        .single();

      if (unidadeError) console.error("Erro ao buscar unidade:", unidadeError);
      else setUnidade(unidadeData);

      const { data: estoqueData, error: estoqueError } = await supabase
        .from("estoque")
        .select(
          `
          id_medicamento,
          quantidade_estoque,
          medicamentos (
            nome_medicamento,
            validade,
            categoria,
            disponivel
          )
        `
        )
        .eq("id_unidade", id);

      if (estoqueError) console.error("Erro ao buscar estoque:", estoqueError);
      else setInsumos(estoqueData || []);
    };

    fetchData();
  }, [id]);

  if (!unidade) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Carregando informações...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="p-4 bg-white shadow-sm flex justify-between items-center">
        <ArrowLeft
          className="text-gray-700 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="font-semibold">{unidade.nome_unidade}</h1>
      </div>

      <div className="bg-white m-4 p-4 rounded-2xl shadow">
        <div className="flex items-start gap-3">
          <Building className="text-green-600 w-6 h-6" />
          <div>
            <p className="font-semibold">{unidade.nome_unidade}</p>
            <p className="text-sm text-gray-500">{unidade.endereco}</p>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <span>{unidade.cidade}</span>
              {unidade.telefone && <span>• {unidade.telefone}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white m-4 p-4 rounded-2xl shadow">
        <p className="font-semibold mb-3">Insumos Disponíveis</p>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {insumos.length === 0 ? (
            <p className="text-sm text-gray-500">
              Nenhum medicamento disponível nesta unidade.
            </p>
          ) : (
            insumos.map((i, index) => (
              <div
                key={index}
                className="border border-gray-100 rounded-xl p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {i.medicamentos?.nome_medicamento}
                  </p>
                  <p className="text-xs text-gray-500">
                    Categoria: {i.medicamentos?.categoria || "N/A"}
                  </p>
                  <p className="text-xs text-gray-400">
                    Validade:{" "}
                    {i.medicamentos?.validade
                      ? new Date(i.medicamentos.validade).toLocaleDateString(
                          "pt-BR"
                        )
                      : "Não informada"}
                  </p>
                </div>
                <p className="text-green-600 font-semibold text-sm">
                  {i.quantidade_estoque} unid.
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white m-4 p-4 rounded-2xl shadow space-y-2">
        {unidade.telefone && (
          <div className="flex items-center gap-2 text-gray-700">
            <Phone size={18} />
            <p>{unidade.telefone}</p>
          </div>
        )}
        <div className="flex items-start gap-2 text-gray-700">
          <Clock size={18} />
          <p className="whitespace-pre-line text-sm">
            Segunda a sexta: 7h às 17h{"\n"}Sábado: 9h às 12h
          </p>
        </div>
      </div>
    </div>
  );
}
