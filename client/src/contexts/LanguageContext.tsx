import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "hero.badge": "Limited Seats Available",
    "hero.title1": "Free Concept",
    "hero.title2": "Foundation Program",
    "hero.subtitle": "A 15-day intensive program to solidify your core concepts in Mathematics, Science, and English Grammar.",
    "hero.whatIs": "What is this Program?",
    "hero.register": "Register For Free",
    "nav.home": "Home",
    "nav.program": "Program",
    "nav.register": "Register Now",
    "features.concept.title": "Concept Clarity",
    "features.concept.desc": "Focus on understanding 'Why' and 'How' rather than rote memorization.",
    "features.mentor.title": "Expert Mentors",
    "features.mentor.desc": "Learn from experienced educators who specialize in foundational subjects.",
    "features.material.title": "Free Test Series",
    "features.material.desc": "Get free test series at the end of each batch to assess your progress.",
    "cta.title": "Start Your Journey Today",
    "cta.subtitle": "Don't let weak basics hold you back. Join the foundation program and build a strong academic future.",
    "cta.button": "Secure Your Spot Now",
    "footer.tagline": "Empowering students with strong conceptual foundations for a brighter academic future.",
    "footer.contact": "Contact",
    "footer.admin": "Admin",
    "program.title": "Program Details",
    "program.about": "About the Program",
    "program.duration": "Duration",
    "program.dates": "Dates",
    "program.fees": "Fees",
    "program.batch": "Batch Size",
    "program.subjects": "Subjects Covered",
    "program.location": "Location",
    "program.contact": "Contact Numbers",
    "program.guidance": "Academic Guidance",
    "program.routine": "Class-wise Daily Routine",
    "program.capacity": "Only 20 students per batch",
    "program.eligibility": "Class 5th to 12th students",
    "program.guidance.under": "Academic Guidance Under",
    "program.teachers": "Different subject teachers for each subject. Free test series at the end!",
    "program.location.title": "Location & Contact",
    "program.location.center": "SANSA LEARN - Offline Coaching",
    "program.location.address1": "Chandmari Road, Kankarbagh, Patna",
    "program.location.address2": "(Opposite Gali No. 06)",
    "program.location.contact": "Contact",
    "program.routine.class": "Class",
    "program.routine.time": "Time",
    "program.routine.schedule": "Schedule",
    "program.cta": "Register For Free Now",
    "program.hero.subtitle": "100% Offline | Classroom Based Coaching by SANSA LEARN",
    "register.title": "Register for Free",
    "register.studentName": "Student Name",
    "register.gender": "Gender",
    "register.class": "Class",
    "register.fatherName": "Father's Name",
    "register.motherName": "Mother's Name",
    "register.whatsapp": "Parent WhatsApp Number",
    "register.alternate": "Alternate Number (Optional)",
    "register.address": "Address",
    "register.submit": "Submit Registration",
    "thankyou.title": "Registration Successful!",
    "thankyou.message": "Thank you for registering for Free Concept Foundation Program",
    "thankyou.download": "Download Registration PDF",
  },
  hi: {
    "hero.badge": "सीमित सीटें उपलब्ध",
    "hero.title1": "मुफ्त कॉन्सेप्ट",
    "hero.title2": "फाउंडेशन प्रोग्राम",
    "hero.subtitle": "गणित, विज्ञान और अंग्रेजी व्याकरण में आपकी मूल अवधारणाओं को मजबूत करने के लिए 15 दिवसीय गहन कार्यक्रम।",
    "hero.whatIs": "यह प्रोग्राम क्या है?",
    "hero.register": "मुफ्त पंजीकरण करें",
    "nav.home": "होम",
    "nav.program": "प्रोग्राम",
    "nav.register": "अभी पंजीकरण करें",
    "features.concept.title": "कॉन्सेप्ट क्लैरिटी",
    "features.concept.desc": "रटने के बजाय 'क्यों' और 'कैसे' समझने पर ध्यान दें।",
    "features.mentor.title": "विशेषज्ञ गुरु",
    "features.mentor.desc": "अनुभवी शिक्षकों से सीखें जो मूलभूत विषयों में विशेषज्ञ हैं।",
    "features.material.title": "मुफ्त टेस्ट सीरीज",
    "features.material.desc": "अपनी प्रगति का आकलन करने के लिए प्रत्येक बैच के अंत में मुफ्त टेस्ट सीरीज प्राप्त करें।",
    "cta.title": "आज ही अपनी यात्रा शुरू करें",
    "cta.subtitle": "कमजोर बेसिक्स को अपना रास्ता न रोकने दें। फाउंडेशन प्रोग्राम से जुड़ें और मजबूत शैक्षणिक भविष्य बनाएं।",
    "cta.button": "अभी अपनी सीट सुरक्षित करें",
    "footer.tagline": "छात्रों को मजबूत वैचारिक नींव के साथ उज्जवल शैक्षणिक भविष्य के लिए सशक्त बनाना।",
    "footer.contact": "संपर्क",
    "footer.admin": "व्यवस्थापक",
    "program.title": "प्रोग्राम विवरण",
    "program.about": "प्रोग्राम के बारे में",
    "program.duration": "अवधि",
    "program.dates": "तिथियां",
    "program.fees": "शुल्क",
    "program.batch": "बैच आकार",
    "program.subjects": "विषय",
    "program.location": "स्थान",
    "program.contact": "संपर्क नंबर",
    "program.guidance": "शैक्षणिक मार्गदर्शन",
    "program.routine": "कक्षा-वार दैनिक दिनचर्या",
    "program.capacity": "प्रति बैच केवल 20 छात्र",
    "program.eligibility": "कक्षा 5वीं से 12वीं के छात्र",
    "program.guidance.under": "शैक्षणिक मार्गदर्शन के तहत",
    "program.teachers": "प्रत्येक विषय के लिए अलग-अलग विषय शिक्षक। अंत में मुफ्त टेस्ट सीरीज!",
    "program.location.title": "स्थान और संपर्क",
    "program.location.center": "SANSA LEARN - ऑफलाइन कोचिंग",
    "program.location.address1": "चांदमारी रोड, कंकड़बाग, पटना",
    "program.location.address2": "(गली नंबर 06 के सामने)",
    "program.location.contact": "संपर्क",
    "program.routine.class": "कक्षा",
    "program.routine.time": "समय",
    "program.routine.schedule": "अनुसूची",
    "program.cta": "अभी मुफ्त पंजीकरण करें",
    "program.hero.subtitle": "100% ऑफलाइन | SANSA LEARN द्वारा क्लासरूम आधारित कोचिंग",
    "register.title": "मुफ्त पंजीकरण करें",
    "register.studentName": "छात्र का नाम",
    "register.gender": "लिंग",
    "register.class": "कक्षा",
    "register.fatherName": "पिता का नाम",
    "register.motherName": "माता का नाम",
    "register.whatsapp": "अभिभावक व्हाट्सएप नंबर",
    "register.alternate": "वैकल्पिक नंबर (वैकल्पिक)",
    "register.address": "पता",
    "register.submit": "पंजीकरण सबमिट करें",
    "thankyou.title": "पंजीकरण सफल!",
    "thankyou.message": "मुफ्त कॉन्सेप्ट फाउंडेशन प्रोग्राम में पंजीकरण के लिए धन्यवाद",
    "thankyou.download": "पंजीकरण PDF डाउनलोड करें",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sansa-language") as Language;
      if (saved) return saved;
    }
    return "en";
  });

  const toggleLanguage = () => {
    const newLang = language === "en" ? "hi" : "en";
    setLanguage(newLang);
    localStorage.setItem("sansa-language", newLang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
