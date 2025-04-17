import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuthStore from "./store/useAuthStore";

import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import Dashboard from "./components/Dashboard"; // Ruta protegida
import Navbar from "./components/UI/Navbar";
import PublicRaffleView from "./pages/PublicRaffleView";
import HomePage from "./pages/HomePage";
import RaffleDetailCreator from "./components/raffle/RaffleDetailCreator";
import TermsAndConditions from "./pages/TermsAndConditions";

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
        <Route path="/:shortcode" element={<PublicRaffleView />} />

        <Route path="/termsAndConditions" element={<TermsAndConditions />} />

        {/* Rutas protegidas */}
        <Route
          path="/:shortcode/creator"
          element={<PrivateRoute element={<RaffleDetailCreator />} />}
        />
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
