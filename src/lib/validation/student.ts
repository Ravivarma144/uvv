// lib/validation/student.ts
import { z } from "zod";

export const studentSchema = z.object({
  fullName: z.string().min(1, "First name is required"),
  surName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phoneNumber: z.string().optional(),
  schoolId: z.string().min(1, "Please select a school"),
});

export type StudentFormData = z.infer<typeof studentSchema>;

