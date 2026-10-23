import "server-only";

const storeKey = "__addisEatsOrders";
const orders = globalThis[storeKey] ??= new Map();

export function createOrder(order) {
  orders.set(order.id, order);
  return order;
}

export function getOrderById(orderId) {
  return orders.get(orderId) ?? null;
}

export function updateOrder(orderId, updates) {
  const order = orders.get(orderId);
  if (!order) return null;

  const updatedOrder = { ...order, ...updates };
  orders.set(orderId, updatedOrder);
  return updatedOrder;
}
