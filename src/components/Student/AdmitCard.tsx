import React from "react";
import QRCode from "react-qr-code";
import { FaMale, FaFemale, FaGenderless, FaPrint } from "react-icons/fa";

type Student = {
  id: string;
  surName: string;
  fullName: string;
  gender?: "BOY" | "GIRL" | "OTHER";
  schoolName: string;
  mandal: string;
  hallTicket: string;
};

type Props = {
  student: Student;
};

const GenderIcon = ({ gender }: { gender?: Student["gender"] }) => {
  if (gender === "BOY") return <FaMale className="text-blue-600" />;
  if (gender === "GIRL") return <FaFemale className="text-pink-600" />;
  return <FaGenderless className="text-gray-600" />;
};

const StudentAdmitCard: React.FC<Props> = ({ student }) => {
  const verifyUrl = `https://uvv-orcin.vercel.app/verify/${student.id}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* PRINT BUTTON (Hidden on Print) */}
      <div className="mb-4 text-right print:hidden">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded shadow hover:bg-green-800"
        >
          <FaPrint />
          Print Admit Card
        </button>
      </div>

      {/* ADMIT CARD */}
      <div className="max-w-3xl mx-auto border-2 border-gray-800 p-6 rounded bg-white print:border-black">
        {/* HEADER */}
        <div className="text-center border-b pb-3 mb-4">
          <h1 className="text-2xl font-bold tracking-wide">
            STUDENT ADMIT CARD
          </h1>
          <p className="text-sm text-gray-600">
            {student.schoolName} – {student.mandal}
          </p>
        </div>

        {/* BODY */}
        <div className="grid grid-cols-3 gap-6">
          {/* STUDENT DETAILS */}
          <div className="col-span-2 space-y-3 text-sm">
            <div>
              <span className="font-semibold">Name:</span>{" "}
              {student.surName} {student.fullName}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">Gender:</span>
              <GenderIcon gender={student.gender} />
              <span>{student.gender ?? "OTHER"}</span>
            </div>

            <div>
              <span className="font-semibold">Hall Ticket No:</span>{" "}
              {student.hallTicket}
            </div>

            <div>
              <span className="font-semibold">School:</span>{" "}
              {student.schoolName}
            </div>

            <div>
              <span className="font-semibold">Mandal:</span>{" "}
              {student.mandal}
            </div>
          </div>

          {/* QR CODE */}
          <div className="flex flex-col items-center justify-center border-l pl-4">
            <QRCode
              value={verifyUrl}
              size={110}
              bgColor="#ffffff"
              fgColor="#065f46"
            />
            <p className="text-[10px] text-gray-600 mt-2 text-center">
              Scan to verify
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-6 pt-3 border-t flex justify-between text-xs text-gray-700">
          <span>Authorized by School</span>
          <span>Signature</span>
        </div>
      </div>

      {/* PRINT STYLES */}
      <style>
        {`
          @media print {
            body {
              background: white;
            }
          }
        `}
      </style>
    </>
  );
};

export default StudentAdmitCard;
