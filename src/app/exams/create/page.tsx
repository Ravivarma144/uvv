"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateExamPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const TOTAL_MARKS = 120;

  const handleSubmit = async () => {
    setError(null);

    // 🔐 Basic validation
    if (!name.trim()) {
      setError("Exam name is required");
      return;
    }

    if (!examDate) {
      setError("Exam date is required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exams`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          examDate,
          totalMarks: TOTAL_MARKS,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create exam");
      }

      const exam = await res.json();

      // ✅ Redirect to exam dashboard
      router.push(`/exams/${exam.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-6">Create New Exam</h1>

        {/* FORM */}
        <div className="bg-white p-6 rounded-xl shadow space-y-5">
          {/* ERROR */}
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded border border-red-200">
              {error}
            </div>
          )}

          {/* EXAM NAME */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Exam Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="UVV Talent Test – 2026"
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* EXAM DATE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Exam Date
            </label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* TOTAL MARKS */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Total Marks
            </label>
            <input
              type="number"
              value={TOTAL_MARKS}
              disabled
              className="w-full border p-3 rounded bg-gray-100 text-gray-600"
            />
            <p className="text-xs text-gray-500 mt-1">
              Fixed (120 MCQs × 1 mark)
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => router.back()}
              className="px-5 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-6 py-2 text-white rounded ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Creating..." : "Create Exam"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
