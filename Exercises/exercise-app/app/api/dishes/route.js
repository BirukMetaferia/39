
const dishes = [
  {
    id: "1",
    name: "Doro Wat",
    description: "Ethiopian spicy chicken stew served with injera.",
    price: 450,
    category: "Ethiopian",
    available: true,
  },
  {
    id: "2",
    name: "Tibs",
    description: "Sautéed beef with onions and Ethiopian spices.",
    price: 380,
    category: "Ethiopian",
    available: true,
  },
  {
    id: "3",
    name: "Shiro",
    description: "Ethiopian chickpea stew served with injera.",
    price: 180,
    category: "Vegetarian",
    available: true,
  },
  {
    id: "4",
    name: "Burger",
    description: "Beef burger with fresh vegetables.",
    price: 320,
    category: "Fast Food",
    available: true,
  },
];

export async function GET() {
  return Response.json(dishes);
}
