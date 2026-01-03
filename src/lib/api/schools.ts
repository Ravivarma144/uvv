import { StudentFormData } from "@/lib/validation/student";
export async function fetchSchools() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/schools`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to load schools");
  return res.json();
}


export async function submitStudent(data: StudentFormData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/students/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
}

