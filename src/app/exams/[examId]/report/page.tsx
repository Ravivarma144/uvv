"use client";

import { useParams } from "next/navigation";

export default function ExamReportPage() {
  const { examId } = useParams<{ examId: string }>();

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">
        Exam Report – #{examId}
      </h1>

      <div className="flex justify-end mb-4 gap-3">
        <button className="px-4 py-2 bg-green-600 text-white rounded">
          Export Excel
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded">
          Export PDF
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Rank</th>
              <th className="p-3">Roll No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {/* sorted results */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
