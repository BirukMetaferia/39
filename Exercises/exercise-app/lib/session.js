import "server-only";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getSession() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be configured with at least 32 characters.");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    const secretKey = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, secretKey);

    if (typeof payload.userId !== "string" || !payload.userId) {
      return null;
    }

    return { userId: payload.userId };
  } catch {
    return null;
  }
}
