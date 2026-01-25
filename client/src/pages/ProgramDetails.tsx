import { Layout } from "@/components/Layout";
import { BrutalButton } from "@/components/BrutalButton";
import { Link } from "wouter";
import { Clock, MapPin, Calendar, IndianRupee } from "lucide-react";

// Hardcoded Routine Data as per requirements
export const ROUTINE_DATA = [
  { class: "CLASS 11th", time: "1:00 PM – 2:00 PM", subjects: "Science", days: "Monday to Saturday" },
  { class: "CLASS 12th", time: "2:00 PM – 3:00 PM", subjects: "Science", days: "Monday to Saturday" },
  { class: "CLASS 10th", time: "3:00 PM – 4:00 PM", subjects: "Science, Mathematics, English Grammar", days: "Mon-Tue: Sci | Wed-Thu: Math | Fri-Sat: Eng" },
  { class: "CLASS 5th", time: "4:00 PM – 5:00 PM", subjects: "Mathematics, English Grammar, Science", days: "Mon-Tue: Math | Wed-Thu: Eng | Fri-Sat: Sci" },
  { class: "CLASS 6th", time: "5:00 PM – 6:00 PM", subjects: "English Grammar, Science, Mathematics", days: "Mon-Tue: Eng | Wed-Thu: Sci | Fri-Sat: Math" },
  { class: "CLASS 7th", time: "6:00 PM – 7:00 PM", subjects: "Science, Mathematics, English Grammar", days: "Mon-Tue: Sci | Wed-Thu: Math | Fri-Sat: Eng" },
  { class: "CLASS 8th", time: "7:00 PM – 8:00 PM", subjects: "Mathematics, English Grammar, Science", days: "Mon-Tue: Math | Wed-Thu: Eng | Fri-Sat: Sci" },
  { class: "CLASS 9th", time: "8:00 PM – 9:00 PM", subjects: "English Grammar, Science, Mathematics", days: "Mon-Tue: Eng | Wed-Thu: Sci | Fri-Sat: Math" },
];

export default function ProgramDetails() {
  return (
    <Layout>
      <div className="bg-neutral-50 border-b-4 border-black py-16 dark:bg-neutral-900 dark:border-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-6 text-foreground">FREE CONCEPT FOUNDATION PROGRAM</h1>
          <p className="font-mono text-xl max-w-2xl mx-auto text-muted-foreground">
            100% Offline | Classroom Based Coaching by SANSA LEARN
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          <div className="space-y-8">
            <div className="card-brutal">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-foreground">
                <Calendar className="w-6 h-6" /> Program Overview
              </h2>
              <ul className="space-y-4 font-mono text-lg text-foreground">
                <li className="flex items-start gap-4">
                  <span className="font-bold min-w-[120px]">Duration:</span>
                  <span>15 Days (2 Weeks)</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="font-bold min-w-[120px]">Dates:</span>
                  <span>2 Feb 2026 - 15 Feb 2026</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="font-bold min-w-[120px]">Fees:</span>
                  <span className="bg-primary text-primary-foreground px-2 py-0.5 font-bold uppercase">100% FREE</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="font-bold min-w-[120px]">Eligibility:</span>
                  <span>Class 5th to 12th students</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="font-bold min-w-[120px]">Capacity:</span>
                  <span className="text-destructive font-bold">Only 20 students per batch</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="font-bold min-w-[120px]">Subjects:</span>
                  <span>Maths, Science, English Grammar</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-muted border-l-4 border-primary font-mono text-sm">
                Academic Guidance Under: <strong>Dr. Manisha Kumari</strong> (Head – Sansa Learn)
                <br />Different subject teachers for each subject. Free test series at the end!
              </div>
            </div>

            <div className="card-brutal bg-foreground text-background border-background">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6" /> Location & Contact
              </h2>
              <address className="font-mono not-italic text-lg space-y-2">
                <p className="font-bold text-xl">SANSA LEARN - Offline Coaching</p>
                <p>Chandmari Road, Kankarbagh, Patna</p>
                <p>(Opposite Gali No. 06)</p>
                <div className="mt-6 pt-6 border-t border-background/20">
                  <p>Contact: 9296820840, 9153021229</p>
                </div>
              </address>
            </div>
          </div>

          <div>
            <div className="card-brutal">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-foreground">
                <Clock className="w-6 h-6" /> Daily Routine
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full font-mono text-left border-collapse text-foreground">
                  <thead>
                    <tr className="bg-foreground text-background">
                      <th className="p-3 border-b-2 border-foreground text-sm">Class</th>
                      <th className="p-3 border-b-2 border-foreground text-sm">Time</th>
                      <th className="p-3 border-b-2 border-foreground text-sm">Schedule</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROUTINE_DATA.map((item, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted">
                        <td className="p-3 font-bold border-r border-border text-sm">{item.class}</td>
                        <td className="p-3 border-r border-border text-sm whitespace-nowrap">{item.time}</td>
                        <td className="p-3 text-xs">{item.days}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/register">
                <BrutalButton variant="primary" size="lg" className="w-full md:w-auto text-xl py-4 px-12 animate-pulse">
                  Register For Free Now
                </BrutalButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
