"use client";
import { useEffect, useState } from "react";
import {
  fetchStudents, fetchStudentsBySchool, fetchStudentsStats
} from "@/lib/api/students";
import StatCard from "@/components/Dashboard/StatCard";
import SchoolCountTable from "../../components/Dashboard/SchoolCountTable";
import StudentsTable from "../../components/Dashboard/StudentsTable";

import Loader from "@/components/Common/Loader";

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
     <Loader text="Loading dashboard ......" />
    );
  }


  return (
    <div className="bg-gray-100 min-h-screen pt-10 px-4 bg-slateGray">
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
  {/* <StatCard
    title="Total Students"
    value={totalStudents}
    accent="blue"
    // className="col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-3"
  /> */}
<StatCard
  title="Total Students"
  value={totalStudents}
  accent="blue"
  bgImage="/images/dashboard/student.svg"
  tooltip="Total enrolled students"
  href="/students"
  />

  <StatCard

  bgImage="/images/dashboard/book.svg"
  title="Total Schools"
  value={schoolCounts.length}
  accent="purple"
  tooltip="Total enrolled Schools"
  href="/schools"
    // className="col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-3"
  />

  <StatCard
    value={totalStudents}
    accent="green"
    // className="col-span-2 md:col-span-4 lg:col-span-4 xl:col-span-3"


  bgImage="/images/dashboard/enrolled.svg"
  title="Active Enrollments"
  tooltip="Total enrolled Students"
  href="/students"
  />

  {/* SCHOOL-WISE STATS */}
  {schoolCounts.map((s) => (
    <StatCard
      key={s.schoolId}
      title={`${s.schoolCode}`}
      value={Number(s.studentCount)}
      accent={Number(s.studentCount) >=40 ? "green": Number(s.studentCount) >=25 ? "purple": Number(s.studentCount) === 0 ? "gray" : "blue"}
      href={`/students/${s.schoolId}`}
    //   className="col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2"

  bgImage={encodeURI(`https://uvv-api.vercel.app/api/name-image?text=${s.schoolName}`)}
  tooltip={s.schoolName}
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
