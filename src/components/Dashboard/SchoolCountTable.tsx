type Props = {
  data: {
    schoolName: string;
    schoolCode: string;
    studentCount: string;
    schoolId:string;
  }[];
};
import Link from "next/link";
export default function SchoolCountTable({ data }: Props) {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-5 border-b font-semibold">
        School-wise Student Count
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">School</th>
            <th className="p-3">Code</th>
            <th className="p-3">Students</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s) => (
            <tr key={s.schoolId} className="border-t">
              <td className="p-3">
                <Link href={`/students/school/${s.schoolId}`}>
                {s.schoolName}
                </Link></td>
              <td className="p-3 text-gray-500">
                <Link href={`/students/school/${s.schoolId}`}>
                
                {s.schoolCode}
                </Link>
              </td>
              <td className="p-3 font-semibold">
                {/* {Number(s.studentCount)} */}
                <Link href={`/students/school/${s.schoolId}`}>
                {Number(s.studentCount)} 
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
