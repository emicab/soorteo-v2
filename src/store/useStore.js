import { toast } from "react-toastify";
import { create } from "zustand";

const useStore = create((set) => ({
  numbers: Array.from({ length: 100 }, (_, i) => i + 1),
  numberSelect: [],
  cantidadSorteo: 1,
  resultados: [],
  premios: [], // Ahora los premios serán ingresados por el usuario
  contador: 0,

  // Alternar selección de número
  toggleNumber: (n) =>
    set((state) => ({
      numberSelect: state.numberSelect.includes(n)
        ? state.numberSelect.filter((num) => num !== n)
        : [...state.numberSelect, n],
    })),

  // Eliminar número de la selección
  removeNumber: (n) =>
    set((state) => ({
      numberSelect: state.numberSelect.filter((num) => num !== n),
    })),

  // Agregar un premio ingresado por el usuario
  addPrize: (prize) =>
    set((state) => ({
      premios: [...state.premios, prize],
    })),

  // Eliminar un premio
  removePrize: (index) =>
    set((state) => ({
      premios: state.premios.filter((_, i) => i !== index),
    })),

  // Cambiar cantidad de sorteos
  setCantidadSorteo: (cantidad) => set({ cantidadSorteo: cantidad }),

  // Realizar el sorteo con premios personalizados
  sortear: () => {
    set((state) => {
      if (state.numberSelect.length === 0) {
        toast.warn("No hay números seleccionados para el sorteo.");
        return state;
      }

      if (state.cantidadSorteo > state.numberSelect.length) {
        toast.warn("La cantidad de números a sortear no puede ser mayor que los seleccionados.");
        return state;
      }
      
      if (state.premios.length == 0) {
        toast.warn("No hay premios ingresados.");
        return state;
      }
      /* if (state.premios.length < state.cantidadSorteo) {
        alert("No hay suficientes premios para sortear.");
        return state;
      } */

      return { resultados: [], contador: 3 }; // Iniciar cuenta regresiva y limpiar resultados
    });

    const interval = setInterval(() => {
      set((state) => {
        if (state.contador === 1) {
          clearInterval(interval);

          const shuffledNumbers = [...state.numberSelect].sort(() => Math.random() - 0.5);
          const shuffledPrizes = [...state.premios].sort(() => Math.random() - 0.5);

          const resultadosConPremios = shuffledNumbers.slice(0, state.cantidadSorteo).map((num, index) => ({
            numero: num,
            premio: shuffledPrizes[index] || "Sin premio",
          }));

          return { resultados: resultadosConPremios, contador: 0 };
        }
        return { contador: state.contador - 1 };
      });
    }, 1000);
  },
}));

export default useStore;
