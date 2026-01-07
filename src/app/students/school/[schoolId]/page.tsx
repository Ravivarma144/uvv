"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchStudentsBySchool } from "@/lib/api/students";
import Loader from "@/components/Common/Loader";

import Link from "next/link";

type Student = {
  id: string;
  fullName: string;
  surName: string;
  phoneNumber?: string;
  loginNumber: string;
  gender?: string;
  rollNumber?: string;
};

export default function SchoolStudents() {
  const { schoolId } = useParams<{ schoolId: string }>();
  const [students, setStudents] = useState<Student[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!schoolId) return;

    fetchStudentsBySchool(schoolId).then((data) => {
      setStudents(data.students);
      setCount(data.count);
      setLoading(false);
    });
  }, [schoolId]);

  if (loading) {
    return <Loader text="Loading .... Student list ....." />  ;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Students List</h1>
        <p className="text-gray-600">
          Total Students: <b>{count}</b>
        </p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Hall Ticket No </th>
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
                {/* <td className="p-4 font-medium">
                  {s.surName} {s.fullName}
                </td> */}
                <td className="p-4 font-mono text-blue-600">
                  {s.rollNumber}
                </td>
                <td className="p-3 flex items-center gap-2">
  <span>{s.surName} {s.fullName}</span>

  {s.gender === "BOY" && (
    <span className="text-blue-600 text-lg" title="Boy">♂</span>
  )}

  {s.gender === "GIRL" && (
    <span className="text-pink-600 text-lg" title="Girl">♀</span>
  )}

  {s.gender === "OTHER" && (
    <span className="text-pink-600 text-lg" title="Other">⚧</span>
  )}
</td>
                <td className="p-4 font-mono text-blue-600">
                  {s.loginNumber}
                </td>
                <td className="p-4">{s.phoneNumber || "-"}</td>
                <td className="p-4">
                  {/* View Details Link - Placeholder */}
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
