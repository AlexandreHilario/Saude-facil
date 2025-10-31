import { Search, Mic } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="p-3">
      <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border">
        <Search size={18} className="text-gray-400" />
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Buscar..."}
          className="flex-1 outline-none text-sm bg-transparent"
        />
        <button aria-label="Busca por voz">
          <Mic size={18} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}
