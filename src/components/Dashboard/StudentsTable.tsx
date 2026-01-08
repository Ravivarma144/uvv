"use client";

import Link from "next/link";
import * as XLSX from "xlsx";

type Student = {
  fullName: string;
  surName: string;
  phoneNumber?: string;
  loginNumber: string;
  gender?: "BOY" | "GIRL" | "OTHER";
  rollNumber?: string;
  school: {
    name: string;
  };
};

type Props = {
  students: Student[];
};

export default function StudentsTable({ students }: Props) {

  // 📤 Export Excel
  const exportToExcel = () => {
    const data = students.map((s, index) => ({
      "S.No": index + 1,
      "Roll Number": s.rollNumber ?? "",
      "Surname": s.surName,
      "Full Name": s.fullName,
      "Gender": s.gender ?? "",
      "School": s.school.name,
      "Phone Number": s.phoneNumber ?? "",
      "Registration ID": s.loginNumber,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "UVV_Students_List.xlsx");
  };

  return (
    <div className="bg-white rounded-xl shadow border">
      
      {/* HEADER */}
      <div className="p-5 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">All Students</h2>

        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
        >
          Export Excel
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-auto max-h-[720px]">
        <table className="w-full text-sm border-collapse">
          
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="p-3 text-left">Roll No</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">School</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Registration ID</th>
              <th className="p-3 text-left"></th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            )}

            {students.map((s, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Roll Number */}
                <td className="p-3 font-mono">
                  {s.rollNumber ?? "-"}
                </td>

                {/* Name + Gender */}
                <td className="p-3 flex items-center gap-2">
                  <span>{s.surName} {s.fullName}</span>

                  {s.gender === "BOY" && (
                    <span
                      className="text-blue-600 text-lg"
                      title="Boy"
                    >
                      ♂
                    </span>
                  )}

                  {s.gender === "GIRL" && (
                    <span
                      className="text-pink-600 text-lg"
                      title="Girl"
                    >
                      ♀
                    </span>
                  )}

                  {s.gender === "OTHER" && (
                    <span
                      className="text-purple-600 text-lg"
                      title="Other"
                    >
                      ⚧
                    </span>
                  )}
                </td>

                {/* School */}
                <td className="p-3">
                  {s.school.name}
                </td>

                {/* Phone */}
                <td className="p-3">
                  {s.phoneNumber || "-"}
                </td>

                {/* Registration */}
                <td className="p-3 font-mono">
                  {s.loginNumber}
                </td>

                {/* Action */}
                <td className="p-3">
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




// type Props = {
//   students: {
//     fullName: string;
//     surName: string;
//     phoneNumber?: string;
//     loginNumber:string;
//     gender?:string;
//     rollNumber?:string;
//     school: {
//       name: string;
//     };
//   }[];
// };
// import Link from "next/link";

// export default function StudentsTable({ students }: Props) {
//   return (
//     <div className="bg-white rounded-xl shadow">
//       <div className="p-5 border-b font-semibold">
//         All Students
//       </div>

//       <div className="overflow-auto max-h-[400px]">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100 sticky top-0">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Hall Ticket No</th>
//               <th className="p-3 text-left">School</th>
//               <th className="p-3 text-left">Phone</th>
//               <th className="p-3 text-left">Registration Id</th>
//               <th className="p-3 text-left"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((s, i) => (
//               <tr key={i} className="border-t">
//                 {/* <td className="p-3">
//                   {s.surName} {s.fullName} {s.gender && `(${s.gender})`}
//                 </td> */}
//                 <td className="p-3">{s.rollNumber}</td>
//                 <td className="p-3 flex items-center gap-2">
//   <span>{s.surName} {s.fullName}</span>

//   {s.gender === "BOY" && (
//     <span className="text-blue-600 text-lg" title="Boy">♂</span>
//   )}

//   {s.gender === "GIRL" && (
//     <span className="text-pink-600 text-lg" title="Girl">♀</span>
//   )}

//   {s.gender === "OTHER" && (
//     <span className="text-pink-600 text-lg" title="Other">⚧</span>
//   )}
// </td>
//                 <td className="p-3">{s.school.name}</td>
//                 <td className="p-3">
//                   {s.phoneNumber || "-"}
//                 </td>
//                 <td className="p-3">
//                     {s.loginNumber || "-"}
//                 </td>
//                 <td className="p-3">
//                   {/* View Details Link - Placeholder */}
//                   <Link
//                     href={`/students/admit/${s.loginNumber}`}
//                     className="text-indigo-600 hover:underline"
//                   >
//                     View Admit Card
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
