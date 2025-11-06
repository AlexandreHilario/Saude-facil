import { useEffect, useState } from "react";
import { Bell, Settings, Calendar, User } from "lucide-react";
import Header from "../components/Header";
import MenuDown from "../components/MenuDown";
import ConfigModal from "../components/modals/ConfigModal";
import NotificationsModal from "../components/modals/NotificationsModal";
import RemindersModal from "../components/modals/RemindersModal";

export default function ProfilePage() {
  const [username, setUsername] = useState("Usuário");
  const [email, setEmail] = useState("usuario@email.com");
  const [modalOpen, setModalOpen] = useState(null);

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("loggedUser");
    if (nomeSalvo) setUsername(nomeSalvo);

    const emailSalvo = localStorage.getItem("loggedEmail");
    if (emailSalvo) setEmail(emailSalvo);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      <Header username={username} onLogout={handleLogout} />

      <div className="px-4 mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="text-gray-800 font-semibold text-lg mb-2 flex items-center gap-2">
            <User className="text-green-600" /> Dados do Usuário
          </h2>
          <p className="text-sm text-gray-600">Nome: {username}</p>
          <p className="text-sm text-gray-600">E-mail: {email}</p>
        </div>

        <div
          className="bg-white rounded-2xl p-4 shadow flex items-center justify-between cursor-pointer hover:bg-gray-50"
          onClick={() => setModalOpen("config")}
        >
          <div className="flex items-center gap-2">
            <Settings className="text-green-600" />
            <p className="font-medium text-gray-800">Configurações</p>
          </div>
          <span className="text-gray-400 text-sm">Gerenciar</span>
        </div>

        <div
          className="bg-white rounded-2xl p-4 shadow flex items-center justify-between cursor-pointer hover:bg-gray-50"
          onClick={() => setModalOpen("notificacoes")}
        >
          <div className="flex items-center gap-2">
            <Bell className="text-green-600" />
            <p className="font-medium text-gray-800">Notificações</p>
          </div>
          <span className="text-gray-400 text-sm">Ver</span>
        </div>

        <div
          className="bg-white rounded-2xl p-4 shadow flex items-center justify-between cursor-pointer hover:bg-gray-50"
          onClick={() => setModalOpen("lembretes")}
        >
          <div className="flex items-center gap-2">
            <Calendar className="text-green-600" />
            <p className="font-medium text-gray-800">Lembretes</p>
          </div>
          <span className="text-gray-400 text-sm">Abrir</span>
        </div>
      </div>

      <MenuDown />

      {modalOpen === "config" && <ConfigModal onClose={() => setModalOpen(null)} />}
      {modalOpen === "notificacoes" && <NotificationsModal onClose={() => setModalOpen(null)} />}
      {modalOpen === "lembretes" && <RemindersModal onClose={() => setModalOpen(null)} />}
    </div>
  );
}
