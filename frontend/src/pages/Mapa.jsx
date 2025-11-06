import { useState } from "react";
import { Map as MapIcon } from "lucide-react";
import MenuDown from "../components/MenuDown";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Mapa() {
  const [username, setUsername] = useState("Usuário");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const unidades = [
    {
      id: 1,
      nome: "Segsat - Recife Antigo",
      endereco: "Rua do Apolo, 235 - Recife Antigo, Recife - PE",
      latitude: -8.063420, 
      longitude: -34.874223,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      <Header username={username} onLogout={handleLogout} />

      <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Busque na sua localidade"
      />

      <div className="px-3 transition-all duration-200 flex-1">
        <div
          className={`bg-white rounded-lg overflow-hidden shadow-sm ${
            expanded ? "h-[calc(100vh-130px)]" : "h-96"
          }`}
        >
          <MapContainer
            center={[-8.063169, -34.871139]} 
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {unidades.map((u) => (
              <Marker key={u.id} position={[u.latitude, u.longitude]}>
                <Popup>
                  <strong>{u.nome}</strong>
                  <br />
                  {u.endereco}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
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

      <MenuDown />
    </div>
  );
}
