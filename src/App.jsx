import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import useAuthStore from "./store/useAuthStore";

import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import Dashboard from "./components/Dashboard"; // Ruta protegida
import Navbar from "./components/UI/Navbar";
import PublicRaffleView from "./pages/PublicRaffleView";
import HomePage from "./pages/HomePage";

const PrivateRoute = ({ element }) => {
  const { user } = useAuthStore();
  return user ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element }) => {
  const { user } = useAuthStore();
  return user ? <Navigate to="/dashboard" /> : element;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<PublicRoute element={<LoginForm />} />}
        />
        <Route
          path="/register"
          element={<PublicRoute element={<RegisterForm />} />}
        />
        <Route path="/raffles/:id/public" element={<PublicRaffleView />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
