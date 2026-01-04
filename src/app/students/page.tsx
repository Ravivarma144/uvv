"use client";
import { useEffect, useState } from "react";
import {
  fetchStudents,  fetchStudentsStats
} from "@/lib/api/students";
import StudentsTable from "../../components/Dashboard/StudentsTable";

import Breadcrumb from "@/components/Breadcrumb";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents().then((data)=>{
         setStudents(data.students);
      setLoading(false);
    });
  }, []);

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

    if (loading) {
    return (
      <div className="p-10 text-gray-500 text-lg">
        Loading dashboard...
      </div>
    );
  }


  return (
    <div className="bg-gray-100 min-h-screen pt-10 mt-10 py-4 px-4 bg-slateGray">
         <h1 className="text-3xl font-bold mb-8">
        Schools List      </h1>

        <Breadcrumb links={routes} />
      <div className="grid grid-cols-1 ">
        <StudentsTable students={students} />
      </div>
    </div>
  );
}
