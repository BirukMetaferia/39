"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/orderSchema";
import { getSession } from "@/lib/session";
import {
  createOrder,
  getOrderById,
  updateOrder,
} from "@/lib/orders";

export async function placeOrder(previousState, formData) {
  const result = orderSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    dishId: formData.get("dishId"),
    quantity: formData.get("quantity"),
  });

  if (!result.success) {
    return {
      success: false,
      message: "Please correct the errors below.",
      fieldErrors: result.error.flatten().fieldErrors,
      orderId: null,
    };
  }

  const session = await getSession();

  const order = createOrder({
    id: `ord_${Date.now()}`,
    ...result.data,
    status: "received",
    ownerUserId: session?.userId ?? null,
  });

  revalidatePath("/checkout");

  return {
    success: true,
    message: "Order submitted successfully!",
    fieldErrors: {},
    orderId: order.id,
  };
}

export async function cancelOrder(formData) {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "You must be signed in to cancel an order.",
    };
  }

  const orderId = formData.get("orderId");

  if (typeof orderId !== "string" || !orderId.trim()) {
    return {
      success: false,
      message: "A valid order ID is required.",
    };
  }

  const order = getOrderById(orderId);

  if (!order) {
    return {
      success: false,
      message: "Order not found.",
    };
  }

  // Authorization: users may cancel only their own orders.
  if (order.ownerUserId !== session.userId) {
    return {
      success: false,
      message: "You are not allowed to cancel this order.",
    };
  }

  if (order.status !== "received") {
    return {
      success: false,
      message: "Only received orders can be cancelled.",
    };
  }

  updateOrder(orderId, { status: "cancelled" });
  revalidatePath("/checkout");

  return {
    success: true,
    message: "Order cancelled successfully.",
  };
}
