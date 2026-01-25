import { Layout } from "@/components/Layout";
import { BrutalButton } from "@/components/BrutalButton";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@assets/file_00000000fc9c71f4959f7efd35bf788d_1769314870949.png";

export default function Landing() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-28 overflow-hidden border-b-2 border-golden">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ 
               backgroundImage: "radial-gradient(circle, hsl(43 96% 56%) 1px, transparent 1px)", 
               backgroundSize: "30px 30px" 
             }}>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-golden text-black px-4 py-1 font-mono font-bold text-sm mb-6 uppercase tracking-widest transform -rotate-2">
              {t("hero.badge")}
            </span>
            
            <h1 className="text-4xl md:text-7xl font-black mb-2 uppercase tracking-tight leading-none">
              {t("hero.title1")}
            </h1>
            <h1 className="text-4xl md:text-7xl font-black mb-8 text-golden uppercase tracking-tight leading-none">
              {t("hero.title2")}
            </h1>

            {/* 3D Logo Display */}
            <motion.div 
              className="my-10 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img 
                src={logo} 
                alt="Sansa Learn Logo" 
                className="logo-3d w-40 h-40 md:w-56 md:h-56 object-contain"
              />
            </motion.div>
            
            <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 font-mono text-muted-foreground">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link href="/program">
                <BrutalButton size="lg" className="w-full md:w-auto min-w-[280px]">
                  {t("hero.whatIs")} <BookOpen className="ml-2 w-5 h-5" />
                </BrutalButton>
              </Link>
              <Link href="/register">
                <BrutalButton variant="primary" size="lg" className="w-full md:w-auto min-w-[280px]">
                  {t("hero.register")} <ArrowRight className="ml-2 w-5 h-5" />
                </BrutalButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-8 h-8" />}
              title={t("features.concept.title")}
              desc={t("features.concept.desc")}
            />
            <FeatureCard 
              icon={<Star className="w-8 h-8" />}
              title={t("features.mentor.title")}
              desc={t("features.mentor.desc")}
            />
            <FeatureCard 
              icon={<BookOpen className="w-8 h-8" />}
              title={t("features.material.title")}
              desc={t("features.material.desc")}
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 border-t-2 border-golden bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase text-golden">{t("cta.title")}</h2>
          <p className="text-lg font-mono mb-12 max-w-2xl mx-auto opacity-80">
            {t("cta.subtitle")}
          </p>
          <Link href="/register">
            <button className="btn-3d-primary px-12 py-5 text-xl font-black uppercase">
              {t("cta.button")}
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
      <div className="bg-golden text-black p-3 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 uppercase">{title}</h3>
      <p className="font-mono text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  );
}
