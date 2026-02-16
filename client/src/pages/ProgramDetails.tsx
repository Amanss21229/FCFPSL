import { Layout } from "@/components/Layout";
import { BrutalButton } from "@/components/BrutalButton";
import { Link } from "wouter";
import { Clock, MapPin, MessageCircle, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ROUTINE_DATA = [
  { class: "Class 4th - 8th", subjects: "Science, Mathematics, English Grammar", details: "Strong foundation building" },
  { class: "Class 9th - 10th", subjects: "Science, Mathematics", details: "Board & Foundation focus" },
  { class: "Class 11th, 12th & Dropper", subjects: "Complete Chemistry", details: "Organic, Inorganic, Physical (NEET/JEE/Boards)" },
];

export default function ProgramDetails() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="bg-neutral-50 border-b-4 border-black py-16 dark:bg-neutral-900 dark:border-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-6 text-foreground">Sansa Learn Offline Coaching</h1>
          <p className="font-mono text-xl max-w-2xl mx-auto text-muted-foreground">
            {t("program.hero.subtitle")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          <div className="space-y-8">
            <div className="card-brutal">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-foreground">
                <User className="w-6 h-6" /> {t("program.guidance")}
              </h2>
              <div className="space-y-6 font-mono text-lg">
                <div className="p-4 bg-muted border-l-4 border-golden">
                  <p className="font-bold">Dr. Manisha Kumari</p>
                  <p className="text-sm text-muted-foreground">Science (Class 4-10) | Chemistry (Class 11, 12, Dropper)</p>
                </div>
                <div className="p-4 bg-muted border-l-4 border-golden">
                  <p className="font-bold">Aman Kumar</p>
                  <p className="text-sm text-muted-foreground">Mathematics (Class 4-10)</p>
                </div>
                <div className="p-4 bg-muted border-l-4 border-golden">
                  <p className="font-bold">Nisha Kumari</p>
                  <p className="text-sm text-muted-foreground">English Grammar (Class 4-8)</p>
                </div>
              </div>
              <div className="mt-8 p-6 bg-golden/10 border-2 border-golden font-bold text-center uppercase">
                Register now and get 3 days of free demo classes!
              </div>
            </div>

            <div className="card-brutal !bg-black text-white border-black dark:!bg-white dark:text-black dark:border-white">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white dark:text-black">
                <MapPin className="w-6 h-6" /> {t("program.location.title")}
              </h2>
              <address className="font-mono not-italic text-lg space-y-2 text-white dark:text-black">
                <p className="font-bold text-xl text-white dark:text-black">{t("program.location.center")}</p>
                <p className="text-white dark:text-black">{t("program.location.address1")}</p>
                <p className="text-white dark:text-black">{t("program.location.address2")}</p>
                <div className="mt-6 pt-6 border-t border-white/20 dark:border-black/20 flex flex-col gap-4">
                  <p className="text-white dark:text-black">{t("program.location.contact")}: 9296820840, 9153021229</p>
                  <a href="https://wa.me/919296820840" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 font-bold uppercase hover:bg-green-600 transition-colors">
                    <MessageCircle className="w-5 h-5" /> WhatsApp Enquiry
                  </a>
                </div>
              </address>
            </div>
          </div>

          <div>
            <div className="card-brutal">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-foreground">
                <Clock className="w-6 h-6" /> {t("program.routine")}
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full font-mono text-left border-collapse text-foreground">
                  <thead>
                    <tr className="bg-foreground text-background">
                      <th className="p-3 border-b-2 border-foreground text-sm">{t("program.routine.class")}</th>
                      <th className="p-3 border-b-2 border-foreground text-sm">{t("program.routine.time")}</th>
                      <th className="p-3 border-b-2 border-foreground text-sm">{t("program.routine.schedule")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROUTINE_DATA.map((item, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted">
                        <td className="p-3 font-bold border-r border-border text-sm">{item.class}</td>
                        <td className="p-3 border-r border-border text-sm">{item.subjects}</td>
                        <td className="p-3 text-xs">{item.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/register">
                <BrutalButton variant="primary" size="lg" className="w-full md:w-auto text-xl py-4 px-12 animate-pulse">
                  Register for 3-Day Demo
                </BrutalButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
