import { Layout } from "@/components/Layout";
import { BrutalButton } from "@/components/BrutalButton";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b-4 border-black">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ 
               backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", 
               backgroundSize: "20px 20px" 
             }}>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-black text-white px-4 py-1 font-mono font-bold text-sm mb-6 uppercase tracking-widest transform -rotate-2">
              Limited Seats Available
            </span>
            <h1 className="text-5xl md:text-8xl font-black mb-2 uppercase tracking-tight leading-none">
              Free Concept
            </h1>
            <h1 className="text-5xl md:text-8xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-black uppercase tracking-tight leading-none" style={{ WebkitTextStroke: "2px black" }}>
              Foundation Program
            </h1>
            
            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-12 font-mono text-neutral-600">
              A 15-day intensive boot camp designed to solidify your core concepts in Physics, Chemistry, and Mathematics.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link href="/program">
                <BrutalButton size="lg" className="w-full md:w-auto min-w-[200px]">
                  What is this? <BookOpen className="ml-2 w-5 h-5" />
                </BrutalButton>
              </Link>
              <Link href="/register">
                <BrutalButton variant="primary" size="lg" className="w-full md:w-auto min-w-[200px]">
                  Register Free <ArrowRight className="ml-2 w-5 h-5" />
                </BrutalButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-8 h-8" />}
              title="Concept Clarity"
              desc="Focus on understanding 'Why' and 'How' rather than rote memorization."
            />
            <FeatureCard 
              icon={<Star className="w-8 h-8" />}
              title="Expert Mentors"
              desc="Learn from experienced educators who specialize in competitive exams."
            />
            <FeatureCard 
              icon={<BookOpen className="w-8 h-8" />}
              title="Study Material"
              desc="Get comprehensive notes and problem sets completely free of cost."
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 border-t-4 border-black bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase">Start Your Journey Today</h2>
          <p className="text-xl font-mono mb-12 max-w-2xl mx-auto opacity-80">
            Don't let weak basics hold you back. Join the foundation program and build a career-ready mindset.
          </p>
          <Link href="/register">
            <button className="bg-white text-black px-12 py-5 text-xl font-black uppercase hover:scale-105 transition-transform shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]">
              Secure Your Spot Now
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="card-brutal flex flex-col items-start h-full"
    >
      <div className="bg-black text-white p-3 mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 uppercase">{title}</h3>
      <p className="font-mono text-neutral-600 leading-relaxed">{desc}</p>
    </motion.div>
  );
}
