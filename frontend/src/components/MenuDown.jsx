import { Home, Search, Map, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function MenuDown() {
  const location = useLocation();

  const navItems = [
    { name: "Início", icon: Home, path: "/" },
    { name: "Buscar", icon: Search, path: "/buscar" },
    { name: "Mapa", icon: Map, path: "/mapa" },
  ];

  return (
    <div className="bg-white border-t flex justify-around py-3 shadow-md fixed bottom-0 left-0 right-0 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center ${
              isActive ? "text-green-600" : "text-gray-500"
            }`}
          >
            <Icon size={22} />
            <span className="text-xs">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
