import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { useLocation } from "react-router-dom";


const MercadoPagoStatus = () => {
  const [user, setUser] = useState({});
const { getUserId } = useAuthStore();
const userId = getUserId();
const location = useLocation();
const URL = import.meta.env.VITE_URL;

const fetchUser = async () => {
  if (!userId) return;
  try {
    const res = await fetch(`https://kh8mlfw9-3000.brs.devtunnels.ms/api/users/${userId}`);
    const data = await res.json();
    if (res.ok) setUser(data);
  } catch (err) {
    console.error("Error cargando usuario:", err);
  }
};

useEffect(() => {
  fetchUser();
}, [userId]);

// useEffect(() => {
//   const status = new URLSearchParams(location.search).get("status");
//   if (status === "success") fetchUser();
// }, [location]);

  return (
    <div className="flex items-center gap-2 p-2 px-3 rounded-lg shadow-md bg-white border border-gray-200 w-44 relative">
      {user.mp_connected ? (
        <div className="text-green-600 font-medium text-sm flex items-center gap-1">
          <span>🟢 Conectado a MP</span>
        </div>
      ) : (
        <div className="text-red-600 font-medium text-sm flex items-center gap-2">
          <span>🔌 No conectado</span>
          <a
            href={`${URL}/api/oauth/connect/${userId}`} // Esta es la ruta que redirige al auth de MP
            className="text-blue-600 underline text-sm"
          >
            Conectar
          </a>
        </div>
      )}
    </div>
  );
};

export default MercadoPagoStatus;
