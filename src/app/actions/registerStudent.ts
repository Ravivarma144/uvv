// app/actions/registerStudent.ts
"use server";

import { studentSchema } from "@/lib/validation/student";

export async function registerStudent(data: unknown) {
  const parsed = studentSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid form data");
  }

  console.log("✅ Student Registered:", parsed.data);

  // Later:
  // await prisma.student.create({ data: parsed.data });
}
