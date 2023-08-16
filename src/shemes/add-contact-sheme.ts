import { z } from "zod";

export const addContactSheme = z.object({
	firstName: z
		.string()
		.trim()
		.nonempty("Enter first name")
		.min(2, "Min number of characters 2")
		.max(30, "Max number of characters 30"),
	lastName: z
		.string()
		.trim()
		.nonempty("Enter last name")
		.min(2, "Min number of characters 2")
		.max(30, "Max number of characters 30"),
	email: z
		.string()
		.trim()
		.nonempty("Enter email")
		.email("Email must contain A-Z, a-z , @"),
	phone: z.string().trim().min(6, "Min number of characters 6"),
	gender: z.string(),
});
