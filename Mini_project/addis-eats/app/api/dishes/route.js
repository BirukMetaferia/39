import { NextResponse } from "next/server";
import { dishes } from "../../../lib/dishes.js";

export function GET() {
  return NextResponse.json({ dishes });
}
