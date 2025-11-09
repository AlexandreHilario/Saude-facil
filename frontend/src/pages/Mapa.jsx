import { useState, useEffect } from "react";
import MenuDown from "../components/MenuDown";
import Header from "../components/Header";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { supabase } from "../config/DataBase";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function SetViewOnLocation({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView(coords, 15);
  }, [coords]);
  return null;
}

export default function Mapa() {
  const [username, setUsername] = useState("Usuário");
  const [unidades, setUnidades] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("loggedUserData");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUsername(parsed.nome_usuario || "Usuário");
    }

    const fetchUnidades = async () => {
      const { data, error } = await supabase.from("unidades").select("*");
      if (error) console.error("Erro ao buscar unidades:", error);
      else setUnidades(data || []);
    };

    fetchUnidades();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => console.error("Erro ao obter localização:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "/login";
  };

  const defaultCenter = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : [-8.063169, -34.871139];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      <Header username={username} onLogout={handleLogout} />

      <div className="px-3 transition-all duration-200 flex-1">
        <div
          className={`bg-white rounded-lg overflow-hidden shadow-sm ${
            expanded ? "h-[calc(100vh-130px)]" : "h-96"
          }`}
        >
          <MapContainer
            center={defaultCenter}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {userLocation && (
              <>
                <Marker
                  position={[userLocation.latitude, userLocation.longitude]}
                  icon={redIcon}
                >
                  <Popup>
                    <strong>Sua localização</strong>
                    <br />
                    {username}
                  </Popup>
                </Marker>
                <SetViewOnLocation
                  coords={[userLocation.latitude, userLocation.longitude]}
                />
              </>
            )}

            {unidades.map(
              (u) =>
                u.latitude &&
                u.longitude && (
                  <Marker
                    key={u.id_unidade}
                    position={[u.latitude, u.longitude]}
                    icon={defaultIcon}
                  >
                    <Popup>
                      <strong>{u.nome_unidade}</strong>
                      <br />
                      {u.endereco}
                      <br />
                      {u.cidade}
                    </Popup>
                  </Marker>
                )
            )}
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
