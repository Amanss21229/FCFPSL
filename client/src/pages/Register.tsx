import { Layout } from "@/components/Layout";
import { BrutalButton } from "@/components/BrutalButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertRegistrationSchema } from "@shared/schema";
import { useCreateRegistration } from "@/hooks/use-registrations";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import type { z } from "zod";

type FormData = z.infer<typeof insertRegistrationSchema>;

export default function Register() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { mutateAsync: register, isPending } = useCreateRegistration();

  const form = useForm<FormData>({
    resolver: zodResolver(insertRegistrationSchema),
    defaultValues: {
      studentName: "",
      fatherName: "",
      motherName: "",
      address: "",
      whatsappNumber: "",
      alternateNumber: "",
      grade: "", // Explicitly empty string to force selection
      gender: "",
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await register(data);
      // Pass the result ID to the thank you page for PDF generation
      setLocation(`/thank-you/${result.id}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">Student Registration</h1>
            <p className="font-mono text-neutral-600">Fill out the form below to secure your seat.</p>
          </div>

          <div className="card-brutal">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Student Details Section */}
              <div>
                <h3 className="text-xl font-bold uppercase border-b-2 border-black pb-2 mb-6">Student Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold uppercase text-sm">Full Name *</label>
                    <input 
                      {...form.register("studentName")}
                      className="w-full input-brutal" 
                      placeholder="e.g. Rahul Kumar"
                    />
                    {form.formState.errors.studentName && (
                      <p className="text-red-600 text-xs font-mono">{form.formState.errors.studentName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold uppercase text-sm">Gender *</label>
                    <select {...form.register("gender")} className="w-full input-brutal bg-white appearance-none">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {form.formState.errors.gender && (
                      <p className="text-red-600 text-xs font-mono">{form.formState.errors.gender.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold uppercase text-sm">Class (2024-25) *</label>
                    <select {...form.register("grade")} className="w-full input-brutal bg-white appearance-none">
                      <option value="">Select Class</option>
                      <option value="Class 9th">Class 9th</option>
                      <option value="Class 10th">Class 10th</option>
                      <option value="Class 11th">Class 11th</option>
                      <option value="Class 12th">Class 12th</option>
                    </select>
                    {form.formState.errors.grade && (
                      <p className="text-red-600 text-xs font-mono">{form.formState.errors.grade.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Parent Details Section */}
              <div>
                <h3 className="text-xl font-bold uppercase border-b-2 border-black pb-2 mb-6">Parent Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold uppercase text-sm">Father's Name *</label>
                    <input 
                      {...form.register("fatherName")}
                      className="w-full input-brutal" 
                      placeholder="Mr. Suresh Kumar"
                    />
                    {form.formState.errors.fatherName && (
                      <p className="text-red-600 text-xs font-mono">{form.formState.errors.fatherName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold uppercase text-sm">Mother's Name *</label>
                    <input 
                      {...form.register("motherName")}
                      className="w-full input-brutal" 
                      placeholder="Mrs. Sunita Devi"
                    />
                    {form.formState.errors.motherName && (
                      <p className="text-red-600 text-xs font-mono">{form.formState.errors.motherName.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Details Section */}
              <div>
                <h3 className="text-xl font-bold uppercase border-b-2 border-black pb-2 mb-6">Contact Info</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold uppercase text-sm">WhatsApp Number *</label>
                    <input 
                      {...form.register("whatsappNumber")}
                      className="w-full input-brutal" 
                      placeholder="9876543210"
                      type="tel"
                    />
                    {form.formState.errors.whatsappNumber && (
                      <p className="text-red-600 text-xs font-mono">{form.formState.errors.whatsappNumber.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold uppercase text-sm">Alternate Number</label>
                    <input 
                      {...form.register("alternateNumber")}
                      className="w-full input-brutal" 
                      placeholder="Optional"
                      type="tel"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="font-bold uppercase text-sm">Full Address *</label>
                    <textarea 
                      {...form.register("address")}
                      className="w-full input-brutal min-h-[100px]" 
                      placeholder="House No, Street, Landmark, City, Pincode"
                    />
                    {form.formState.errors.address && (
                      <p className="text-red-600 text-xs font-mono">{form.formState.errors.address.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <BrutalButton 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full py-4 text-xl"
                  disabled={isPending}
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" /> Processing...
                    </span>
                  ) : "Submit Registration"}
                </BrutalButton>
                <p className="text-center font-mono text-xs text-neutral-500 mt-4">
                  By submitting, you agree to receive program updates via WhatsApp.
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
