"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Topper = {
  studentId: string;
  rollNumber: string;
  name: string;
  totalMarks: number;
  rank: number;
};

type SchoolResult = {
  schoolId: string;
  schoolName: string;
  toppers: Topper[];
};

type ApiResponse = {
  examId: string;
  excludedOverallTop10Count: number;
  schools: SchoolResult[];
};

export default function SchoolWiseToppersPage() {
  const { examId } = useParams<{ examId: string }>();

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!examId) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/exams/${examId}/school-toppers`
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [examId]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        Loading school-wise toppers...
      </div>
    );
  }

  if (!data || data.schools.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        No school-wise toppers found
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          School-wise Toppers – Exam #{examId}
        </h1>
        <p className="text-sm text-gray-600">
          Overall Top {data.excludedOverallTop10Count} students excluded
        </p>
      </div>

      {/* SCHOOL CARDS */}
      <div className="space-y-6">
        {data.schools.map((school) => (
          <div
            key={school.schoolId}
            className="bg-white rounded-xl shadow border"
          >
            {/* SCHOOL HEADER */}
            <div className="p-4 border-b bg-gray-50 rounded-t-xl">
              <h2 className="text-lg font-semibold">
                🏫 {school.schoolName}
              </h2>
            </div>

            {/* TOPPERS TABLE */}
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Rank</th>
                    <th className="p-3 text-left">Roll No</th>
                    <th className="p-3 text-left">Student Name</th>
                    <th className="p-3 text-center">Total Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {school.toppers.map((t) => (
                    <tr
                      key={t.studentId}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-3 font-bold text-indigo-600">
                        #{t.rank}
                      </td>
                      <td className="p-3 font-mono">
                        {t.rollNumber}
                      </td>
                      <td className="p-3 font-medium">
                        {t.name}
                      </td>
                      <td className="p-3 text-center font-bold text-green-700">
                        {t.totalMarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="p-3 text-xs text-gray-500 text-right">
              Toppers include ties (same marks)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
