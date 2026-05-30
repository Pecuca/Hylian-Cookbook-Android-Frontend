export const mockUsers = [
  { id: "user_1", name: "Alex Hernández", email: "alex@correo.com", password: "123" },
  { id: "user_2", name: "Carlos Pérez", email: "carlos@correo.com", password: "123" }
];

export const mockGroups = [
  { id: "group_1", name: "Almuerzos Caseros", userId: "user_1" },
  { id: "group_2", name: "Postres Rápidos", userId: "user_1" }
];

export const mockRecipes = [
  {
    id: "rec_1",
    title: "Cachapas de Maíz",
    ingredients: ["Maíz tierno", "Queso de mano", "Mantequilla"],
    steps: ["Desgranar el maíz", "Licuar los ingredientes", "Cocinar en budare"],
    isPublic: false,
    userId: "user_1",
    groupIds: ["group_1"] 
  },
  {
    id: "rec_2",
    title: "Arepas Asadas",
    ingredients: ["Harina P.A.N.", "Agua", "Sal"],
    steps: ["Mezclar agua y sal", "Agregar harina y amasar", "Asar por ambos lados"],
    isPublic: true, 
    userId: "user_1",
    groupIds: ["group_1", "group_2"] 
  },
  {
    id: "rec_3",
    title: "Pabellón Criollo",
    ingredients: ["Carne mechada", "Caraotas", "Arroz", "Plátano"],
    steps: ["Cocinar los componentes por separado", "Emplatar en secciones"],
    isPublic: true,
    userId: "user_2", 
    groupIds: []
  }
];