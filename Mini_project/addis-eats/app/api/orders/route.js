import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { orderSchema } from "../../../lib/orderSchema.js";
import { createOrder } from "../../../lib/orders.js";
import { getSession } from "../../../lib/session.js";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must contain valid JSON." },
      { status: 400 }
    );
  }

  const validation = orderSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        fieldErrors: validation.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const session = await getSession();
  const result = createOrder(validation.data, session?.userId ?? null);

 
  if (!result.ok) {
    return NextResponse.json(
      {
        error: result.error,
        fieldErrors: {},
      },
      { status: result.status }
    );
  }

  revalidatePath("/");
  revalidatePath("/orders");

  return NextResponse.json({ order: result.order }, { status: 201 });
}