type Props = {
  students: {
    fullName: string;
    surName: string;
    phoneNumber?: string;
    loginNumber:string;
    gender?:string;
    school: {
      name: string;
    };
  }[];
};
import Link from "next/link";

export default function StudentsTable({ students }: Props) {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-5 border-b font-semibold">
        All Students
      </div>

      <div className="overflow-auto max-h-[400px]">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">School</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Registration Id</th>
              <th className="p-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i} className="border-t">
                {/* <td className="p-3">
                  {s.surName} {s.fullName} {s.gender && `(${s.gender})`}
                </td> */}
                <td className="p-3 flex items-center gap-2">
  <span>{s.surName} {s.fullName}</span>

  {s.gender === "BOY" && (
    <span className="text-blue-600 text-lg" title="Boy">♂</span>
  )}

  {s.gender === "GIRL" && (
    <span className="text-pink-600 text-lg" title="Girl">♀</span>
  )}

  {s.gender === "OTHER" && (
    <span className="text-pink-600 text-lg" title="Other">⚧</span>
  )}
</td>
                <td className="p-3">{s.school.name}</td>
                <td className="p-3">
                  {s.phoneNumber || "-"}
                </td>
                <td className="p-3">
                    {s.loginNumber || "-"}
                </td>
                <td className="p-3">
                  {/* View Details Link - Placeholder */}
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
