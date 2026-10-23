export const dishes = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    description: "Ethiopian chicken stew served with injera.",
    price: 450,
  },
  {
    id: "tibs",
    name: "Beef Tibs",
    description: "Sautéed beef with onions and Ethiopian spices.",
    price: 380,
  },
  {
    id: "shiro",
    name: "Shiro",
    description: "Traditional chickpea stew served with injera.",
    price: 220,
  },
];

export function getDishById(id) {
  return dishes.find((dish) => dish.id === id);
}
