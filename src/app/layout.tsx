// import { Poppins } from "next/font/google";
// import "./globals.css";
// import Header from "@/components/Layout/Header";
// import Footer from "@/components/Layout/Footer";
// import { ThemeProvider } from "next-themes";
// import ScrollToTop from "@/components/ScrollToTop";
// import { Toaster } from "react-hot-toast";
// const font = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${font.className}`}>
//         <ThemeProvider
//           attribute="class"
//           enableSystem={true}
//           defaultTheme="light"
//         >
//           <Header />
//           {/* Toast Configuration */}
//         <Toaster
//           position="top-center"
//           reverseOrder={false}
//           toastOptions={{
//             duration: 4000,
//             style: {
//               background: "#1f2937", // gray-800
//               color: "#fff",
//               borderRadius: "10px",
//               padding: "14px 16px",
//             },
//             success: {
//               iconTheme: {
//                 primary: "#22c55e", // green
//                 secondary: "#ffffff",
//               },
//             },
//             error: {
//               iconTheme: {
//                 primary: "#ef4444", // red
//                 secondary: "#ffffff",
//               },
//             },
//           }}
//         />
//           {children}
//           <Footer />
//           <ScrollToTop />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }


import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "react-hot-toast";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="light"
        >
          <Header />

          {/* 🔑 MAIN CONTENT OFFSET */}
          <main className="pt-[80px] min-h-screen">
            {children}
          </main>

          <Footer />
          <ScrollToTop />

          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1f2937",
                color: "#fff",
                borderRadius: "10px",
                padding: "14px 16px",
              },
              success: {
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#ffffff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

