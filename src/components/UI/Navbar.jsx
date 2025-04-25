import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import { Link } from "react-router-dom";
import LogOut from "./icons/LogOut";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState("login"); // 'login' o 'register'

  const openModal = (form) => {
    setActiveForm(form);
    setModalOpen(true);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-100 to-slate-200 py-2 px-3 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold cursor-pointer">
        <img src="/Logo_Negro.svg" alt="" className="w-26 md:w-36" />
      </Link>
      <div>
        {!user ? (
          <>
            <button
              onClick={() => openModal("login")}
              className="text-text font-semibold cursor-pointer mx-2 hover:text-tertiary transition-all"
            >
              Iniciar Sesión
            </button>
            {/* <button
              onClick={() => openModal("register")}
              className="text-text font-semibold cursor-pointer hidden mx-2 hover:text-tertiary transition-all"
            >
              Registrarse
            </button> */}
          </>
        ) : (
          <div className="flex items-center">
            <Link to="/dashboard" className="text-text mx-2 font-semibold hover:text-tertiary transition-all">
              Mis Sorteos
            </Link>
            <Link to="/" onClick={logout} className="cursor-pointer px-2 py-2 rounded-full hover:bg-gray-300 transition-all"> 
              <LogOut className="w-6 h-6 text-red-600" />
            </Link>
          </div>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 px-4 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600"
            >
              ✖
            </button>
            {activeForm === "login" ? (
              <LoginForm onClose={() => setModalOpen(false)} />
            ) : (
              <RegisterForm onClose={() => setModalOpen(false)} />
            )}
            <p className="mt-4 text-center">
              {activeForm === "login" ? (
                <span>
                  ¿No tienes cuenta?{" "}
                  <button
                    onClick={() => setActiveForm("register")}
                    className="text-blue-500"
                  >
                    Regístrate aquí
                  </button>
                </span>
              ) : (
                <span>
                  ¿Ya tienes cuenta?{" "}
                  <button
                    onClick={() => setActiveForm("login")}
                    className="text-blue-500"
                  >
                    Inicia sesión aquí
                  </button>
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
