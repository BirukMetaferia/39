import { orderSchema } from "@/lib/orderSchema";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid JSON", fieldErrors: {} },
      { status: 400 }
    );
  }

  const result = orderSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        error: "Validation failed",
        fieldErrors: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const order = {
    id: `ord_${Date.now()}`,
    ...result.data,
    status: "received",
  };

  return Response.json(order, { status: 201 });
}
