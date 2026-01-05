import { StudentFormData } from "@/lib/validation/student";
export async function fetchStudents() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/students`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to load Students List");
  return res.json();
}

export async function fetchStudentsStats() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/students/counts`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to load Dashboards");
  return res.json();
}

export async function fetchStudentsBySchool(schoolId:string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/students/school/${schoolId}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to load Students in school");
  return res.json();
}

export async function fetchStudentById(studentId:string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/student/${studentId}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to load Students in school");
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

