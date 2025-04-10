const API_URL = "https://5002-idx-db-sorteo-1743637369676.cluster-ve345ymguzcd6qqzuko2qbxtfe.cloudworkstations.dev";

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Registro fallido:", error.message);
    return { success: false, message: "Error en el registro" };
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Inicio de sesión fallido:", error.message);
    return { success: false, message: "Error en el inicio de sesión" };
  }
};
