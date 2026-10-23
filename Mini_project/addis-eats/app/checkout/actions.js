"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { orderSchema } from "../../lib/orderSchema.js";
import { createOrder, cancelOrderById } from "../../lib/orders.js";
import { getSession } from "../../lib/session.js";

export async function placeOrder(_previousState, formData) {
  const input = {
    dishId: formData.get("dishId"),
    customerName: formData.get("customerName"),
    phone: formData.get("phone"),
    quantity: formData.get("quantity"),
  };

  const validation = orderSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: validation.error.flatten().fieldErrors,
    };
  }

  const session = await getSession();
  const result = createOrder(validation.data, session?.userId ?? null);

  if (!result.ok) {
    return {
      success: false,
      message: result.error,
      fieldErrors: {},
    };
  }

  revalidatePath("/");
  revalidatePath("/orders");

  return {
    success: true,
    message: `Order placed successfully. Order ID: ${result.order.id}`,
    fieldErrors: {},
  };
}

export async function cancelOrder(formData) {
  const orderId = formData.get("orderId");

  if (typeof orderId !== "string" || !orderId) {
    redirect("/orders?error=not-found");
  }

  const session = await getSession();

  if (!session) {
    redirect("/orders?error=unauthorized");
  }

  const result = cancelOrderById(orderId, session.userId);

  if (!result.ok) {
    redirect(`/orders?error=${result.reason}`);
  }

  revalidatePath("/orders");
  revalidatePath("/");
  redirect("/orders?cancelled=1");
}