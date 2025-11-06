import { useEffect, useState } from "react";
import { Bell, Settings, Calendar, User } from "lucide-react";
import Header from "../components/Header";
import MenuDown from "../components/MenuDown";

export default function ProfilePage() {
  const [username, setUsername] = useState("Usuário");
  const [email, setEmail] = useState("usuario@email.com");
  const [showModal, setShowModal] = useState(null); // controla qual modal abre

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("loggedUser");
    if (nomeSalvo) setUsername(nomeSalvo);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      <Header username={username} onLogout={handleLogout} />

      <div className="px-4 mt-6 space-y-4">
        {/* Dados do usuário */}
        <div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="text-gray-800 font-semibold text-lg mb-2 flex items-center gap-2">
            <User className="text-green-600" /> Dados do Usuário
          </h2>
          <p className="text-sm text-gray-600">Nome: {username}</p>
          <p className="text-sm text-gray-600">E-mail: {email}</p>
          <p className="text-sm text-gray-600">CPF: 123.456.789-00</p>
        </div>

        {/* Configurações */}
        <div
          className="bg-white rounded-2xl p-4 shadow flex items-center justify-between cursor-pointer hover:bg-gray-50"
          onClick={() => setShowModal("config")}
        >
          <div className="flex items-center gap-2">
            <Settings className="text-green-600" />
            <p className="font-medium text-gray-800">Configurações</p>
          </div>
          <span className="text-gray-400 text-sm">Gerenciar</span>
        </div>

        {/* Notificações */}
        <div
          className="bg-white rounded-2xl p-4 shadow flex items-center justify-between cursor-pointer hover:bg-gray-50"
          onClick={() => setShowModal("notificacoes")}
        >
          <div className="flex items-center gap-2">
            <Bell className="text-green-600" />
            <p className="font-medium text-gray-800">Notificações</p>
          </div>
          <span className="text-gray-400 text-sm">Ver</span>
        </div>

        {/* Lembretes */}
        <div
          className="bg-white rounded-2xl p-4 shadow flex items-center justify-between cursor-pointer hover:bg-gray-50"
          onClick={() => setShowModal("lembretes")}
        >
          <div className="flex items-center gap-2">
            <Calendar className="text-green-600" />
            <p className="font-medium text-gray-800">Lembretes</p>
          </div>
          <span className="text-gray-400 text-sm">Abrir</span>
        </div>
      </div>

      <MenuDown />

      {/* MODAL GENÉRICO */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-5 w-11/12 max-w-md">
            {showModal === "config" && (
              <>
                <h2 className="text-lg font-semibold mb-3 text-gray-800">
                  Configurações
                </h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>🔒 Alterar senha</li>
                  <li>🌙 Modo escuro (em breve)</li>
                  <li>📱 Sincronizar dados</li>
                </ul>
              </>
            )}

            {showModal === "notificacoes" && (
              <>
                <h2 className="text-lg font-semibold mb-3 text-gray-800">
                  Notificações
                </h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>💊 Medicamento “Amoxicilina” disponível na UBS Centro</li>
                  <li>📅 Consulta marcada para 10/11 às 14h</li>
                  <li>⚙️ Atualização do sistema concluída</li>
                </ul>
              </>
            )}

            {showModal === "lembretes" && (
              <>
                <h2 className="text-lg font-semibold mb-3 text-gray-800">
                  Lembretes
                </h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>💉 Aplicar insulina às 8h</li>
                  <li>💊 Tomar Paracetamol às 12h</li>
                  <li>🏥 Revisão médica em 3 dias</li>
                </ul>
              </>
            )}

            <button
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg w-full"
              onClick={() => setShowModal(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
