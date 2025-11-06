import { useState } from "react";
import { LogOut } from "lucide-react";
import { Bell } from "lucide-react";
import NotificationsModal from "../components/modals/NotificationsModal";

export default function Header({ username, onLogout }) {

  const [modalOpen, setModalOpen] = useState(null);

  return (
    <div className="p-4 bg-white shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="../../assets/avatar.png"
          alt="Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-gray-600 text-sm">Olá,</p>
          <p className="font-semibold text-gray-900">{username}</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
      <div onClick={() => setModalOpen("notificacoes")} className="cursor-pointer">
        <Bell className="text-green-600" />
      </div>
      
      <button
        onClick={onLogout}
        className="flex items-center gap-1 text-red-500 hover:text-red-600 transition"
      >
        <LogOut size={20} />
        <span className="text-sm font-medium">Sair</span>
      </button>
      </div>
      {modalOpen === "notificacoes" && <NotificationsModal onClose={() => setModalOpen(null)} />}
    </div>
  );
}
