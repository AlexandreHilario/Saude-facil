export default function NotificationsModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-5 w-11/12 max-w-md">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">Notificações</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>💊 Amoxicilina disponível na UBS Centro</li>
          <li>📅 Consulta marcada para 10/11 às 14h</li>
          <li>⚙️ Atualização do sistema concluída</li>
        </ul>
        <button
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg w-full"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
