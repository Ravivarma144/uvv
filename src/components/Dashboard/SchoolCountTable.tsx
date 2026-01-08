"use client";

import Link from "next/link";
import * as XLSX from "xlsx";

type Props = {
  data: {
    schoolName: string;
    schoolCode: string;
    studentCount: string;
    schoolId: string;
    schoolAddress?: string;
  }[];
};

export default function SchoolCountTable({ data }: Props) {
  const exportToExcel = () => {
    const worksheetData = data.map((s, index) => ({
      "S.No": index + 1,
      "School Name": s.schoolName,
      "School Code": s.schoolCode,
      "School Address": s.schoolAddress || "N/A",
      "Total Students": Number(s.studentCount),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Optional: set column widths
    worksheet["!cols"] = [
      { wch: 6 },
      { wch: 30 },
      { wch: 15 },
      { wch: 40 },
      { wch: 18 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "School Student Count");

    XLSX.writeFile(workbook, "School_Student_Count.xlsx");
  };

  return (
    <div className="bg-white rounded-xl shadow">
      {/* HEADER */}
      <div className="p-5 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">
          Schools List
        </h2>

        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white text-sm rounded-md shadow hover:bg-green-700 transition"
        >
          Export Excel
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-auto max-h-[720px]">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-left sticky top-0">
            <tr>
              <th className="p-3">School</th>
              <th className="p-3">Address</th>
              <th className="p-3">Code</th>
              <th className="p-3">Students</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s) => (
              <tr
                key={s.schoolId}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3 font-medium">
                  <Link
                    href={`/students/school/${s.schoolId}`}
                    className="text-indigo-600 hover:underline"
                  >
                    {s.schoolName}
                  </Link>
                </td>

                <td className="p-3 text-gray-600">
                  <Link href={`/students/school/${s.schoolId}`}>
                    {s.schoolAddress || "N/A"}
                  </Link>
                </td>

                <td className="p-3 text-gray-600">
                  <Link href={`/students/school/${s.schoolId}`}>
                    {s.schoolCode}
                  </Link>
                </td>

                <td className="p-3 font-semibold">
                  <Link href={`/students/school/${s.schoolId}`}>
                    {Number(s.studentCount)}
                  </Link>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
