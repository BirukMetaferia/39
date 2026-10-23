import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getSession() {
  const secret = process.env.SESSION_SECRET;

  // Fail closed if the application has not been configured with a secret.
  if (!secret || secret.length < 32) {
    return null;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("addis-eats-session")?.value;

  if (!token) {
    return null;
  }

  try {
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key);

    if (typeof payload.sub !== "string" || !payload.sub) {
      return null;
    }

    return { userId: payload.sub };
  } catch {
    return null;
  }
}
