"use client";

import { useActionState } from "react";
import { placeOrder } from "./actions.js";

const initialState = {
  success: false,
  message: "",
  fieldErrors: {},
};

function FieldError({ errors }) {
  if (!errors?.length) return null;

  return (
    <p role="alert" style={{ color: "crimson", marginTop: 4 }}>
      {errors.join(" ")}
    </p>
  );
}

export default function CheckoutForm({ dishes }) {
  const [state, formAction, pending] = useActionState(
    placeOrder,
    initialState
  );

  return (
    <form
      action={formAction}
      style={{ display: "grid", gap: 16, maxWidth: 480 }}
    >
      <label>
        Dish
        <select name="dishId" required defaultValue="">
          <option value="" disabled>Select a dish</option>
          {dishes.map((dish) => (
            <option key={dish.id} value={dish.id}>
              {dish.name} — {dish.price} ETB
            </option>
          ))}
        </select>
        <FieldError errors={state.fieldErrors?.dishId} />
      </label>

      <label>
        Your name
        <input name="customerName" autoComplete="name" required />
        <FieldError errors={state.fieldErrors?.customerName} />
      </label>

      <label>
        Phone number
        <input name="phone" type="tel" autoComplete="tel" required />
        <FieldError errors={state.fieldErrors?.phone} />
      </label>

      <label>
        Quantity
        <input
          name="quantity"
          type="number"
          min="1"
          max="20"
          defaultValue="1"
          required
        />
        <FieldError errors={state.fieldErrors?.quantity} />
      </label>

      {state.message && (
        <p role={state.success ? "status" : "alert"}>
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending}>
        {pending ? "Placing order..." : "Place order"}
      </button>
    </form>
  );
}