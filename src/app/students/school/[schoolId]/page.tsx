"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as XLSX from "xlsx";

import { fetchStudentsBySchool } from "@/lib/api/students";
import Loader from "@/components/Common/Loader";

import Breadcrumb from "@/components/Breadcrumb";

type Student = {
  id: string;
  fullName: string;
  surName: string;
  phoneNumber?: string;
  loginNumber: string;
  gender?: "BOY" | "GIRL" | "OTHER";
  rollNumber?: string;
};

export default function SchoolStudents() {
  const { schoolId } = useParams<{ schoolId: string }>();

  const [students, setStudents] = useState<Student[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [schoolInfo, setSchoolInfo] = useState<any>({});

  const routes=[
    {
        href:"/dashboard",
        text:"Dashboard"
    },
    {
        href:"",
        text:"Students"
    }
  ]

  useEffect(() => {
    if (!schoolId) return;

    fetchStudentsBySchool(schoolId).then((data) => {
      setStudents(data.students);
      setSchoolInfo({
        schoolId: data.schoolId,
        id: data.id,
        code: data.code,
        name: data.name,
        address: data.address,
      });
      setCount(data.count);
      setLoading(false);
    });
  }, [schoolId]);

  // 📤 EXPORT TO EXCEL
  const exportToExcel = () => {
    const rows = students.map((s, index) => ({
      "S.No": index + 1,
      "Roll Number": s.rollNumber ?? "",
      "Surname": s.surName,
      "Full Name": s.fullName,
      "Gender": s.gender ?? "",
      "Phone Number": s.phoneNumber ?? "",
      "Registration ID": s.loginNumber,
    }));

    const worksheet = XLSX.utils.json_to_sheet([]);

    // 🔹 Add school info at top
    XLSX.utils.sheet_add_aoa(worksheet, [
      ["School Name", schoolInfo.name],
      ["School Code", schoolInfo.code],
      ["School Address", schoolInfo.address],
      ["Total Students", count],
      [],
    ]);

    // 🔹 Add student table
    XLSX.utils.sheet_add_json(worksheet, rows, {
      origin: "A6",
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(
      workbook,
      `${schoolInfo.code || "school"}_students.xlsx`
    );
  };

  if (loading) {
    return <Loader text="Loading .... Student list ....." />;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">

      {/* PAGE HEADER */}
<div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

    {/* LEFT : SCHOOL INFO */}
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Students List
        <span className="text-gray-500 font-medium">
          {" "}– {schoolInfo.name}
        </span>
      </h1>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-700">
        <p>
          <span className="font-semibold">School Code:</span>{" "}
          {schoolInfo.code}
        </p>
        <p>
          <span className="font-semibold">Total Students:</span>{" "}
          {count}
        </p>
        <p className="sm:col-span-2">
          <span className="font-semibold">Address:</span>{" "}
          {schoolInfo.address}
        </p>
      </div>
    </div>

    {/* RIGHT : ACTIONS */}
    <div className="flex items-center gap-3">
      <button
        onClick={exportToExcel}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
      >
        📄 Export Excel
      </button>
    </div>
  </div>
</div>

{/* BREADCRUMB */}
<div className="mb-4">
  <Breadcrumb links={routes} />
</div>


      {/* TABLE */}
      <div className="overflow-auto shadow max-h-[720px] bg-white rounded-xl">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Roll No</th>
              <th className="p-4 text-left">Student Name</th>
              <th className="p-4 text-left">Registration ID</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left"></th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, i) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{i + 1}</td>

                <td className="p-4 font-mono text-blue-600">
                  {s.rollNumber || "-"}
                </td>

                <td className="p-3 flex items-center gap-2">
                  <span>{s.surName} {s.fullName}</span>

                  {s.gender === "BOY" && (
                    <span className="text-blue-600 text-lg">♂</span>
                  )}
                  {s.gender === "GIRL" && (
                    <span className="text-pink-600 text-lg">♀</span>
                  )}
                  {s.gender === "OTHER" && (
                    <span className="text-purple-600 text-lg">⚧</span>
                  )}
                </td>

                <td className="p-4 font-mono">
                  {s.loginNumber}
                </td>

                <td className="p-4">
                  {s.phoneNumber || "-"}
                </td>

                <td className="p-4">
                  <Link
                    href={`/students/admit/${s.loginNumber}`}
                    className="text-indigo-600 hover:underline"
                  >
                    View Admit Card
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
