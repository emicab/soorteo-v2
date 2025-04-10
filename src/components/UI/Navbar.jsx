import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeForm, setActiveForm] = useState("login"); // 'login' o 'register'

  const openModal = (form) => {
    setActiveForm(form);
    setModalOpen(true);
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold">Rifalo! 🎲</Link>
      <div>
        {!user ? (
          <>
            <button onClick={() => openModal("login")} className="text-white mx-2">Iniciar Sesión</button>
            <button onClick={() => openModal("register")} className="text-white mx-2">Registrarse</button>
          </>
        ) : (
          <>
            <a href="/dashboard" className="text-white mx-2">Mis Sorteos</a>
            <button onClick={logout} className="text-red-400 mx-2">Cerrar Sesión</button>
          </>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button onClick={() => setModalOpen(false)} className="absolute top-2 right-2 text-gray-600">✖</button>
            {activeForm === "login" ? <LoginForm /> : <RegisterForm />}
            <p className="mt-4 text-center">
              {activeForm === "login" ? (
                <span>
                  ¿No tienes cuenta?{" "}
                  <button onClick={() => setActiveForm("register")} className="text-blue-500">
                    Regístrate aquí
                  </button>
                </span>
              ) : (
                <span>
                  ¿Ya tienes cuenta?{" "}
                  <button onClick={() => setActiveForm("login")} className="text-blue-500">
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
