import AsyncStorage from '@react-native-async-storage/async-storage';

// Cambia esta IP por la IP local de tu computadora en la red Wi-Fi si usas dispositivo físico.
// Si usas el emulador de Android de Android Studio, usa 'http://10.0.2.2:5000'.
// Si usas iOS simulator, usa 'http://localhost:5000'.
const API_URL = 'hylian-cookbook-android-backend.railway.internal';

const getHeaders = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // --- Auth ---
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error en login');
    return data;
  },
  register: async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error en registro');
    return data;
  },

  // --- Recipes ---
  getPublicRecipes: async (category = 'Todas') => {
    const res = await fetch(`${API_URL}/recipes?category=${category}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error obteniendo recetas públicas');
    return data.recipes || [];
  },
  getMyRecipes: async () => {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/recipes/user/mine`, { headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error obteniendo mis recetas');
    return data.recipes || [];
  },
  createRecipe: async (recipeData) => {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/recipes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(recipeData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error creando receta');
    return data.recipe;
  },
  updateRecipe: async (id, recipeData) => {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/recipes/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(recipeData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error actualizando receta');
    return data.recipe;
  },
  deleteRecipe: async (id) => {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/recipes/${id}`, {
      method: 'DELETE',
      headers,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error eliminando receta');
    return data;
  },

  // --- Categories ---
  getMyCategories: async () => {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/categories/mine`, { headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error obteniendo categorías');
    return data.categories || [];
  },
  createCategory: async (name) => {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error creando categoría');
    return data.category;
  },
  deleteCategory: async (id) => {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error eliminando categoría');
    return data;
  },
  addRecipeToCategory: async (categoryId, recipeId) => {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/categories/${categoryId}/recipes/${recipeId}`, {
      method: 'POST',
      headers,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error agregando receta a categoría');
    return data.category;
  },
  removeRecipeFromCategory: async (categoryId, recipeId) => {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/categories/${categoryId}/recipes/${recipeId}`, {
      method: 'DELETE',
      headers,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error quitando receta de categoría');
    return data.category;
  },
};
