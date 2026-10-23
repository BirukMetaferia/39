import Link from "next/link";
import { getOrders } from "../../lib/orders.js";
import { cancelOrder } from "../checkout/actions.js";

export const instant = false;


export const metadata = {
  title: "Orders | Addis Eats",
};

export default async function OrdersPage({ searchParams }) {
  const query = await searchParams;
  const orders = getOrders();

  const messages = {
    unauthorized: "Please sign in before cancelling an order.",
    forbidden: "You can only cancel an order that belongs to your account.",
    "not-found": "That order could not be found.",
    "already-cancelled": "That order has already been cancelled.",
  };

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 24 }}>
      <p><Link href="/">Back to menu</Link></p>
      <h1>Recent orders</h1>

      {query.cancelled && <p role="status">Order cancelled.</p>}
      {query.error && (
        <p role="alert">
          {messages[query.error] || "The request could not be completed."}
        </p>
      )}

      {orders.length === 0 ? (
        <p>
          No orders yet. <Link href="/checkout">Place your first order</Link>.
        </p>
      ) : (
        <ul style={{ display: "grid", gap: 16, paddingLeft: 20 }}>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>{order.dishName}</strong> - Quantity: {order.quantity} - Unit price: {order.unitPrice} ETB - Total: {order.total} ETB
              {order.unitPrice} ETB = {order.total} ETB
              <p>
                Customer: {order.customerName} | Phone: {order.phone}
              </p>
              <p>
                Status: {order.status} | Order ID: <code>{order.id}</code>
              </p>
              {order.status === "PLACED" && (
                <form action={cancelOrder}>
                  <input type="hidden" name="orderId" value={order.id} />
                  <button type="submit">Cancel order</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}

      <p style={{ marginTop: 24 }}>
        <Link href="/checkout">Place another order</Link>
      </p>
    </main>
  );
}
