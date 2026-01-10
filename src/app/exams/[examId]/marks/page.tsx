"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Student = {
  id: string;
  surName: string;
  fullName: string;
  rollNumber: string;
};

type Subject = {
  key: string;
  label: string;
  max: number;
};

const subjects: Subject[] = [
  { key: "telugu", label: "Telugu", max: 20 },
  { key: "hindi", label: "Hindi", max: 10 },
  { key: "english", label: "English", max: 20 },
  { key: "maths", label: "Maths", max: 20 },
  { key: "physicalScience", label: "Physical Science", max: 10 },
  { key: "naturalScience", label: "Natural Science", max: 10 },
  { key: "socialStudies", label: "Social Studies", max: 20 },
  { key: "gk", label: "GK & CA", max: 10 },
];

export default function AddExamMarksPage() {
  const { examId } = useParams<{ examId: string }>();

  const [students, setStudents] = useState<Student[]>([]);
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState<"PRESENT" | "ABSENT">("PRESENT");
  const [marks, setMarks] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // Load students
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students`)
      .then(res => res.json())
      .then(data => {
        setStudents(data.students);
        setLoading(false);
      });
  }, [examId]);

  // Reset marks if absent
  useEffect(() => {
    if (status === "ABSENT") {
      setMarks({});
      setErrors({});
    }
  }, [status]);

  // Validate marks
  const validateMarks = () => {
    const newErrors: Record<string, string> = {};
    let total = 0;

    for (const s of subjects) {
      const value = marks[s.key] ?? 0;

      if (value < 0) {
        newErrors[s.key] = "Marks cannot be negative";
      } else if (value > s.max) {
        newErrors[s.key] = `Max allowed is ${s.max}`;
      }

      total += value;
    }

    if (total > 120) {
      newErrors.total = "Total marks cannot exceed 120";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!studentId) {
      alert("Please select a student");
      return;
    }

    if (status === "PRESENT" && !validateMarks()) {
      return;
    }

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/exams/${examId}/marks-entry`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          status,
          marks: status === "ABSENT" ? {} : marks,
        }),
      }
    );

    alert("Marks saved successfully");

    setMarks({});
    setErrors({});
    setStudentId("");
    setStatus("PRESENT");
  };

  const totalMarks = subjects.reduce(
    (sum, s) => sum + (marks[s.key] ?? 0),
    0
  );

  if (loading) return <p className="p-8">Loading students...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Add Marks – Exam ID: <span className="font-mono">{examId}</span>
      </h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-5">
        {/* STUDENT */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Select Student
          </label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full border p-3 rounded"
          >
            <option value="">-- Select Student --</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.rollNumber} - {s.surName} {s.fullName}
              </option>
            ))}
          </select>
        </div>

        {studentId && (
          <>
            {/* ATTENDANCE */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Attendance
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="border p-2 rounded"
              >
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
              </select>
            </div>

            {/* MARKS */}
            {status === "PRESENT" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subjects.map((s) => (
                    <div key={s.key}>
                      <label className="text-sm font-medium">
                        {s.label} ({s.max})
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={s.max}
                        className={`w-full border p-2 rounded ${
                          errors[s.key] ? "border-red-500" : ""
                        }`}
                        value={marks[s.key] ?? ""}
                        onChange={(e) =>
                          setMarks({
                            ...marks,
                            [s.key]: Number(e.target.value),
                          })
                        }
                      />
                      {errors[s.key] && (
                        <p className="text-red-600 text-xs">
                          {errors[s.key]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* TOTAL */}
                <div className="text-right text-sm font-semibold">
                  Total: {totalMarks} / 120
                  {errors.total && (
                    <p className="text-red-600 text-xs">{errors.total}</p>
                  )}
                </div>
              </>
            )}

            {/* SUBMIT */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save Marks
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
