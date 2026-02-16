import { Layout } from "@/components/Layout";
import { BrutalButton } from "@/components/BrutalButton";
import { useAuth, useRegistrations, useDeleteRegistration } from "@/hooks/use-registrations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Trash2, MessageCircle, FileSpreadsheet, LogOut, Search, Download } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoSrc from "@assets/file_00000000fc9c71f4959f7efd35bf788d_1769314870949.png";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

const loginSchema = z.object({
  password: z.string().min(1, "Password required"),
});

export default function Admin() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  return (
    <Layout>
      {isAuthenticated ? (
        <Dashboard onLogout={logout} />
      ) : (
        <LoginForm onLogin={login} />
      )}
    </Layout>
  );
}

function LoginForm({ onLogin }: { onLogin: (pw: string) => Promise<any> }) {
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: { password: string }) => {
    try {
      await onLogin(data.password);
    } catch (e) {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-neutral-50 px-4">
      <div className="card-brutal w-full max-w-md">
        <h1 className="text-3xl font-black uppercase mb-6 text-center">Admin Access</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="font-bold uppercase text-sm">Password</label>
            <input 
              type="password"
              {...register("password")}
              className="w-full input-brutal"
              placeholder="Enter admin password"
            />
          </div>
          
          {error && <p className="text-red-600 font-mono text-sm text-center">{error}</p>}

          <BrutalButton 
            type="submit" 
            variant="primary" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Login"}
          </BrutalButton>
        </form>
      </div>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { data: registrations, isLoading } = useRegistrations();
  const { mutate: deleteReg } = useDeleteRegistration();
  const { toast } = useToast();
  const [search, setSearch] = useState("");

  const filteredRegistrations = registrations?.filter((r: any) => 
    r.studentName.toLowerCase().includes(search.toLowerCase()) ||
    r.whatsappNumber.includes(search)
  ) || [];

  const generateRegistrationPDF = async (reg: any) => {
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

    const addPremiumBranding = () => {
      // Background decorative element
      doc.setDrawColor(218, 165, 32);
      doc.setLineWidth(1);
      doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
      
      if (logoBase64) {
        doc.addImage(logoBase64, 'PNG', 15, 15, 25, 25);
      }
      
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(218, 165, 32);
      doc.text("SANSA LEARN", center, 25, { align: "center" });
      
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("OFFLINE COACHING CENTER - KANKARBAGH, PATNA", center, 32, { align: "center" });
      
      doc.setDrawColor(218, 165, 32);
      doc.setLineWidth(0.5);
      doc.line(20, 42, pageWidth - 20, 42);

      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Official Registration Copy - Confidential", center, pageHeight - 15, { align: "center" });
    };

    addPremiumBranding();

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("STUDENT ADMISSION FORM", center, 55, { align: "center" });

    // Photo Box
    if (reg.photo) {
      doc.addImage(reg.photo, 'JPEG', pageWidth - 55, 60, 40, 40);
      doc.setDrawColor(0, 0, 0);
      doc.rect(pageWidth - 55, 60, 40, 40);
    } else {
      doc.setDrawColor(200, 200, 200);
      doc.rect(pageWidth - 55, 60, 40, 40);
      doc.setFontSize(8);
      doc.text("PHOTO", pageWidth - 35, 80, { align: "center" });
    }

    autoTable(doc, {
      startY: 110,
      head: [['CATEGORY', 'STUDENT INFORMATION']],
      body: [
        ['REGISTRATION ID', `#${reg.id}`],
        ['FULL NAME', reg.studentName.toUpperCase()],
        ['GENDER', reg.gender.toUpperCase()],
        ['TARGET CLASS', reg.grade.toUpperCase()],
        ['FATHER\'S NAME', reg.fatherName.toUpperCase()],
        ['MOTHER\'S NAME', reg.motherName.toUpperCase()],
        ['WHATSAPP NO.', reg.whatsappNumber],
        ['PARENT MOBILE', reg.parentMobileNumber],
        ['ALTERNATE NO.', reg.alternateNumber || "N/A"],
        ['POSTAL ADDRESS', reg.address.toUpperCase()],
        ['ADMISSION DATE', format(new Date(reg.createdAt), "PPP")],
      ],
      theme: 'grid',
      headStyles: { fillColor: [218, 165, 32], textColor: [0, 0, 0], fontStyle: 'bold' },
      styles: { fontSize: 10, cellPadding: 6, font: 'helvetica' },
      columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50, fillColor: [245, 245, 245] } }
    });

    // Signatures
    const finalY = (doc as any).lastAutoTable.finalY + 40;
    doc.line(30, finalY, 80, finalY);
    doc.text("Parent Signature", 55, finalY + 7, { align: "center" });
    
    doc.line(pageWidth - 80, finalY, pageWidth - 30, finalY);
    doc.text("Center Head", pageWidth - 55, finalY + 7, { align: "center" });

    doc.save(`Sansa_Admission_${reg.studentName.replace(/\s+/g, '_')}_${reg.id}.pdf`);
  };

  const handleExport = () => {
    if (!registrations || registrations.length === 0) {
      toast({ title: "No data to export", variant: "destructive" });
      return;
    }
    
    try {
      const exportData = registrations.map((r: any) => ({
        "ID": r.id,
        "Student Name": r.studentName,
        "Gender": r.gender,
        "Class": r.grade,
        "Father Name": r.fatherName,
        "Mother Name": r.motherName,
        "WhatsApp Number": r.whatsappNumber,
        "Parent Mobile": r.parentMobileNumber,
        "Alternate Number": r.alternateNumber || "N/A",
        "Address": r.address,
        "Registration Date": format(new Date(r.createdAt), "yyyy-MM-dd HH:mm"),
      }));
      
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
      XLSX.writeFile(workbook, `Sansa_Registrations_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
      toast({ title: "Excel file downloaded successfully" });
    } catch (error) {
      console.error("Export error:", error);
      toast({ title: "Failed to export", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this student record? This cannot be undone.")) {
      deleteReg(id);
      toast({ title: "Record deleted" });
    }
  };

  const sendWhatsapp = (number: string, name: string, registrationId: number) => {
    const baseUrl = window.location.origin;
    const receiptUrl = `${baseUrl}/thank-you/${registrationId}`;
    const text = `Hello ${name}, your registration for Sansa Learn Concept Foundation Program is confirmed!

Registration ID: #${registrationId}
Batch Duration: 2nd Feb - 15th Feb 2026
Location: Chandmari Road, Kankarbagh Patna

Download your Registration Receipt (PDF):
${receiptUrl}

Please report to the center on 2nd February at your batch time. Contact: 9296820840, 9153021229`;
    window.open(`https://wa.me/91${number}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (isLoading) return <div className="p-12 text-center"><Loader2 className="animate-spin inline-block w-8 h-8"/></div>;

  return (
    <div className="bg-neutral-50 min-h-screen pb-12">
      {/* Dashboard Header */}
      <div className="bg-white border-b-4 border-black py-8 mb-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-black uppercase">Admin Dashboard</h1>
            <p className="font-mono text-neutral-500">Manage student registrations</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-black text-white px-4 py-2 font-mono font-bold">
               Total: {registrations?.length || 0}
             </div>
             <BrutalButton onClick={onLogout} size="sm" variant="danger">
               <LogOut className="w-4 h-4 mr-2" /> Logout
             </BrutalButton>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search by name or mobile..." 
              className="w-full input-brutal pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <BrutalButton onClick={handleExport} variant="primary">
            <FileSpreadsheet className="w-4 h-4 mr-2" /> Export to Excel
          </BrutalButton>
        </div>
      </div>

      {/* Table */}
      <div className="container mx-auto px-4">
        <div className="card-brutal p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-sm">
              <thead className="bg-neutral-100 border-b-2 border-black text-xs uppercase">
                <tr>
                  <th className="p-4 font-bold">ID</th>
                  <th className="p-4 font-bold">Name</th>
                  <th className="p-4 font-bold">Class</th>
                  <th className="p-4 font-bold">Parent</th>
                  <th className="p-4 font-bold">WhatsApp</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredRegistrations.length === 0 ? (
                    <tr>
                        <td colSpan={7} className="p-8 text-center text-neutral-500">No students found.</td>
                    </tr>
                ) : (
                    filteredRegistrations.map((reg: any) => (
                    <tr key={reg.id} className="hover:bg-neutral-50">
                        <td className="p-4 font-bold">#{reg.id}</td>
                        <td className="p-4">
                            <div className="font-bold">{reg.studentName}</div>
                            <div className="text-xs text-neutral-500">{reg.gender}</div>
                        </td>
                        <td className="p-4">
                            <span className="bg-neutral-200 px-2 py-1 text-xs rounded-sm border border-neutral-400">
                                {reg.grade}
                            </span>
                        </td>
                        <td className="p-4">{reg.fatherName}</td>
                        <td className="p-4 font-mono">{reg.whatsappNumber}</td>
                        <td className="p-4">{format(new Date(reg.createdAt), "MMM d, yyyy")}</td>
                        <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                            <button 
                            onClick={() => generateRegistrationPDF(reg)}
                            className="p-2 bg-blue-500 text-white border border-black hover:scale-105 transition-transform"
                            title="Download Premium PDF"
                            >
                            <Download className="w-4 h-4" />
                            </button>
                            <button 
                            onClick={() => sendWhatsapp(reg.whatsappNumber, reg.studentName, reg.id)}
                            className="p-2 bg-green-500 text-white border border-black hover:scale-105 transition-transform"
                            title="Message on WhatsApp"
                            >
                            <MessageCircle className="w-4 h-4" />
                            </button>
                            <button 
                            onClick={() => handleDelete(reg.id)}
                            className="p-2 bg-red-500 text-white border border-black hover:scale-105 transition-transform"
                            title="Delete Record"
                            >
                            <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
