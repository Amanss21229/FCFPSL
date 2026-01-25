import { Layout } from "@/components/Layout";
import { BrutalButton } from "@/components/BrutalButton";
import { Link, useParams } from "wouter";
import { CheckCircle, Download, Home } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ROUTINE_DATA } from "./ProgramDetails";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import logoSrc from "@assets/file_00000000fc9c71f4959f7efd35bf788d_1769314870949.png";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export default function ThankYou() {
  const { id } = useParams();
  
  const { data: registration, isLoading } = useQuery({
    queryKey: ['/api/registrations', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`/api/registrations/${id}`);
      if (!res.ok) return null;
      return await res.json();
    },
    enabled: !!id,
  });

  const studentRoutine = ROUTINE_DATA.find(r => r.class === registration?.grade);

  const generatePDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const center = pageWidth / 2;

    let logoBase64: string | null = null;
    try {
      const response = await fetch(logoSrc);
      const blob = await response.blob();
      logoBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.error("Failed to load logo:", e);
    }

    const addBranding = (pageNum: number) => {
      if (logoBase64) {
        doc.addImage(logoBase64, 'PNG', 10, 5, 20, 20);
      }
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(218, 165, 32);
      doc.text("SANSA LEARN", 35, 12);
      
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text("CONCEPT FOUNDATION", 35, 18);
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(218, 165, 32);
      doc.text("FREE CONCEPT FOUNDATION PROGRAM", center, 35, { align: "center" });
      
      doc.setDrawColor(218, 165, 32);
      doc.setLineWidth(0.5);
      doc.line(20, 40, pageWidth - 20, 40);

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      const footerText = "Chandmari Road, Kankarbagh Patna, (opposite of Gali no. 06) | Contact: 9296820840, 9153021229";
      doc.text(footerText, center, pageHeight - 10, { align: "center" });
      doc.text(`Page ${pageNum} of 3`, pageWidth - 15, pageHeight - 10, { align: "right" });
    };

    addBranding(1);
    
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(34, 139, 34);
    doc.text("REGISTRATION SUCCESSFUL!", center, 55, { align: "center" });

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Welcome, ${registration?.studentName || "Student"}!`, 20, 70);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const introText = "Congratulations on securing your seat in the Sansa Learn Concept Foundation Program. This 15-day intensive program is designed to strengthen your academic foundations in Mathematics, Science, and English Grammar.";
    doc.text(doc.splitTextToSize(introText, 170), 20, 80);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Program Information:", 20, 105);
    
    autoTable(doc, {
      startY: 110,
      body: [
        ["Registration ID", `#${registration?.id || "N/A"}`],
        ["Student Name", registration?.studentName || "N/A"],
        ["Class (2025-26)", registration?.grade || "N/A"],
        ["Batch Duration", "15 Days (2nd Feb - 15th Feb 2026)"],
        ["Class Start Date", "2nd February 2026"],
        ["Location", "Chandmari Road, Kankarbagh Patna (opposite of Gali no. 06)"],
      ],
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50, fillColor: [255, 250, 240] } }
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("General Information:", 20, (doc as any).lastAutoTable.finalY + 15);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const generalInfo = [
      "- Please arrive 15 minutes before your scheduled batch time on the first day.",
      "- Bring this receipt and one passport size photograph.",
      "- Classes will be held Monday to Saturday.",
      "- Contact: 9296820840, 9153021229 for any queries.",
    ];
    let yPos = (doc as any).lastAutoTable.finalY + 22;
    generalInfo.forEach(info => {
      doc.text(info, 20, yPos);
      yPos += 7;
    });

    doc.addPage();
    addBranding(2);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("REGISTRATION FORM COPY", center, 55, { align: "center" });

    if (registration) {
      autoTable(doc, {
        startY: 65,
        head: [['Field', 'Information']],
        body: [
          ['Registration ID', `#${registration.id}`],
          ['Student Name', registration.studentName || 'N/A'],
          ['Gender', registration.gender || 'N/A'],
          ['Class (2025-26)', registration.grade || 'N/A'],
          ['Father\'s Name', registration.fatherName || 'N/A'],
          ['Mother\'s Name', registration.motherName || 'N/A'],
          ['WhatsApp Number', registration.whatsappNumber || 'N/A'],
          ['Parent Mobile', registration.parentMobileNumber || 'N/A'],
          ['Alternate Number', registration.alternateNumber || 'N/A'],
          ['Full Address', registration.address || 'N/A'],
          ['Registration Date', registration.createdAt ? format(new Date(registration.createdAt), "PPP 'at' p") : 'N/A'],
        ],
        theme: 'striped',
        headStyles: { fillColor: [218, 165, 32], textColor: [0, 0, 0], fontStyle: 'bold' },
        styles: { fontSize: 10, cellPadding: 5 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } }
      });

      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(100, 100, 100);
      doc.text("This is an official copy of your registration form. Please keep it safe.", center, (doc as any).lastAutoTable.finalY + 15, { align: "center" });
    } else {
      doc.setFontSize(12);
      doc.setTextColor(150, 150, 150);
      doc.text("Registration data not available.", center, 100, { align: "center" });
    }

    doc.addPage();
    addBranding(3);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("CLASS ROUTINE & DAILY SCHEDULE", center, 55, { align: "center" });

    if (studentRoutine) {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(218, 165, 32);
      doc.text(`Your Assigned Batch: ${studentRoutine.class}`, 20, 70);
      
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.text(`Daily Timing: ${studentRoutine.time}`, 20, 80);
      doc.text(`Duration: Monday to Saturday`, 20, 88);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Your Weekly Subject Schedule:", 20, 102);

      const scheduleData = studentRoutine.days.split('|').map(d => d.trim());
      autoTable(doc, {
        startY: 108,
        head: [['Days', 'Subject']],
        body: scheduleData.map(schedule => {
          const parts = schedule.split(':');
          return [parts[0]?.trim() || schedule, parts[1]?.trim() || 'All Subjects'];
        }),
        theme: 'grid',
        headStyles: { fillColor: [218, 165, 32], textColor: [0, 0, 0], fontStyle: 'bold' },
        styles: { fontSize: 10, cellPadding: 6 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } }
      });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Complete Program Schedule (All Batches):", 20, (doc as any).lastAutoTable.finalY + 18);

      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 24,
        head: [['Class', 'Time', 'Subjects', 'Weekly Schedule']],
        body: ROUTINE_DATA.map(r => [r.class, r.time, r.subjects, r.days]),
        theme: 'striped',
        headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
        styles: { fontSize: 8, cellPadding: 4 },
        columnStyles: { 
          0: { fontStyle: 'bold', cellWidth: 28 },
          1: { cellWidth: 35 },
          2: { cellWidth: 55 },
          3: { cellWidth: 55 }
        }
      });
    } else {
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.text("Daily Class Schedule:", 20, 70);
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text("Your class schedule will be available based on your assigned batch.", 20, 82);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Complete Program Schedule (All Batches):", 20, 100);

      autoTable(doc, {
        startY: 106,
        head: [['Class', 'Time', 'Subjects', 'Weekly Schedule']],
        body: ROUTINE_DATA.map(r => [r.class, r.time, r.subjects, r.days]),
        theme: 'striped',
        headStyles: { fillColor: [218, 165, 32], textColor: [0, 0, 0] },
        styles: { fontSize: 8, cellPadding: 4 },
        columnStyles: { 
          0: { fontStyle: 'bold', cellWidth: 28 },
          1: { cellWidth: 35 },
          2: { cellWidth: 55 },
          3: { cellWidth: 55 }
        }
      });
    }

    doc.save(`Sansa-Learn-Receipt-${registration?.studentName || "Student"}.pdf`);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 bg-neutral-50 dark:bg-neutral-900 text-center px-4">
        
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_#000] border-2 border-black">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-4 text-foreground">Registration Successful!</h1>
          <p className="font-mono text-xl text-muted-foreground max-w-lg mx-auto">
            Thank you for registering for the Concept Foundation Program. We have reserved your seat.
          </p>
        </div>

        <div className="card-brutal max-w-lg w-full mb-8 text-left bg-white dark:bg-neutral-800">
          <h3 className="font-bold uppercase border-b-2 border-black dark:border-white pb-2 mb-4 text-foreground">Next Steps</h3>
          <ul className="space-y-4 font-mono text-sm text-foreground">
            <li className="flex items-start gap-3">
              <span className="bg-black dark:bg-white text-white dark:text-black rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs">1</span>
              <span>Download your registration receipt below.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-black dark:bg-white text-white dark:text-black rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs">2</span>
              <span>Join the WhatsApp group (link sent to your number).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-black dark:bg-white text-white dark:text-black rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs">3</span>
              <span>Report to the center on 2nd February at your batch time.</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <BrutalButton onClick={generatePDF} variant="primary" disabled={isLoading} data-testid="button-download-receipt">
            <Download className="w-4 h-4 mr-2" /> Download Receipt
          </BrutalButton>
          
          <Link href="/">
            <BrutalButton variant="secondary" data-testid="button-back-home">
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </BrutalButton>
          </Link>
        </div>

      </div>
    </Layout>
  );
}
