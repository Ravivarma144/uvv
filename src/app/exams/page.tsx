"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {fetchExams , createExam 
} from "@/lib/api/exams";

type Exam = {
  id: string;
  name: string;
  totalMarks: number;
  examDate: string;
};

export default function ExamsListPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams()
      .then((data) => {
        setExams(data);
      })
      .catch(() => {
        // Handle error appropriately
      })
      .finally(() => {
        setLoading(false);
      });   
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading exams...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Examinations</h1>
          <p className="text-gray-600">
            Manage exams, marks & reports
          </p>
        </div>

        <Link
          href="/exams/create"
          className="px-5 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700"
        >
          + Create Exam
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Exam Name</th>
              <th className="p-4 text-left">Exam Date</th>
              <th className="p-4 text-left">Total Marks</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {exams.map((exam) => (
              <tr
                key={exam.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4 font-medium">
                  {exam.name}
                </td>
                <td className="p-4">
                  {new Date(exam.examDate).toLocaleDateString()}
                </td>
                <td className="p-4">
                  {exam.totalMarks}
                </td>
                <td className="p-4 flex gap-4">
                    <Link
                    href={`/exams/${exam.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/exams/${exam.id}/marks`}
                    className="text-blue-600 hover:underline"
                  >
                    Enter Marks
                  </Link>

                  <Link
                    href={`/exams/${exam.id}/report`}
                    className="text-green-600 hover:underline"
                  >
                    View Report
                  </Link>
                </td>
              </tr>
            ))}

            {exams.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500"
                >
                  No exams created yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
