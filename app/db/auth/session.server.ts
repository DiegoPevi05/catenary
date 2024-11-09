// app/utils/session.server.ts

import { createCookieSessionStorage, redirect, Session } from "@remix-run/node";
import { Role } from "@prisma/client"; // Import Role if you are using it from Prisma's enum

// Ensure session secret is set in environment variables
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

// Define session storage with cookie configuration
const storage = createCookieSessionStorage({
  cookie: {
    name: "cat_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

// Type definitions for user session data
interface UserSessionData {
  userId: number;
  role: Role;
}

// Create a user session with userId and role, redirecting to a given path
export async function createUserSession(
  userId: number,
  role: Role,
  redirectTo: string
) {
  const session = await storage.getSession();
  session.set("userId", userId);
  session.set("role", role);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

// Retrieve the user session from the request
export async function getUserSession(request: Request): Promise<Session> {
  return storage.getSession(request.headers.get("Cookie"));
}

// Require a user to be authenticated and optionally check their role
export async function requireUser(
  request: Request,
  requiredRole?: Role
): Promise<UserSessionData> {
  const session = await getUserSession(request);
  const userId = session.get("userId") as number | undefined;
  const userRole = session.get("role") as Role | undefined;

  // Check for valid session
  if (!userId || !userRole) {
    throw redirect(`/login?redirectTo=${new URL(request.url).pathname}`);
  }

  // Optionally check if the user has the required role
  if (requiredRole && userRole !== requiredRole) {
    throw redirect("/unauthorized"); // Redirect to unauthorized page if role doesn't match
  }

  return { userId, role: userRole };
}

// Log out the user by destroying their session
export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
