import logo from "@assets/file_00000000fc9c71f4959f7efd35bf788d_1769314870949.png";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Moon, Sun, Languages } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdmin = location.startsWith("/admin");
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col font-body bg-background text-foreground">
      {/* Header */}
      <header className="border-b-2 border-golden sticky top-0 z-50 bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Sansa Learn Logo" 
              className="h-10 w-10 md:h-14 md:w-14 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-display font-black text-lg md:text-2xl leading-none tracking-tighter uppercase text-golden">Sansa Learn</span>
              <span className="font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase">Concept Foundation</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {!isAdmin ? (
              <>
                <Link href="/" className={cn("text-base font-bold uppercase hover:text-golden transition-colors", location === "/" && "text-golden")}>
                  {t("nav.home")}
                </Link>
                <Link href="/program" className={cn("text-base font-bold uppercase hover:text-golden transition-colors", location === "/program" && "text-golden")}>
                  {t("nav.program")}
                </Link>
                <Link href="/register">
                  <span className="btn-3d-primary px-5 py-2 uppercase text-sm">
                    {t("nav.register")}
                  </span>
                </Link>
              </>
            ) : (
              <span className="font-mono text-sm bg-secondary px-3 py-1 border border-golden">ADMIN MODE</span>
            )}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 border-2 border-golden hover:bg-golden hover:text-black transition-colors"
              data-testid="button-theme-toggle"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} className="text-golden" />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 border-2 border-golden hover:bg-golden hover:text-black transition-colors flex items-center gap-1"
              data-testid="button-language-toggle"
              title={language === "en" ? "Switch to Hindi" : "Switch to English"}
            >
              <Languages size={20} />
              <span className="font-mono text-xs font-bold">{language.toUpperCase()}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 border-2 border-golden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && !isAdmin && (
          <div className="md:hidden border-t-2 border-golden bg-secondary p-4 flex flex-col gap-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold uppercase py-2 border-b border-border">
              {t("nav.home")}
            </Link>
            <Link href="/program" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold uppercase py-2 border-b border-border">
              {t("nav.program")}
            </Link>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold uppercase py-2 btn-3d-primary text-center">
              {t("nav.register")}
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-golden bg-secondary py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-8 text-left">
            <div>
              <h4 className="text-xl font-black mb-4 uppercase text-golden">Sansa Learn</h4>
              <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                {t("footer.tagline")}
              </p>
            </div>
            <div>
              <h4 className="text-xl font-black mb-4 uppercase text-golden">{t("footer.contact")}</h4>
              <p className="font-mono text-sm text-muted-foreground">
                Chandmari Road, Kankarbagh<br/>
                Patna (Opposite Gali No. 06)<br/>
                9296820840 | 9153021229
              </p>
            </div>
            <div>
              <h4 className="text-xl font-black mb-4 uppercase text-golden">{t("footer.admin")}</h4>
              <Link href="/admin" className="text-sm font-bold text-golden underline decoration-2 underline-offset-4 hover:opacity-80 inline-block p-1">
                Admin Login
              </Link>
            </div>
          </div>
          <div className="border-t-2 border-border pt-8 font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} SANSA LEARN. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
