"use client";
import { useEffect, useState } from "react";
import {
  fetchStudents,  fetchStudentsStats
} from "@/lib/api/students";
import StudentsTable from "../../components/Dashboard/StudentsTable";

import Breadcrumb from "@/components/Breadcrumb";
import Loader from "@/components/Common/Loader";

export default function Dashboard() {
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
     <Loader text="Loading Students list ........" />
    );
  }


  return (
    <div className="bg-gray-100 min-h-screen pt-10 mt-10  px-4 bg-slateGray">
         <h1 className="text-3xl font-bold mb-8">
        Schools List      </h1>

        <Breadcrumb links={routes} />
      <div className="grid grid-cols-1 ">
        <StudentsTable students={students} />
      </div>
    </div>
  );
}
