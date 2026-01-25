import { Layout } from "@/components/Layout";
import { BrutalButton } from "@/components/BrutalButton";
import { Link, useParams } from "wouter";
import { CheckCircle, Download, Home, Printer } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { ROUTINE_DATA } from "./ProgramDetails";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import logo from "@assets/file_00000000fc9c71f4959f7efd35bf788d_1769314870949.png";

// Need to define types for autotable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export default function ThankYou() {
  const { id } = useParams();
  
  // In a real app, we would fetch the specific registration by ID
  // For now, we'll fetch the list and find the user (not efficient but works for MVP without extra endpoint)
  const { data: registrations } = useQuery({
    queryKey: [api.registrations.list.path],
    queryFn: async () => {
        // NOTE: This will likely fail for non-admins if API is protected properly.
        // Ideally we need a public "get registration by ID" endpoint or return data from mutation.
        // Fallback: If fetch fails, we just show success message without PDF personalization details from DB.
        try {
            const res = await fetch(api.registrations.list.path);
            if (!res.ok) return [];
            return await res.json();
        } catch {
            return [];
        }
    }
  });

  const registration = registrations?.find((r: any) => r.id === Number(id));
  const studentRoutine = ROUTINE_DATA.find(r => r.class === registration?.grade);

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const center = pageWidth / 2;

    const addBranding = (pageNum: number) => {
      // Top Left Logo Placeholder (using text as fallback if logo not loading)
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("SANSA LEARN", 15, 15);
      
      // Top Center Header
      doc.setFontSize(12);
      doc.text("FREE CONCEPT FOUNDATION PROGRAM", center, 15, { align: "center" });

      // Footer
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      const footerText = "Chandmari Road, Kankarbagh Patna, (opposite of Gali no. 06) | Contact: 9296820840, 9153021229";
      doc.text(footerText, center, pageHeight - 10, { align: "center" });
      doc.text(`Page ${pageNum}`, pageWidth - 15, pageHeight - 10, { align: "right" });
    };

    // --- PAGE 1: Success & General Info ---
    addBranding(1);
    
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("REGISTRATION SUCCESSFUL!", center, 40, { align: "center" });

    doc.setFontSize(14);
    doc.text(`Welcome, ${registration?.studentName || "Student"}!`, 20, 60);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const introText = "Congratulations on securing your seat in the Sansa Learn Concept Foundation Program. This 15-day intensive program is designed to strengthen your academic foundations in Mathematics, Science, and English Grammar.";
    doc.text(doc.splitTextToSize(introText, 170), 20, 70);

    doc.setFont("helvetica", "bold");
    doc.text("Program Information:", 20, 95);
    
    autoTable(doc, {
      startY: 100,
      body: [
        ["Registration ID", `#${registration?.id || "N/A"}`],
        ["Student Name", registration?.studentName || "N/A"],
        ["Batch Duration", "15 Days (2nd Feb - 15th Feb 2026)"],
        ["Class Start Date", "2nd February 2026"],
        ["Location", "Chandmari Road, Kankarbagh Patna"],
      ],
      theme: 'grid',
      styles: { fontSize: 11, cellPadding: 5 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } }
    });

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    const noteText = "Important: Please arrive 15 minutes before your scheduled batch time on the first day. Bring this receipt and one passport size photograph.";
    doc.text(doc.splitTextToSize(noteText, 170), 20, (doc as any).lastAutoTable.finalY + 15);

    // --- PAGE 2: Complete Data (Registration Copy) ---
    doc.addPage();
    addBranding(2);

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("REGISTRATION FORM COPY", center, 35, { align: "center" });

    if (registration) {
      autoTable(doc, {
        startY: 45,
        head: [['Field', 'Information']],
        body: [
          ['Student Name', registration.studentName],
          ['Gender', registration.gender],
          ['Class (2025-26)', registration.grade],
          ['Father\'s Name', registration.fatherName],
          ['Mother\'s Name', registration.motherName],
          ['WhatsApp Number', registration.whatsappNumber],
          ['Parent Mobile', registration.parentMobileNumber],
          ['Alternate Number', registration.alternateNumber || "N/A"],
          ['Full Address', registration.address],
          ['Registration Date', format(new Date(registration.createdAt!), "PPP")],
        ],
        theme: 'striped',
        headStyles: { fillColor: [0, 0, 0] },
        styles: { fontSize: 10, cellPadding: 4 }
      });
    }

    // --- PAGE 3: Routine & Timing ---
    doc.addPage();
    addBranding(3);

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("CLASS ROUTINE & TIMING", center, 35, { align: "center" });

    if (studentRoutine) {
      doc.setFontSize(14);
      doc.text(`Assigned Batch: ${studentRoutine.class}`, 20, 50);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Daily Timing: ${studentRoutine.time}`, 20, 60);

      autoTable(doc, {
        startY: 70,
        head: [['Class', 'Time', 'Subjects', 'Weekly Schedule']],
        body: [[
          studentRoutine.class,
          studentRoutine.time,
          studentRoutine.subjects,
          studentRoutine.days
        ]],
        theme: 'grid',
        headStyles: { fillColor: [43, 96, 56] } // Golden-ish header
      });

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Complete Program Schedule (All Batches):", 20, (doc as any).lastAutoTable.finalY + 15);

      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 20,
        head: [['Class', 'Time', 'Subjects']],
        body: ROUTINE_DATA.map(r => [r.class, r.time, r.subjects]),
        theme: 'striped',
        styles: { fontSize: 8 }
      });
    }

    doc.save(`Sansa-Receipt-${registration?.studentName || "Student"}.pdf`);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 bg-neutral-50 text-center px-4">
        
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_#000] border-2 border-black">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">Registration Successful!</h1>
          <p className="font-mono text-xl text-neutral-600 max-w-lg mx-auto">
            Thank you for registering for the Concept Foundation Program. We have reserved your seat.
          </p>
        </div>

        <div className="card-brutal max-w-lg w-full mb-8 text-left bg-white">
          <h3 className="font-bold uppercase border-b-2 border-black pb-2 mb-4">Next Steps</h3>
          <ul className="space-y-4 font-mono text-sm">
            <li className="flex items-start gap-3">
              <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs">1</span>
              <span>Download your registration receipt below.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs">2</span>
              <span>Join the WhatsApp group (link sent to your number).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs">3</span>
              <span>Report to the center on 2nd February at your batch time.</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <BrutalButton onClick={generatePDF} variant="primary">
            <Download className="w-4 h-4 mr-2" /> Download Receipt
          </BrutalButton>
          
          <Link href="/">
            <BrutalButton variant="secondary">
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </BrutalButton>
          </Link>
        </div>

      </div>
    </Layout>
  );
}
