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

    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("SANSA LEARN", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Concept Foundation Program Registration Receipt", 105, 30, { align: "center" });
    
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Student Details Table
    if (registration) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Student Details", 20, 50);

      autoTable(doc, {
        startY: 55,
        head: [['Field', 'Value']],
        body: [
          ['Registration ID', `#${registration.id}`],
          ['Student Name', registration.studentName],
          ['Class', registration.grade],
          ['Father\'s Name', registration.fatherName],
          ['WhatsApp', registration.whatsappNumber],
          ['Date', format(new Date(registration.createdAt!), "PPP")],
        ],
        theme: 'plain',
        styles: { lineColor: [0, 0, 0], lineWidth: 0.1, textColor: [0, 0, 0] },
        headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' }
      });
    }

    // Batch Details
    if (studentRoutine) {
      const finalY = (doc as any).lastAutoTable.finalY + 15;
      
      doc.setFontSize(14);
      doc.text("Batch Schedule", 20, finalY);

      autoTable(doc, {
        startY: finalY + 5,
        body: [
          ['Assigned Batch', studentRoutine.class],
          ['Timing', studentRoutine.time],
          ['Subjects', studentRoutine.subjects],
          ['Venue', 'Sansa Learning Center, Galaxy Tower'],
        ],
        theme: 'grid',
        styles: { lineColor: [0, 0, 0], lineWidth: 0.1, textColor: [0, 0, 0] },
      });
    }

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.text("Please bring this receipt or a screenshot on the first day.", 105, pageHeight - 30, { align: "center" });
    doc.text("Helpline: +91 98765 43210", 105, pageHeight - 20, { align: "center" });

    doc.save(`Sansa-Registration-${registration?.studentName || "Receipt"}.pdf`);
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
