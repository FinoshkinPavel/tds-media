import { z } from "zod";
export const editContactSchema = z.object({
	firstName: z.string().trim().nonempty("Required"),
	lastName: z.string().trim().nonempty("Required"),
	phone: z.string().trim().nonempty("Required"),
	email: z
		.string()
		.trim()
		.nonempty("Required")
		.email("Email must contain A-Z, a-z , @"),
	gender: z.string().nonempty("Required"),
});
