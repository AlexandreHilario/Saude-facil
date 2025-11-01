import { useState } from "react";
import { ArrowLeft, Search, Mic, Map as MapIcon, Home, Heart, User } from "lucide-react";
import MenuDown from "../components/MenuDown";
import SearchBar from "../components/SearchBar"; 

export default function Mapa() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.192216631509!2d-34.92565918457137!3d-8.053893490455834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab1e6f4f3b6d2b%3A0x0!2z0JHQvtC70LDRgNCw0YXRg9C90L3QuNGP!5e0!3m2!1spt-BR!2sbr!4v1698730000000!5m2!1spt-BR!2sbr";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Busque na sua localidade"
      />

      <div className={`px-3 transition-all duration-200 ${expanded ? "flex-1" : ""}`}>
        <div className={`bg-white rounded-lg overflow-hidden shadow-sm ${expanded ? "h-[calc(100vh-130px)]" : "h-64"}`}>
          <iframe
            title="Mapa - Recife"
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="bg-teal-700 text-white px-6 py-2 rounded-md shadow-md hover:bg-teal-800 transition"
          >
            {expanded ? "Reduzir mapa" : "Expandir mapa"}
          </button>
        </div>
      </div>
      <MenuDown/>
    </div>
  );
}
