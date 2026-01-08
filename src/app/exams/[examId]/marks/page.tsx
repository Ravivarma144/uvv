"use client";

import { useParams } from "next/navigation";

export default function EnterMarksPage() {
  const { examId } = useParams<{ examId: string }>();

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">
        Enter Marks – Exam #{examId}
      </h1>

      <div className="bg-white rounded-xl shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Roll No</th>
              <th className="p-3">Student</th>
              <th className="p-3">Maths</th>
              <th className="p-3">Physics</th>
              <th className="p-3">English</th>
              <th className="p-3">Absent</th>
            </tr>
          </thead>
          <tbody>
            {/* rows from API */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
