import { Layout } from "@/components/Layout";
import { BrutalButton } from "@/components/BrutalButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertRegistrationSchema } from "@shared/schema";
import { useCreateRegistration } from "@/hooks/use-registrations";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Loader2, Camera, X } from "lucide-react";
import type { z } from "zod";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type FormData = z.infer<typeof insertRegistrationSchema>;

export default function Register() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { mutateAsync: register, isPending } = useCreateRegistration();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(insertRegistrationSchema),
    defaultValues: {
      studentName: "",
      fatherName: "",
      motherName: "",
      address: "",
      whatsappNumber: "",
      parentMobileNumber: "",
      alternateNumber: "",
      grade: "",
      gender: "",
      photo: "",
    }
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Photo must be less than 2MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPhotoPreview(base64);
        form.setValue("photo", base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    form.setValue("photo", "");
  };

  const onSubmit = async (data: FormData) => {
    try {
      const result = await register(data);
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
      <div className="min-h-screen bg-secondary py-12">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Session 2026-27 Motivation Banner */}
          <div className="bg-black border-2 border-[#D4AF37] rounded-lg overflow-hidden mb-8">
            <div className="bg-[#D4AF37] px-5 py-2 flex items-center gap-2">
              <span className="font-black font-mono text-xs uppercase tracking-widest text-black">🎉 {t("admission.badge")}</span>
            </div>
            <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-1">
                <p className="text-[#D4AF37] font-black font-mono text-sm uppercase">
                  {t("admission.free")} — {t("admission.classes.start")}
                </p>
                <p className="text-white font-mono text-xs opacity-80">
                  {t("admission.seats")}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-mono font-bold text-xs uppercase">Admission Live</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black uppercase mb-4 text-foreground">{t("register.title")}</h1>
            <p className="font-mono text-muted-foreground">{t("register.subtitle")}</p>
          </div>

          <div className="card-brutal">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Photo Upload Section */}
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-foreground/20 rounded-lg bg-muted/50">
                <label className="font-bold uppercase text-sm mb-4 text-foreground">{t("register.photo")}</label>
                <div className="relative group">
                  {photoPreview ? (
                    <div className="relative w-32 h-32">
                      <img 
                        src={photoPreview} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover border-4 border-foreground rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground p-1 rounded-full border-2 border-foreground hover:scale-110 transition-transform"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-4 border-foreground rounded-lg bg-background cursor-pointer hover:bg-muted transition-colors">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                      <span className="text-[10px] font-bold uppercase mt-2">Upload</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handlePhotoChange}
                      />
                    </label>
                  )}
                </div>
                <p className="text-[10px] font-mono text-muted-foreground mt-4 uppercase">{t("register.photo.hint")}</p>
              </div>

              {/* Student Details Section */}
              <div>
                <h3 className="text-xl font-bold uppercase border-b-2 border-golden pb-2 mb-6 text-foreground">{t("register.details.student")}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold uppercase text-sm text-foreground">{t("register.studentName")} *</label>
                    <input 
                      {...form.register("studentName")}
                      className="w-full input-brutal bg-background text-foreground" 
                      placeholder="e.g. Rahul Kumar"
                    />
                    {form.formState.errors.studentName && (
                      <p className="text-red-500 text-xs font-mono">{form.formState.errors.studentName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold uppercase text-sm text-foreground">{t("register.gender")} *</label>
                    <select {...form.register("gender")} className="w-full input-brutal bg-background text-foreground">
                      <option value="">{t("register.gender.placeholder")}</option>
                      <option value="Male">{t("register.gender.male")}</option>
                      <option value="Female">{t("register.gender.female")}</option>
                      <option value="Other">{t("register.gender.other")}</option>
                    </select>
                    {form.formState.errors.gender && (
                      <p className="text-red-500 text-xs font-mono">{form.formState.errors.gender.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold uppercase text-sm text-foreground">{t("register.class")} *</label>
                    <select {...form.register("grade")} className="w-full input-brutal bg-background text-foreground">
                      <option value="">{t("register.class.placeholder")}</option>
                      <option value="Class 4th">Class 4th</option>
                      <option value="Class 5th">Class 5th</option>
                      <option value="Class 6th">Class 6th</option>
                      <option value="Class 7th">Class 7th</option>
                      <option value="Class 8th">Class 8th</option>
                      <option value="Class 9th">Class 9th</option>
                      <option value="Class 10th">Class 10th</option>
                      <option value="Class 11th">Class 11th</option>
                      <option value="Class 12th">Class 12th</option>
                      <option value="Dropper">Dropper</option>
                    </select>
                    {form.formState.errors.grade && (
                      <p className="text-red-500 text-xs font-mono">{form.formState.errors.grade.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Parent Details Section */}
              <div>
                <h3 className="text-xl font-bold uppercase border-b-2 border-golden pb-2 mb-6 text-foreground">{t("register.details.parent")}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold uppercase text-sm text-foreground">{t("register.fatherName")} *</label>
                    <input 
                      {...form.register("fatherName")}
                      className="w-full input-brutal bg-background text-foreground" 
                      placeholder="Mr. Suresh Kumar"
                    />
                    {form.formState.errors.fatherName && (
                      <p className="text-red-500 text-xs font-mono">{form.formState.errors.fatherName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold uppercase text-sm text-foreground">{t("register.motherName")} *</label>
                    <input 
                      {...form.register("motherName")}
                      className="w-full input-brutal bg-background text-foreground" 
                      placeholder="Mrs. Sunita Devi"
                    />
                    {form.formState.errors.motherName && (
                      <p className="text-red-500 text-xs font-mono">{form.formState.errors.motherName.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Details Section */}
              <div>
                <h3 className="text-xl font-bold uppercase border-b-2 border-golden pb-2 mb-6 text-foreground">{t("register.details.contact")}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold uppercase text-sm text-foreground">{t("register.whatsapp")} *</label>
                    <input 
                      {...form.register("whatsappNumber")}
                      className="w-full input-brutal bg-background text-foreground" 
                      placeholder="9876543210"
                      type="tel"
                    />
                    {form.formState.errors.whatsappNumber && (
                      <p className="text-red-500 text-xs font-mono">{form.formState.errors.whatsappNumber.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold uppercase text-sm text-foreground">{t("register.whatsapp")} *</label>
                    <input 
                      {...form.register("parentMobileNumber")}
                      className="w-full input-brutal bg-background text-foreground" 
                      placeholder="9876543210"
                      type="tel"
                    />
                    {form.formState.errors.parentMobileNumber && (
                      <p className="text-red-500 text-xs font-mono">{form.formState.errors.parentMobileNumber.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="font-bold uppercase text-sm text-foreground">{t("register.alternate")}</label>
                    <input 
                      {...form.register("alternateNumber")}
                      className="w-full input-brutal bg-background text-foreground" 
                      placeholder="Optional"
                      type="tel"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="font-bold uppercase text-sm text-foreground">{t("register.address")} *</label>
                    <textarea 
                      {...form.register("address")}
                      className="w-full input-brutal bg-background text-foreground min-h-[100px]" 
                      placeholder="House No, Street, Landmark, City, Pincode"
                    />
                    {form.formState.errors.address && (
                      <p className="text-red-500 text-xs font-mono">{form.formState.errors.address.message}</p>
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
                  ) : t("register.submit")}
                </BrutalButton>
                <p className="text-center font-mono text-xs text-muted-foreground mt-4 uppercase">
                  {t("register.footer.note")}
                </p>
              </div>

            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
