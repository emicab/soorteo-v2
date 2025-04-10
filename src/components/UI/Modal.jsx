import { useModalStore } from "../../store/modalStore";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

const Modal = () => {
  const { isOpen, closeModal, modalType } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        {modalType === "login" && <LoginForm />}
        {modalType === "register" && <RegisterForm />}
      </div>
    </div>
  );
};

export default Modal;
