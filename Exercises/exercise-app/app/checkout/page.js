"use client";

import { useActionState } from "react";
import { placeOrder } from "./actions";

const initialState = {
  success: false,
  message: "",
  fieldErrors: {},
  orderId: null,
};

export default function CheckoutPage() {
  const [state, formAction, pending] = useActionState(
    placeOrder,
    initialState
  );

  return (
    <main style={{ maxWidth: 560, margin: "40px auto", padding: 24 }}>
      <h1>Checkout</h1>
      <p>Complete the form to place your Addis Eats order.</p>

      <form action={formAction}>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="name">Customer name</label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            style={{ display: "block", width: "100%", padding: 10 }}
          />
          {state.fieldErrors?.name?.map((error, index) => (
            <p key={index} style={{ color: "red" }}>{error}</p>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            name="phone"
            placeholder="0912345678"
            required
            style={{ display: "block", width: "100%", padding: 10 }}
          />
          {state.fieldErrors?.phone?.map((error, index) => (
            <p key={index} style={{ color: "red" }}>{error}</p>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="dishId">Dish</label>
          <select
            id="dishId"
            name="dishId"
            defaultValue="1"
            style={{ display: "block", width: "100%", padding: 10 }}
          >
            <option value="1">Doro Wat — 450 ETB</option>
            <option value="2">Tibs — 380 ETB</option>
            <option value="3">Shiro — 180 ETB</option>
            <option value="4">Burger — 320 ETB</option>
          </select>
          {state.fieldErrors?.dishId?.map((error, index) => (
            <p key={index} style={{ color: "red" }}>{error}</p>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            defaultValue="1"
            required
            style={{ display: "block", width: "100%", padding: 10 }}
          />
          {state.fieldErrors?.quantity?.map((error, index) => (
            <p key={index} style={{ color: "red" }}>{error}</p>
          ))}
        </div>

        <button type="submit" disabled={pending}>
          {pending ? "Submitting..." : "Place order"}
        </button>
      </form>

      {state.message && (
        <p role={state.success ? "status" : "alert"}>
          {state.message}
          {state.orderId ? ` Order ID: ${state.orderId}` : ""}
        </p>
      )}
    </main>
  );
}
