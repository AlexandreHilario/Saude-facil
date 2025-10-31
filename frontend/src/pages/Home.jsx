import { Search, Bell, Menu, Home, Map, Heart, User, Package, Syringe, Baby } from "lucide-react";
import MenuDown from "../components/MenuDown";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-4 bg-white shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-gray-600 text-sm">Olá,</p>
            <p className="font-semibold text-gray-900">Maria Silva</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Bell className="text-gray-700" />
          <Menu className="text-gray-700" />
        </div>
      </div>

      <SearchBar/>

      <div className="px-4 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow">
          <p className="text-gray-500 text-sm">Medicamentos Disponíveis</p>
          <p className="text-2xl font-bold text-green-700">108</p>
          <span className="text-green-500 text-xs">+12</span>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow">
          <p className="text-gray-500 text-sm">Unidades Próximas</p>
          <p className="text-2xl font-bold text-green-700">6</p>
          <span className="text-green-500 text-xs">+3</span>
        </div>
      </div>

      <div className="px-4 mt-6">
        <p className="font-semibold text-gray-800 mb-3">Categorias</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow">
            <Package className="text-green-600" />
            <p className="text-sm mt-1">Medicamentos</p>
          </div>
          <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow">
            <Syringe className="text-green-600" />
            <p className="text-sm mt-1">Insulina</p>
          </div>
          <div className="bg-white rounded-2xl p-4 flex flex-col items-center shadow">
            <Baby className="text-green-600" />
            <p className="text-sm mt-1">Fraldas</p>
          </div>
        </div>
      </div>

      <MenuDown/>
    </div>
  );
}
