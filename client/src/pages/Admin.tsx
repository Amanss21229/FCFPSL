import { Layout } from "@/components/Layout";
import { BrutalButton } from "@/components/BrutalButton";
import { useAuth, useRegistrations, useDeleteRegistration } from "@/hooks/use-registrations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Trash2, MessageCircle, FileSpreadsheet, LogOut, Search } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

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

  const handleExport = () => {
    if (!registrations) return;
    
    const worksheet = XLSX.utils.json_to_sheet(registrations);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    XLSX.writeFile(workbook, `Sansa_Registrations_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this student record? This cannot be undone.")) {
      deleteReg(id);
      toast({ title: "Record deleted" });
    }
  };

  const sendWhatsapp = (number: string, name: string) => {
    const text = `Hello ${name}, your registration for Sansa Learn Concept Foundation Program is confirmed.`;
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
                            onClick={() => sendWhatsapp(reg.whatsappNumber, reg.studentName)}
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
