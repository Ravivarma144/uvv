type Props = {
  students: {
    fullName: string;
    surName: string;
    phoneNumber?: string;
    school: {
      name: string;
    };
  }[];
};

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
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">
                  {s.surName} {s.fullName}
                </td>
                <td className="p-3">{s.school.name}</td>
                <td className="p-3">
                  {s.phoneNumber || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
