import { Layout } from "@/components/Layout";
import { BrutalButton } from "@/components/BrutalButton";
import { Link } from "wouter";
import { Clock, MapPin, Calendar, IndianRupee } from "lucide-react";

// Hardcoded Routine Data as per requirements
export const ROUTINE_DATA = [
  { class: "Class 9th", time: "08:00 AM - 10:00 AM", subjects: "Maths, Science" },
  { class: "Class 10th", time: "10:30 AM - 12:30 PM", subjects: "Maths, Science" },
  { class: "Class 11th", time: "02:00 PM - 04:00 PM", subjects: "Physics, Chem, Maths" },
  { class: "Class 12th", time: "04:30 PM - 06:30 PM", subjects: "Physics, Chem, Maths" },
];

export default function ProgramDetails() {
  return (
    <Layout>
      <div className="bg-neutral-50 border-b-4 border-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-6">Program Details</h1>
          <p className="font-mono text-xl max-w-2xl mx-auto">
            Everything you need to know about the schedule, curriculum, and logistics.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Info Cards */}
          <div className="space-y-8">
            <div className="card-brutal">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6" /> Program Overview
              </h2>
              <ul className="space-y-4 font-mono text-lg">
                <li className="flex items-start gap-4">
                  <span className="font-bold min-w-[100px]">Duration:</span>
                  <span>15 Days Intensive Bootcamp</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="font-bold min-w-[100px]">Start Date:</span>
                  <span>15th June, 2024</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="font-bold min-w-[100px]">Fees:</span>
                  <span className="bg-black text-white px-2 py-0.5 font-bold uppercase">100% Free</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="font-bold min-w-[100px]">Eligibility:</span>
                  <span>Students of Class 9th to 12th</span>
                </li>
              </ul>
            </div>

            <div className="card-brutal bg-neutral-900 text-white border-black">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6" /> Location
              </h2>
              <address className="font-mono not-italic text-lg space-y-2">
                <p className="font-bold text-xl">Sansa Learning Center</p>
                <p>2nd Floor, Galaxy Tower</p>
                <p>Near City Park, Main Road</p>
                <p>District Center</p>
                <div className="mt-6 pt-6 border-t border-neutral-700">
                  <p>Helpline: +91 98765 43210</p>
                  <p>Email: contact@sansalearn.com</p>
                </div>
              </address>
            </div>
          </div>

          {/* Right Column: Routine Table */}
          <div>
            <div className="card-brutal">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6" /> Daily Routine
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full font-mono text-left border-collapse">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="p-4 border-b-2 border-black">Class</th>
                      <th className="p-4 border-b-2 border-black">Timing</th>
                      <th className="p-4 border-b-2 border-black">Subjects</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROUTINE_DATA.map((item, index) => (
                      <tr key={index} className="border-b border-neutral-200 hover:bg-neutral-50">
                        <td className="p-4 font-bold border-r border-neutral-200">{item.class}</td>
                        <td className="p-4 border-r border-neutral-200">{item.time}</td>
                        <td className="p-4">{item.subjects}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 font-mono text-sm">
                <strong>Note:</strong> Students must arrive 15 minutes before their scheduled batch time. Bring a notebook and pen.
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
