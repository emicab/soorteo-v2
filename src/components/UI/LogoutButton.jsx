import useAuthStore from "../store/useAuthStore";

const LogoutButton = () => {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  return (
    <button onClick={logout}>Cerrar Sesión</button>
  );
};

export default LogoutButton;
