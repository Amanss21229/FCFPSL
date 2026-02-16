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

  const studentRoutine = ROUTINE_DATA.find(r => r.class.includes(registration?.grade?.split(' ')[1] || "NONE"));

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
      doc.text("OFFLINE COACHING", 35, 18);
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(218, 165, 32);
      doc.text("ADMISSION CONFIRMATION RECEIPT", center, 35, { align: "center" });
      
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
    const introText = "Congratulations on securing your 3-day free demo class at Sansa Learn. We are excited to have you join our offline coaching classes.";
    doc.text(doc.splitTextToSize(introText, 170), 20, 80);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Registration Details:", 20, 105);
    
    autoTable(doc, {
      startY: 110,
      body: [
        ["Registration ID", `#${registration?.id || "N/A"}`],
        ["Student Name", registration?.studentName || "N/A"],
        ["Target Class", registration?.grade || "N/A"],
        ["Demo Duration", "3 Days Free Trial"],
        ["Location", "Chandmari Road, Kankarbagh Patna (opposite of Gali no. 06)"],
      ],
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5 },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50, fillColor: [255, 250, 240] } }
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Important Instructions:", 20, (doc as any).lastAutoTable.finalY + 15);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const instructions = [
      "- Please report to the center at least 10 minutes early.",
      "- Bring this receipt and one passport size photograph.",
      "- Demo classes are valid for 3 consecutive working days.",
      "- Contact: 9296820840 for batch timing confirmation.",
    ];
    let yPos = (doc as any).lastAutoTable.finalY + 22;
    instructions.forEach(info => {
      doc.text(info, 20, yPos);
      yPos += 7;
    });

    doc.addPage();
    addBranding(2);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("STUDENT DATA COPY", center, 55, { align: "center" });

    if (registration) {
      if (registration.photo) {
        doc.addImage(registration.photo, 'JPEG', pageWidth - 50, 65, 35, 35);
        doc.setDrawColor(0, 0, 0);
        doc.rect(pageWidth - 50, 65, 35, 35);
      }

      autoTable(doc, {
        startY: 65,
        margin: { right: 60 },
        head: [['Field', 'Information']],
        body: [
          ['Name', registration.studentName || 'N/A'],
          ['Gender', registration.gender || 'N/A'],
          ['Class', registration.grade || 'N/A'],
          ['Father', registration.fatherName || 'N/A'],
          ['Mother', registration.motherName || 'N/A'],
          ['WhatsApp', registration.whatsappNumber || 'N/A'],
          ['Parent Mob', registration.parentMobileNumber || 'N/A'],
          ['Address', registration.address || 'N/A'],
          ['Date', registration.createdAt ? format(new Date(registration.createdAt), "PPP") : 'N/A'],
        ],
        theme: 'striped',
        headStyles: { fillColor: [218, 165, 32], textColor: [0, 0, 0] },
        styles: { fontSize: 10, cellPadding: 5 }
      });
    }

    doc.addPage();
    addBranding(3);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("PROGRAM & SUBJECT INFO", center, 55, { align: "center" });

    autoTable(doc, {
      startY: 70,
      head: [['Class Group', 'Subjects Offered', 'Focus Area']],
      body: ROUTINE_DATA.map(r => [r.class, r.subjects, r.details]),
      theme: 'grid',
      headStyles: { fillColor: [218, 165, 32], textColor: [0, 0, 0] },
      styles: { fontSize: 9, cellPadding: 6 }
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Faculty Members:", 20, (doc as any).lastAutoTable.finalY + 15);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("- Dr. Manisha Kumari: Science (4-10) | Chemistry (11, 12, Dropper)", 20, (doc as any).lastAutoTable.finalY + 25);
    doc.text("- Aman Kumar: Mathematics (Class 4-10)", 20, (doc as any).lastAutoTable.finalY + 32);
    doc.text("- Nisha Kumari: English Grammar (Class 4-8)", 20, (doc as any).lastAutoTable.finalY + 39);

    doc.save(`Admission-Receipt-${registration?.studentName || "Student"}.pdf`);
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
            Your 3-day free demo class is booked. We look forward to seeing you at the center.
          </p>
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
