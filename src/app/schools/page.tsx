"use client";
import { useEffect, useState } from "react";
import { fetchStudentsStats
} from "@/lib/api/students";
import SchoolCountTable from "../../components/Dashboard/SchoolCountTable";
import Breadcrumb from "@/components/Breadcrumb";


type SchoolCount = {
  schoolId: string;
  schoolName: string;
  schoolCode: string;
  studentCount: string;
};

export default function Dashboard() {
  const [schoolCounts, setSchoolCounts] = useState<SchoolCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentsStats().then((data)=>{
      setSchoolCounts(data.school_wise_counts);
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
        text:"Schools"
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
    <div className="bg-gray-100 min-h-screen pt-10 px-4 py-4 mt-4 bg-slateGray">
      <h1 className="text-3xl font-bold mb-8">
        Schools List      </h1>

        <Breadcrumb links={routes} />

      {/* Tables */}
      <div className="grid grid-cols-1 ">
        <SchoolCountTable data={schoolCounts} />
      </div>
    </div>
  );
}
