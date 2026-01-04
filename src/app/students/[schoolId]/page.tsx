"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchStudentsBySchool } from "@/lib/api/students";
import Loader from "@/components/Common/Loader";

type Student = {
  id: string;
  fullName: string;
  surName: string;
  phoneNumber?: string;
  loginNumber: string;
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
              <th className="p-4 text-left">Student Name</th>
              <th className="p-4 text-left">Login ID</th>
              <th className="p-4 text-left">Phone</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, i) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{i + 1}</td>
                <td className="p-4 font-medium">
                  {s.surName} {s.fullName}
                </td>
                <td className="p-4 font-mono text-blue-600">
                  {s.loginNumber}
                </td>
                <td className="p-4">{s.phoneNumber || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
