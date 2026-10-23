import { randomUUID } from "node:crypto";
import { getDishById } from "./dishes.js";

// Demo storage only: data is shared within this running Node.js process.
// Replace with a database before production deployment.
const storageKey = "__addisEatsOrders";

function getStore() {
  if (!globalThis[storageKey]) {
    globalThis[storageKey] = [];
  }

  return globalThis[storageKey];
}

export function getOrders() {
  return [...getStore()].reverse();
}

export function createOrder(input, userId = null) {
  const dish = getDishById(input.dishId);

  if (!dish) {
    return {
      ok: false,
      status: 404,
      error: "Dish not found.",
    };
  }

  const order = {
    id: randomUUID(),
    dishId: dish.id,
    dishName: dish.name,
    customerName: input.customerName,
    phone: input.phone,
    quantity: input.quantity,
    unitPrice: dish.price,
    total: dish.price * input.quantity,
    userId,
    status: "PLACED",
    createdAt: new Date().toISOString(),
  };

  getStore().push(order);

  return { ok: true, order };
}

export function cancelOrderById(orderId, userId) {
  const order = getStore().find((item) => item.id === orderId);

  if (!order) {
    return { ok: false, reason: "not-found" };
  }

  if (!userId || order.userId !== userId) {
    return { ok: false, reason: "forbidden" };
  }

  if (order.status === "CANCELLED") {
    return { ok: false, reason: "already-cancelled" };
  }

  order.status = "CANCELLED";

  return { ok: true, order };
}
