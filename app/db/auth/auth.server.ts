// app/utils/auth.server.ts

import bcrypt from "bcryptjs";
import {prisma} from "~/db/db.server";
import {User, Role} from "@prisma/client"; // Assuming Prisma generates these types

// Define types for input parameters
interface AuthInput {
  email: string;
  password: string;
}

interface RegisterInput extends AuthInput {
  role?: Role;
}

// Register a new user with a default role
export async function register({
  email,
  password,
  role = "USER",
}: RegisterInput): Promise<User> {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {email, password: passwordHash, role},
  });
  return user;
}

// Login user and return user data if credentials are valid
export async function login({email, password}: AuthInput): Promise<User | null> {
  const user = await prisma.user.findUnique({where: {email}});
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}

