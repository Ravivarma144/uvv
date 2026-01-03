"use client";
import { useEffect, useState } from "react";
import {
  fetchStudents, fetchStudentsBySchool, fetchStudentsStats
} from "@/lib/api/students";
import StatCard from "@/components/Dashboard/StatCard";
import SchoolCountTable from "../../components/Dashboard/SchoolCountTable";
import StudentsTable from "../../components/Dashboard/StudentsTable";

type SchoolCount = {
  schoolId: string;
  schoolName: string;
  schoolCode: string;
  studentCount: string;
};

export default function Dashboard() {
//   const [total, setTotal] = useState(0);
//   const [schoolCounts, setSchoolCounts] = useState([]);
  const [students, setStudents] = useState([]);

  const [totalStudents, setTotalStudents] = useState(0);
  const [schoolCounts, setSchoolCounts] = useState<SchoolCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentsStats().then((data)=>{
         setTotalStudents(data.total_count);
      setSchoolCounts(data.school_wise_counts);
      setLoading(false);
    });
    fetchStudents().then((data)=>{
         setStudents(data.students);
    });
  }, []);

    if (loading) {
    return (
      <div className="p-10 text-gray-500 text-lg">
        Loading dashboard...
      </div>
    );
  }


  return (
    <div className="bg-gray-100 min-h-screen p-8 mt-5 bg-slateGray">
      <h1 className="text-3xl font-bold mb-8">
        Student Enrollment Dashboard
      </h1>

        {/* TOP STATS */}
      <div className="
    grid
    grid-cols-2
    md:grid-cols-4
    lg:grid-cols-8
    xl:grid-cols-8
    gap-6
    mb-10">
        <>
        {/* SUMMARY STATS */}
  <StatCard
    title="Total Students"
    value={totalStudents}
    accent="blue"
    // className="col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-3"
  />

  <StatCard
    title="Total Schools"
    value={schoolCounts.length}
    accent="purple"
    // className="col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-3"
  />

  <StatCard
    title="Active Enrollments"
    value={totalStudents}
    accent="green"
    // className="col-span-2 md:col-span-4 lg:col-span-4 xl:col-span-3"
  />

  {/* SCHOOL-WISE STATS */}
  {schoolCounts.map((s) => (
    <StatCard
      key={s.schoolId}
      title={`${s.schoolCode}`}
      value={Number(s.studentCount)}
      accent={Number(s.studentCount) === 0 ? "gray" : "blue"}
    //   className="col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2"
    />
  ))}
        </>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SchoolCountTable data={schoolCounts} />
        <StudentsTable students={students} />
      </div>
    </div>
  );
}
