import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

const useAuthStore = create(persist(
  (set, get) => ({
    user: null,
    token: null,

    login: (userData, token) => {
      set({ user: userData, token });
    },

    logout: () => {
      set({ user: null, token: null });
    },

    getUserId: () => {
      const token = get().token;
      if (!token) return null;
      try {
        const decoded = jwtDecode(token);
        return decoded.id;
      } catch (err) {
        console.error("Token inválido", err);
        return null;
      }
    }
  }),
  {
    name: "auth-storage", // nombre de la clave en localStorage
    partialize: (state) => ({ token: state.token, user: state.user }), // qué guardar
  }
));

export default useAuthStore;
