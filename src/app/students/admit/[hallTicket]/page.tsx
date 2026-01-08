"use client";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState ,useEffect} from "react";
import QRCode from "react-qr-code";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import { fetchStudentById } from "@/lib/api/students";

import Loader from "@/components/Common/Loader";

export default function AdmitCardPage() {
  const router = useRouter();
  const { hallTicket } = useParams<{ hallTicket: string }>();
  const ticketRef = useRef<HTMLDivElement>(null);
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

 

const eventDetails = {
    exam: "UVV Talent Test – 2026",
    place: "Boddapadu, Palasa Mandal",
    date: "10 January 2026",
  };


  useEffect(() => {
    if (!hallTicket) return;

    fetchStudentById(hallTicket).then((data) => {
        // console.log("Fetched Student Data:", data);
      setStudent(data);
      setLoading(false);
    });
  }, [hallTicket]);
  
    if (loading) {
      return <Loader text="Loading .... Student list ....." />  ;
    }
  

  // 🔽 Download Image
  const downloadImage = async () => {
    if (!ticketRef.current) return;

    const canvas = await html2canvas(ticketRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${student.hallTicket}.png`;
    link.click();
  };

  // 🔽 Download PDF
  const downloadPDF = () => {
    if (!ticketRef.current) return;

    html2pdf()
      .set({
        filename: `${student.hallTicket}.pdf`,
        margin: 10,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(ticketRef.current)
      .save();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-5xl">

        {/* ACTION BAR */}
        <div className="no-print flex justify-between items-center mb-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-200"
          >
            ← Back
          </button>

          <div className="flex gap-3">
            <button
              onClick={downloadImage}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Download Image
            </button>
            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-green-700 text-white rounded"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* ADMIT CARD */}
        <div
          ref={ticketRef}
          id="admit-card"
          className="relative bg-white border-2 border-gray-800 rounded-xl p-6 md:p-8 overflow-hidden"
        >
          {/* WATERMARK */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-300 text-6xl font-bold rotate-[-30deg] opacity-20">
              UVV OFFICIAL
            </span>
          </div>

          {/* HEADER */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* LOGO */}
            <div className="md:col-span-2 flex justify-center md:justify-start">
              <img
                src="/images/logo/uvv.png"
                alt="UVV Logo"
                className="h-24 w-auto"
              />
            </div>

            {/* TITLE */}
            <div className="md:col-span-8 text-center">
              <h1 className="text-xl md:text-2xl font-bold">
                {eventDetails.exam} Admit Card
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Place: {eventDetails.place} | Date: {eventDetails.date}
              </p>
            </div>

            {/* PHOTO */}
            <div className="md:col-span-2 flex justify-center md:justify-end">
              <div className="border border-gray-400 w-24 h-28 flex items-center justify-center text-xs text-gray-500">
                Student Photo
              </div>
            </div>
          </div>

          <hr className="my-4" />

          {/* DETAILS + CODES */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* DETAILS */}
            <div className="md:col-span-7 space-y-3 text-sm">
              <Field label="Name" value={`${student.fullName} ${student.surName}`} />
              <Field label="Gender" value={student.gender} />
              <Field label="Hall Ticket No" value={student.rollNumber}  mono />
              <Field label="School" value={`${student.school.name} , ${student.school.address}`} />
              {/* <Field label="Mandal" value={student.mandal} /> */}
            </div>

            {/* QR + BARCODE */}
            <div className="md:col-span-5 flex flex-col items-center gap-4">
                <h1 className="text-lg font-bold">{student.loginNumber}</h1>
              <QRCode
                value={`https://uvv-orcin.vercel.app/students/${student.loginNumber}`}
                size={100}
              />
              <Barcode value={student.hallTicket} height={40} fontSize={12} />
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <hr className="my-4" />
          <div className="relative z-10 text-xs space-y-2">
            <h3 className="font-bold">Important Instructions:</h3>
            <ol className="list-decimal ml-4 space-y-1">
              <li>Carry this admit card to the exam hall.</li>
              <li>Report 30 minutes before exam time.</li>
              <li>Electronic devices are prohibited.</li>
              <li>Follow invigilator instructions.</li>
              <li>Preserve admit card till results.</li>
            </ol>
          </div>

          {/* SIGNATURE */}
          <div className="flex justify-between mt-8 relative z-10">
            <div className="text-center">
              <div className="border-t w-40 mx-auto" />
              <p className="text-xs">Authorized Signature</p>
            </div>
            <div className="text-center">
              <div className="border-t w-28 mx-auto" />
              <p className="text-xs">Date</p>
            </div>
          </div>
        </div>
      </div>

      {/* PRINT RULE */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* FIELD COMPONENT */
function Field({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex">
      <span className="w-36 font-semibold">{label}</span>
      <span className={`ml-2 ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}


// "use client";

// import { useParams } from "next/navigation";
// import QRCode from "react-qr-code";
// import {
//   FaMale,
//   FaFemale,
//   FaGenderless,
//   FaPrint,
// } from "react-icons/fa";

// /* ---------------- TYPES ---------------- */

// type Gender = "BOY" | "GIRL" | "OTHER";

// type Student = {
//   id: string;
//   hallTicket: string;
//   surName: string;
//   fullName: string;
//   gender?: Gender;
//   schoolName: string;
//   mandal: string;
// };

// /* ----------- MOCK STUDENT DATA ----------
//    Replace later with store / API if needed
// ---------------------------------------- */

// const students: Student[] = [
//   {
//     id: "1",
//     hallTicket: "UVV-2026-00123",
//     surName: "AMBATI",
//     fullName: "NANDU",
//     gender: "BOY",
//     schoolName: "ZP High School",
//     mandal: "VAJRAPU KOTHURU",
//   },
// ];

// /* ------------ HELPERS ------------------ */

// const GenderIcon = ({ gender }: { gender?: Gender }) => {
//   if (gender === "BOY") return <FaMale className="text-blue-600" />;
//   if (gender === "GIRL") return <FaFemale className="text-pink-600" />;
//   return <FaGenderless className="text-gray-600" />;
// };

// /* -------------- PAGE ------------------- */

// export default function StudentAdmitCardPage() {
//   const { hallTicket } = useParams<{ hallTicket: string }>();

//   const student = students.find(
//     (s) => s.hallTicket === hallTicket
//   );

//   if (!student) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-6 rounded shadow text-center">
//           <h2 className="text-xl font-bold text-red-600">
//             Invalid Hall Ticket
//           </h2>
//           <p className="mt-2 text-gray-600">{hallTicket}</p>
//         </div>
//       </div>
//     );
//   }

//   const verifyUrl =
//     typeof window !== "undefined"
//       ? `${window.location.origin}/student/${student.hallTicket}`
//       : "";

//   const handlePrint = () => window.print();

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 print:bg-white">
//       {/* PRINT BUTTON */}
//       <div className="max-w-3xl mx-auto mb-4 text-right print:hidden">
//         <button
//           onClick={handlePrint}
//           className="inline-flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
//         >
//           <FaPrint />
//           Print
//         </button>
//       </div>

//       {/* ADMIT CARD */}
//       <div className="max-w-3xl mx-auto bg-white border-2 border-gray-800 rounded p-6 print:border-black">
//         {/* HEADER */}
//         <div className="text-center border-b pb-3 mb-4">
//           <h1 className="text-2xl font-bold tracking-wide">
//             UVV Talent Test - 2026 Admit Card
//           </h1>
//           <p className="text-sm text-gray-600">
//             Place : Boddapadu , Palasa Mandal.  Date: 10th Jan 2026
//           </p>
//         </div>

//         {/* BODY */}
//         <div className="grid grid-cols-3 gap-6">
//           {/* DETAILS */}
//           <div className="col-span-2 space-y-3 text-sm">
//             <p>
//               <strong>Name:</strong>{" "}
//               {student.surName} {student.fullName}
//             </p>

//             <div className="flex items-center gap-2">
//               <strong>Gender:</strong>
//               <GenderIcon gender={student.gender} />
//               <span>{student.gender ?? "OTHER"}</span>
//             </div>

//             <p>
//               <strong>Hall Ticket:</strong> {student.hallTicket}
//             </p>

//             <p>
//               <strong>School:</strong> {student.schoolName}
//             </p>

//             <p>
//               <strong>Mandal:</strong> {student.mandal}
//             </p>
//           </div>

//           {/* QR CODE */}
//           <div className="flex flex-col items-center justify-center border-l pl-4">
//             <QRCode
//               value={verifyUrl}
//               size={120}
//               fgColor="#065f46"
//               bgColor="#ffffff"
//             />
//             <span className="text-[10px] text-gray-600 mt-2">
//               Scan to verify
//             </span>
//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className="mt-6 border-t pt-3 flex justify-between text-xs">
//           <span>Authorized Signature</span>
//           <span>Date</span>
//         </div>
//       </div>

//       {/* PRINT FIX */}
//       <style jsx global>{`
//         @media print {
//           body {
//             background: white;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
