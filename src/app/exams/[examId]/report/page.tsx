"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Router from "next/router";
import { useRouter } from "next/navigation";

type Marks = {
  telugu: number;
  hindi: number;
  english: number;
  maths: number;
  physicalScience: number;
  naturalScience: number;
  socialStudies: number;
  gk: number;
};

type ResultRow = {
  id: string;
  name: string;
  rollNumber: string | number;
  isAbsent: boolean;
  totalMarks: number;
  marks: Marks;
  rank?: number;
};

const SUBJECT_COLUMNS = [
  { key: "maths", label: "Maths" },
  { key: "physicalScience", label: "PS" },
  { key: "naturalScience", label: "NS" },
  { key: "socialStudies", label: "SS" },
  { key: "english", label: "Eng" },
  { key: "gk", label: "GK" },
  { key: "telugu", label: "Tel" },
  { key: "hindi", label: "Hin" },
] as const;

export default function ExamReportPage() {

  const router = useRouter();
  const { examId } = useParams<{ examId: string }>();

  const [results, setResults] = useState<ResultRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSubjects, setShowSubjects] = useState(true);
  const [top10Only, setTop10Only] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exams/${examId}/results`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = sortResults(data.students);
        const ranked = assignRanks(sorted);
        setResults(ranked);
        setLoading(false);
      });
  }, [examId]);

  const displayResults = useMemo(() => {
    return top10Only
      ? results.filter((r) => r.rank && r.rank <= 10)
      : results;
  }, [results, top10Only]);

  if (loading) return <p className="p-8">Loading report...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
        <h1 className="text-xl font-bold">
          Exam Report – #{examId}
        </h1>

        <div className="flex gap-2">
          <button
            onClick={() => setShowSubjects((v) => !v)}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          >
            {showSubjects ? "Hide Subjects" : "Show Subjects"}
          </button>

          <button
            onClick={() => setTop10Only((v) => !v)}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            {top10Only ? "Show All" : "Top 10"}
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={ ()=>{
            Router.push(`/exams/${examId}/school-report`);
          }}>
            School Report
          </button>

          <button className="px-4 py-2 bg-green-600 text-white rounded">
            Export Excel
          </button>

          <button className="px-4 py-2 bg-red-600 text-white rounded">
            Export PDF
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Rank</th>
              <th className="p-3">Roll No</th>
              <th className="p-3">Name</th>
              {showSubjects &&
                SUBJECT_COLUMNS.map((s) => (
                  <th key={s.key} className="p-3 text-center">
                    {s.label}
                  </th>
                ))}
              <th className="p-3 text-center">Total</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {displayResults.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-semibold">
                  {r.isAbsent ? "-" : r.rank}
                </td>

                <td className="p-3 font-mono">
                  {r.rollNumber}
                </td>

                <td className="p-3">
                  {r.name}
                </td>

                {showSubjects &&
                  SUBJECT_COLUMNS.map((s) => (
                    <td
                      key={s.key}
                      className="p-3 text-center"
                    >
                      {r.isAbsent ? "-" : r.marks[s.key]}
                    </td>
                  ))}

                <td className="p-3 text-center font-bold">
                  {r.isAbsent ? "-" : r.totalMarks}
                </td>

                <td className="p-3 text-center">
                  {r.isAbsent ? (
                    <span className="text-red-600 font-semibold">
                      ABSENT
                    </span>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      PRESENT
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================
   SORTING (YOUR EXACT RULE)
========================= */
function sortResults(data: ResultRow[]) {
  return [...data].sort((a, b) => {
    if (a.isAbsent && !b.isAbsent) return 1;
    if (!a.isAbsent && b.isAbsent) return -1;

    if (b.totalMarks !== a.totalMarks)
      return b.totalMarks - a.totalMarks;

    const priority: (keyof Marks)[] = [
      "maths",
      "physicalScience",
      "naturalScience",
      "socialStudies",
      "english",
      "gk",
      "telugu",
      "hindi",
    ];

    for (const key of priority) {
      if (b.marks[key] !== a.marks[key]) {
        return b.marks[key] - a.marks[key];
      }
    }

    return String(a.rollNumber).localeCompare(
      String(b.rollNumber),
      undefined,
      { numeric: true }
    );
  });
}

/* =========================
   RANK ASSIGNMENT (WITH TIES)
========================= */
function assignRanks(sorted: ResultRow[]) {
  let rank = 0;
  let lastScore: number | null = null;
  let skip = 0;

  return sorted.map((r, index) => {
    if (r.isAbsent) {
      return { ...r, rank: undefined };
    }

    if (lastScore === r.totalMarks) {
      skip++;
    } else {
      rank = rank + 1 + skip;
      skip = 0;
    }

    lastScore = r.totalMarks;

    return {
      ...r,
      rank,
    };
  });
}
