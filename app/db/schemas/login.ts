import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "auth.signin.validations.email_invalid" }),
  password: z.string()
    .min(8, { message: 'auth.signin.validations.password_length' })
    .regex(/[a-zA-Z]/, { message: 'auth.signin.validations.password_letter' })
    .regex(/[0-9]/, { message: 'auth.signin.validations.password_number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'auth.signin.validations.password_special' })
});

export default loginSchema;
