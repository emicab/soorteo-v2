# 🎉 Sorteo v2

¡Bienvenido a **Sorteo v2**! Este es un proyecto desarrollado en **React** con **Zustand** para la gestión del estado, que permite realizar sorteos de manera sencilla y dinámica.

## 🚀 Características

- ✅ **Selección de números**: Los usuarios pueden seleccionar números de una lista predefinida.
- 🎁 **Ingreso de premios personalizados**: Se pueden agregar y eliminar premios para el sorteo.
- 🎲 **Sorteo aleatorio**: Los números seleccionados se sortean de manera aleatoria junto con los premios ingresados.
- ⏳ **Cuenta regresiva**: Al presionar el botón de sorteo, se inicia una cuenta regresiva antes de mostrar los resultados.
- 📜 **Resultados del sorteo**: Se muestra una lista con los números ganadores y los premios asignados.

## 🛠️ Tecnologías utilizadas

- **React**: Para la construcción de la interfaz de usuario.
- **Zustand**: Para la gestión del estado global.
- **Tailwind CSS**: Para el diseño y estilos responsivos.
- **Framer Motion**: Para agregar animaciones a la UI.

## 📂 Estructura del proyecto

/src 
│── /components 
    │ 
    │── AvailableNumbers.jsx 
    │ 
    │── SelectedNumbers.jsx 
    │ 
    │── LotterySection.jsx 
    │ 
    │── ResultsList.jsx 
    │ 
    │── PrizeInput.jsx 
    │── /store 
        │ 
        │── useStore.js 
│── App.jsx 
│── index.js


### 📌 Explicación de los archivos principales:

- `App.jsx`: Componente principal que estructura la aplicación.
- `/components`:
  - `AvailableNumbers.jsx`: Muestra los números disponibles para seleccionar.
  - `SelectedNumbers.jsx`: Lista los números que el usuario ha seleccionado.
  - `LotterySection.jsx`: Permite definir la cantidad de sorteos y ejecutar el sorteo.
  - `ResultsList.jsx`: Muestra los resultados del sorteo.
  - `PrizeInput.jsx`: Permite ingresar y gestionar los premios del sorteo.
- `/store/useStore.js`: Maneja el estado global utilizando Zustand.

## 🎯 Cómo usarlo

1. Selecciona los números que deseas incluir en el sorteo.
2. Agrega premios al listado.
3. Define cuántos números quieres sortear.
4. Presiona el botón **"Sortear"** y espera la cuenta regresiva.
5. ¡Mira los resultados y descubre los ganadores! 🎊
