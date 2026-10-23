import Link from "next/link";
import { dishes } from "../../lib/dishes.js";
import CheckoutForm from "./CheckoutForm.js";

export const metadata = {
  title: "Checkout | Addis Eats",
};

export default function CheckoutPage() {
  return (
    <main style={{ maxWidth: 760, margin: "40px auto", padding: 24 }}>
      <p><Link href="/">← Back to menu</Link></p>
      <h1>Checkout</h1>
      <p>Choose a dish and enter your contact details to place an order.</p>
      <CheckoutForm dishes={dishes} />
      <p style={{ marginTop: 24 }}>
        <Link href="/orders">View recent orders</Link>
      </p>
    </main>
  );
}