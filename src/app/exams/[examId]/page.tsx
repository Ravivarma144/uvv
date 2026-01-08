"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { fetchExamId } from "@/lib/api/exams";


type Exam = {
  id: string;
  name: string;
  totalMarks: number;
  examDate: string;
};

export default function ExamDashboardPage() {
  const { examId } = useParams<{ examId: string }>();

    const [exam, setExamData] = useState<Exam>({} as Exam);
    const [loading, setLoading] = useState(true);

    const examData ={
    totalMarks: 120,
    totalStudents: 411,
    attended: 389,
    absent: 22,
    };


useEffect(() => {
    fetchExamId(examId)
      .then((data) => {
        setExamData(data);
      })
      .catch(() => {
        // Handle error appropriately
      })
      .finally(() => {
        setLoading(false);
      });   
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{exam.name}</h1>
        <p className="text-gray-600">
          Exam ID: <span className="font-mono">{examId}</span>
        </p>
        <p className="text-gray-600">
          Exam Date: <b>{exam.examDate}</b>
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Marks" value={examData.totalMarks} />
        <StatCard label="Total Students" value={examData.totalStudents} />
        <StatCard label="Attended" value={examData.attended} />
        <StatCard label="Absent" value={examData.absent} />
      </div>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard
          title="Enter / Update Marks"
          description="Add subject-wise marks for students"
          href={`/exams/${examId}/marks`}
          color="indigo"
        />

        <ActionCard
          title="View Exam Report"
          description="Ranking, tie-break & performance"
          href={`/exams/${examId}/report`}
          color="green"
        />

        <ActionCard
          title="Absent Students"
          description="Students who did not attend the exam"
          href={`/exams/${examId}/absent`}
          color="red"
        />
      </div>
    </div>
  );
}

/* -------------------- COMPONENTS -------------------- */

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 text-center">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function ActionCard({
  title,
  description,
  href,
  color,
}: {
  title: string;
  description: string;
  href: string;
  color: "indigo" | "green" | "red";
}) {
  const colorMap = {
    indigo: "bg-indigo-600 hover:bg-indigo-700",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>

      <Link
        href={href}
        className={`mt-5 text-center text-white py-2 rounded ${colorMap[color]}`}
      >
        Open
      </Link>
    </div>
  );
}
