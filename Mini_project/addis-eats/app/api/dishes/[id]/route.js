
import { NextResponse } from "next/server";
import { getDishById } from "../../../../lib/dishes.js";

export async function GET(_request, { params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    return NextResponse.json(
      {
        error: "Dish not found.",
        fieldErrors: {},
      },
      { status: 404 }
    );
  }

  return NextResponse.json({ dish });
}
