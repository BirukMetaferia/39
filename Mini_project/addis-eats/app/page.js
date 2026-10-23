import Link from "next/link";
import { dishes } from "../lib/dishes.js";

export const metadata = {
  title: "Addis Eats | Ethiopian Food",
  description: "Explore the Addis Eats menu and place an order.",
};

export default function Home() {
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 24 }}>
      <h1>Addis Eats</h1>
      <p>Discover Ethiopian favourites and order your meal.</p>

      <section aria-label="Menu" style={{ display: "grid", gap: 16 }}>
        {dishes.map((dish) => (
          <article
            key={dish.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <h2>{dish.name}</h2>
            <p>{dish.description}</p>
            <p><strong>{dish.price} ETB</strong></p>
            <Link href={`/api/dishes/${dish.id}`}>View dish API data</Link>
          </article>
        ))}
      </section>

      <p style={{ marginTop: 24 }}>
        <Link href="/checkout">Place an order</Link>
        {" · "}
        <Link href="/orders">Recent orders</Link>
      </p>
    </main>
  );
}