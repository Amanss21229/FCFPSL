import logo from "@assets/file_00000000fc9c71f4959f7efd35bf788d_1769314870949.png";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdmin = location.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col font-body bg-white text-black selection:bg-black selection:text-white">
      {/* Header */}
      <header className="border-b-4 border-black sticky top-0 z-50 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-4 group">
            <img 
              src={logo} 
              alt="Sansa Learn Logo" 
              className="h-12 w-12 md:h-16 md:w-16 object-contain border-2 border-transparent group-hover:border-black p-1 transition-all rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-display font-black text-xl md:text-3xl leading-none tracking-tighter uppercase">Sansa Learn</span>
              <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-neutral-500 uppercase">Concept Foundation</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {!isAdmin ? (
              <>
                <Link href="/" className={cn("text-lg font-bold uppercase hover:underline decoration-4 underline-offset-4", location === "/" && "underline")}>Home</Link>
                <Link href="/program" className={cn("text-lg font-bold uppercase hover:underline decoration-4 underline-offset-4", location === "/program" && "underline")}>Program</Link>
                <Link href="/register">
                  <span className="bg-black text-white px-6 py-2 font-bold uppercase border-2 border-black hover:bg-white hover:text-black transition-colors">
                    Register Now
                  </span>
                </Link>
              </>
            ) : (
              <span className="font-mono text-sm bg-neutral-100 px-3 py-1 border border-black">ADMIN MODE</span>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 border-2 border-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && !isAdmin && (
          <div className="md:hidden border-t-2 border-black bg-neutral-50 p-4 flex flex-col gap-4">
             <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold uppercase py-2 border-b border-neutral-300">Home</Link>
             <Link href="/program" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold uppercase py-2 border-b border-neutral-300">Program Details</Link>
             <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold uppercase py-2 bg-black text-white text-center">Register Now</Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-neutral-100 py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-8 text-left">
            <div>
              <h4 className="text-xl font-black mb-4 uppercase">Sansa Learn</h4>
              <p className="font-mono text-sm leading-relaxed">
                Empowering students with strong conceptual foundations for a brighter academic future.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-black mb-4 uppercase">Contact</h4>
              <p className="font-mono text-sm">
                Near City Center<br/>
                Main Road, District<br/>
                +91 98765 43210
              </p>
            </div>
            <div>
              <h4 className="text-xl font-black mb-4 uppercase">Admin</h4>
              <Link href="/admin" className="text-sm font-bold underline decoration-2 underline-offset-4 hover:bg-black hover:text-white inline-block p-1">
                Admin Login
              </Link>
            </div>
          </div>
          <div className="border-t-2 border-neutral-300 pt-8 font-mono text-xs text-neutral-500">
            © {new Date().getFullYear()} SANSA LEARN. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
