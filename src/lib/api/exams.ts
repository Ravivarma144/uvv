import { StudentFormData } from "@/lib/validation/student";
export async function fetchExams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/exams`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to load exams");
  return res.json();
}


export async function createExam(data: StudentFormData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/exams`,
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

export async function fetchExamId(examId:string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/exams/${examId}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to load exam information");
  return res.json();
}


