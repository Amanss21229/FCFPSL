import { useState, useEffect } from "react";
import { X, ChevronRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PADDING = 10;

interface TourStep {
  target: string | null;
  icon: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
}

const tourSteps: TourStep[] = [
  {
    target: null,
    icon: "🎓",
    titleEn: "Welcome to Sansa Learn",
    titleHi: "सांसा लर्न में आपका स्वागत है",
    descEn: "Patna's trusted offline coaching for Class 4th–12th, NEET & JEE. Let us show you around!",
    descHi: "पटना की विश्वसनीय ऑफलाइन कोचिंग। आइए, वेबसाइट के सभी फीचर जानें!",
  },
  {
    target: "[data-testid='link-home']",
    icon: "🏠",
    titleEn: "Home",
    titleHi: "होम",
    descEn: "Return to the main page anytime. Learn about our coaching, features, and more.",
    descHi: "कभी भी मुख्य पेज पर वापस जाएं। हमारी कोचिंग और सुविधाओं के बारे में जानें।",
  },
  {
    target: "[data-testid='link-programs']",
    icon: "📚",
    titleEn: "Programs",
    titleHi: "प्रोग्राम",
    descEn: "Explore all our courses, subjects, batch details, and faculty information.",
    descHi: "हमारे सभी कोर्स, विषय, बैच विवरण और फैकल्टी जानकारी देखें।",
  },
  {
    target: "[data-testid='link-register']",
    icon: "✍️",
    titleEn: "Register Now",
    titleHi: "रजिस्टर करें",
    descEn: "Book your FREE 3-day demo class. Fill the form and we'll contact you soon!",
    descHi: "मुफ्त 3-दिवसीय डेमो क्लास बुक करें। फॉर्म भरें और हम जल्द संपर्क करेंगे!",
  },
  {
    target: "[data-testid='button-theme-toggle']",
    icon: "🌙",
    titleEn: "Dark / Light Mode",
    titleHi: "डार्क / लाइट मोड",
    descEn: "Toggle between light and dark theme for a comfortable reading experience.",
    descHi: "आरामदायक पढ़ने के लिए लाइट और डार्क थीम के बीच स्विच करें।",
  },
  {
    target: "[data-testid='button-language-toggle']",
    icon: "🌐",
    titleEn: "Language Toggle",
    titleHi: "भाषा बदलें",
    descEn: "Switch between English and Hindi anytime using this button.",
    descHi: "इस बटन से कभी भी अंग्रेजी और हिंदी के बीच स्विच करें।",
  },
];

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function getCardStyle(targetRect: Rect | null): React.CSSProperties {
  const CARD_W = 320;
  const CARD_H = 220;

  if (!targetRect) {
    return {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: CARD_W,
      zIndex: 9999,
    };
  }

  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const spaceBelow = vh - (targetRect.top + targetRect.height + PADDING);

  let top: number;
  if (spaceBelow >= CARD_H + 20) {
    top = targetRect.top + targetRect.height + PADDING + 10;
  } else {
    top = Math.max(10, targetRect.top - CARD_H - PADDING - 10);
  }

  let left = targetRect.left + targetRect.width / 2 - CARD_W / 2;
  left = Math.max(16, Math.min(left, vw - CARD_W - 16));

  return {
    position: "fixed",
    top,
    left,
    width: CARD_W,
    zIndex: 9999,
  };
}

function PostTourPopup({ language, onClose }: { language: string; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 9995, background: "rgba(0,0,0,0.55)" }}
      onClick={handleClose}
    >
      <div
        className="bg-white dark:bg-neutral-900 border-2 border-[#D4AF37] shadow-2xl rounded-lg overflow-hidden mx-4"
        style={{ maxWidth: 360, width: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#D4AF37] px-5 py-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-black" />
          <span className="font-black font-mono text-xs uppercase tracking-widest text-black">
            Sansa Learn
          </span>
        </div>

        <div className="px-6 py-5 text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="font-black text-lg uppercase tracking-wide text-[#D4AF37] mb-2">
            {language === "en" ? "You're All Set!" : "आप तैयार हैं!"}
          </h3>
          <p className="text-sm text-foreground dark:text-neutral-300 leading-relaxed">
            {language === "en"
              ? "Now you know your way around! Register for a FREE demo class today and start your success journey with Sansa Learn."
              : "अब आप वेबसाइट से परिचित हैं! आज ही मुफ्त डेमो क्लास के लिए रजिस्टर करें और सांसा लर्न के साथ अपनी सफलता की यात्रा शुरू करें।"}
          </p>

          <div className="mt-5 flex gap-3 justify-center">
            <a
              href="/register"
              className="bg-[#D4AF37] text-black font-black text-xs uppercase px-5 py-2 rounded-sm hover:bg-[#c9a227] transition-colors"
              data-testid="popup-register-link"
            >
              {language === "en" ? "Register Free" : "मुफ्त रजिस्टर करें"}
            </a>
            <button
              onClick={handleClose}
              className="text-xs font-mono text-muted-foreground hover:text-foreground underline transition-colors"
              data-testid="popup-close-button"
            >
              {language === "en" ? "Maybe Later" : "बाद में"}
            </button>
          </div>
        </div>

        <div className="h-1 bg-[#D4AF37]" />
      </div>
    </div>
  );
}

export function WebsiteTour() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const { language } = useLanguage();

  const current = tourSteps[step];
  const isLast = step === tourSteps.length - 1;

  useEffect(() => {
    const t = setTimeout(() => {
      setStarted(true);
      setVisible(true);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible || !started || !current.target) {
      setTargetRect(null);
      return;
    }
    const el = document.querySelector(current.target) as HTMLElement | null;
    if (el) {
      const r = el.getBoundingClientRect();
      setTargetRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    }
  }, [step, visible, started, current.target]);

  const endTour = () => {
    setVisible(false);
    setShowPopup(true);
  };

  const handleNext = () => {
    if (isLast) endTour();
    else setStep((s) => s + 1);
  };

  const handleSkip = () => {
    endTour();
  };

  if (!started) return null;

  const cardStyle = getCardStyle(targetRect);

  return (
    <>
      {showPopup && (
        <PostTourPopup language={language} onClose={() => setShowPopup(false)} />
      )}

      {visible && (
        <>
          {!targetRect && (
            <div
              className="fixed inset-0 pointer-events-none"
              style={{ background: "rgba(0,0,0,0.68)", zIndex: 9990 }}
            />
          )}

          {targetRect && (
            <div
              className="fixed pointer-events-none"
              style={{
                top: targetRect.top - PADDING,
                left: targetRect.left - PADDING,
                width: targetRect.width + PADDING * 2,
                height: targetRect.height + PADDING * 2,
                boxShadow: "0 0 0 9999px rgba(0,0,0,0.68)",
                border: "2px solid #D4AF37",
                borderRadius: 6,
                zIndex: 9991,
              }}
            />
          )}

          <div style={cardStyle} className="pointer-events-auto">
            <div className="bg-white dark:bg-neutral-900 border-2 border-[#D4AF37] shadow-2xl rounded-lg overflow-hidden">
              <div className="bg-[#D4AF37] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span className="font-black font-mono text-xs uppercase tracking-widest text-black">
                    Sansa Learn — Tour
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-black">
                    {step + 1} / {tourSteps.length}
                  </span>
                  <button
                    onClick={handleSkip}
                    className="p-0.5 hover:bg-black/10 rounded transition-colors"
                    data-testid="button-tour-close"
                    title="Skip Tour"
                  >
                    <X className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>

              <div className="px-5 py-4">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl leading-none mt-0.5">{current.icon}</span>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-wide text-[#D4AF37] leading-snug">
                      {language === "en" ? current.titleEn : current.titleHi}
                    </h3>
                    <p className="text-sm text-foreground dark:text-neutral-300 mt-1 leading-relaxed">
                      {language === "en" ? current.descEn : current.descHi}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {tourSteps.map((_, i) => (
                    <span
                      key={i}
                      className="block h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === step ? 20 : 6,
                        background: i === step ? "#D4AF37" : "#D4AF3740",
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleSkip}
                    className="text-xs font-mono text-muted-foreground hover:text-foreground underline transition-colors"
                    data-testid="button-tour-skip"
                  >
                    {language === "en" ? "Skip Tour" : "छोड़ें"}
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-[#D4AF37] text-black font-bold text-xs uppercase px-4 py-1.5 flex items-center gap-1 hover:bg-[#c9a227] transition-colors rounded-sm"
                    data-testid="button-tour-next"
                  >
                    {isLast
                      ? language === "en" ? "Finish" : "समाप्त"
                      : language === "en" ? "Next" : "आगे"}
                    {!isLast && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
