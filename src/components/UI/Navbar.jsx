import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import LogOut from "./icons/LogOut";
import SearchRaffle from "../raffle/SearchRaffle";
import SearchIcon from "../UI/icons/SearchIcon";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState("login");

  const openModal = (form) => {
    setActiveForm(form);
    setModalOpen(true);
  };

  const username = user?.username || "Usuario";

  return (
    <nav className="bg-gradient-to-r from-gray-100 to-slate-200 p-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src="/Logo_Negro.svg" alt="Logo" className="w-28 md:w-36" />
      </Link>

      {/* Buscador */}
      <div className="hidden md:block md:mx-auto flex-1 mx-8">
        <SearchRaffle />
      </div>

      {/* Botón de búsqueda móvil */}
      <div className="block md:hidden">
        <button onClick={() => setSearchModalOpen(true)} className="p-2">
          <SearchIcon className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Botones de usuario */}
      <div className="flex items-center gap-2 md:mt-0">
        {!user ? (
          <>
            <button
              onClick={() => openModal("login")}
              className="text-text text-sm md:text-base font-semibold hover:text-tertiary transition"
            >
              Iniciar Sesión
            </button>
          </>
          // agregar boton registro
        ) : (
          <>
            <Link
              to="/dashboard"
              className="flex-1/2 text-text text-md md:text-lg font-semibold hover:text-tertiary transition"
            >
              Mis Sorteos
            </Link>
            <div className="flex items-center border-l border-gray-400 pl-2 relative group/item">
              <p className="font-bold text-blue-200 text-center bg-blue-600 rounded-full w-8 h-8 leading-7.5 px-2 group-hover/user:">{username.slice(0, 1)}</p>
              <p className="bg-white ml-2 text-sm md:text-base font-semibold absolute top-10 text-center -right-2 ">¡Hola, {username}!</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center justify-center hover:bg-gray-300 rounded-full transition"
            >
              <LogOut className="w-6 h-6 text-red-600" />
            </button>
          </>
        )}
      </div>

      {/* Modal Login/Register */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            {activeForm === "login" ? (
              <LoginForm onClose={() => setModalOpen(false)} />
            ) : (
              <RegisterForm onClose={() => setModalOpen(false)} />
            )}
            <p className="mt-4 text-center text-sm">
              {activeForm === "login" ? (
                <>
                  ¿No tienes cuenta?{" "}
                  <button
                    onClick={() => setActiveForm("register")}
                    className="text-blue-500 font-semibold"
                  >
                    Regístrate aquí
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{" "}
                  <button
                    onClick={() => setActiveForm("login")}
                    className="text-blue-500 font-semibold"
                  >
                    Inicia sesión aquí
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Modal Search en mobile */}
      {searchModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-start items-start px-4 z-40 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-20">
            <button
              onClick={() => setSearchModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-center mb-4 font-semibold text-lg">Buscar Sorteo</h2>
            <SearchRaffle setSearchModalOpen={setSearchModalOpen} />
          </motion.div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
