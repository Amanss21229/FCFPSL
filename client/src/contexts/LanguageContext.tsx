import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "hero.badge": "Offline Batch Registration Open",
    "hero.title1": "Sansa Learn",
    "hero.title2": "Offline Coaching",
    "hero.subtitle": "Online Registration for Class 4th to 12th & Droppers. Expert-led coaching for Boards, NEET, and JEE.",
    "hero.whatIs": "Our Programs",
    "hero.register": "Register Now",
    "nav.home": "Home",
    "nav.program": "Programs",
    "nav.register": "Register",
    "features.concept.title": "3 Days Demo",
    "features.concept.desc": "Get 3 days of free demo classes to experience our teaching methodology before enrolling.",
    "features.mentor.title": "Expert Faculty",
    "features.mentor.desc": "Learn from Dr. Manisha Kumari (Chemistry/Science), Aman Kumar (Math), and Nisha Kumari (Grammar).",
    "features.material.title": "Weekly Tests",
    "features.material.desc": "Every Saturday we conduct regular tests to monitor student progress and performance.",
    "cta.title": "Book Your 3-Day Demo",
    "cta.subtitle": "Start your journey with Sansa Learn. Register today and get a 3-day free trial of our offline classes.",
    "cta.button": "Register for Demo",
    "footer.tagline": "Sansa Learn: Building strong foundations for students from Class 4th to 12th & Droppers.",
    "footer.contact": "Contact",
    "footer.admin": "Admin",
    "program.title": "Our Programs",
    "program.about": "About Sansa Learn",
    "program.duration": "Batch Type",
    "program.dates": "Demo Class",
    "program.fees": "Affordable Fees",
    "program.batch": "Batch Size",
    "program.subjects": "Subjects Offered",
    "program.location": "Location",
    "program.contact": "Enquiry",
    "program.guidance": "Our Expert Faculty",
    "program.routine": "Course Structure",
    "program.capacity": "Personalized Attention",
    "program.eligibility": "Class 4th to 12th & Droppers",
    "program.guidance.under": "Led by Experts",
    "program.teachers": "Dr. Manisha Kumari (Sci/Chem), Aman Kumar (Math), Nisha Kumari (Grammar)",
    "program.location.title": "Location & Contact",
    "program.location.center": "SANSA LEARN - Offline Coaching",
    "program.location.address1": "Chandmari Road, Kankarbagh, Patna",
    "program.location.address2": "(Opposite Gali No. 06)",
    "program.location.contact": "WhatsApp/Call",
    "program.routine.class": "Class Level",
    "program.routine.time": "Subjects",
    "program.routine.schedule": "Focus Areas",
    "program.cta": "Register for 3-Day Demo",
    "program.hero.subtitle": "Professional Offline Coaching in Kankarbagh, Patna",
    "register.title": "Online Registration",
    "register.subtitle": "Fill out the form below to secure your 3-day demo class.",
    "register.studentName": "Student Name",
    "register.gender": "Gender",
    "register.gender.male": "Male",
    "register.gender.female": "Female",
    "register.gender.other": "Other",
    "register.gender.placeholder": "Select Gender",
    "register.class": "Target Class",
    "register.class.placeholder": "Select Class",
    "register.fatherName": "Father's Name",
    "register.motherName": "Mother's Name",
    "register.whatsapp": "Parent WhatsApp Number",
    "register.alternate": "Alternate Number",
    "register.address": "Address",
    "register.submit": "Register for Demo",
    "register.photo": "Student Photo (Optional)",
    "register.photo.hint": "JPG, PNG allowed. Max 2MB.",
    "register.details.student": "Student Details",
    "register.details.parent": "Parent Details",
    "register.details.contact": "Contact Info",
    "register.footer.note": "By submitting, you agree to receive program updates via WhatsApp.",
    "thankyou.title": "Registration Done!",
    "thankyou.message": "Your 3-day demo class is booked. We will contact you soon.",
    "thankyou.download": "Download Receipt",
  },
  hi: {
    "hero.badge": "ऑफलाइन बैच रजिस्ट्रेशन शुरू",
    "hero.title1": "सांसा लर्न",
    "hero.title2": "ऑफलाइन कोचिंग",
    "hero.subtitle": "कक्षा 4 से 12वीं और ड्रॉपर के लिए ऑनलाइन रजिस्ट्रेशन। बोर्ड, NEET और JEE के लिए विशेषज्ञ कोचिंग।",
    "hero.whatIs": "हमारे प्रोग्राम",
    "hero.register": "अभी रजिस्टर करें",
    "nav.home": "होम",
    "nav.program": "प्रोग्राम",
    "nav.register": "रजिस्ट्रेशन",
    "features.concept.title": "3 दिन का डेमो",
    "features.concept.desc": "नामांकन से पहले हमारी शिक्षण पद्धति का अनुभव करने के लिए 3 दिनों की मुफ्त डेमो क्लास प्राप्त करें।",
    "features.mentor.title": "विशेषज्ञ फैकल्टी",
    "features.mentor.desc": "डॉ. मनीषा कुमारी (केमिस्ट्री/विज्ञान), अमन कुमार (गणित) और निशा कुमारी (ग्रामर) से सीखें।",
    "features.material.title": "साप्ताहिक टेस्ट",
    "features.material.desc": "हर शनिवार को हम छात्र की प्रगति और प्रदर्शन की निगरानी के लिए नियमित टेस्ट आयोजित करते हैं।",
    "cta.title": "3-दिवसीय डेमो बुक करें",
    "cta.subtitle": "सांसा लर्न के साथ अपनी यात्रा शुरू करें। आज ही रजिस्टर करें और हमारी ऑफलाइन क्लासेस का 3-दिवसीय मुफ्त ट्रायल प्राप्त करें।",
    "cta.button": "डेमो के लिए रजिस्टर करें",
    "footer.tagline": "सांसा लर्न: कक्षा 4 से 12वीं और ड्रॉपर तक के छात्रों के लिए मजबूत नींव का निर्माण।",
    "footer.contact": "संपर्क",
    "footer.admin": "एडमिन",
    "program.title": "हमारे प्रोग्राम",
    "program.about": "सांसा लर्न के बारे में",
    "program.duration": "बैच का प्रकार",
    "program.dates": "डेमो क्लास",
    "program.fees": "सस्ती फीस",
    "program.batch": "बैच साइज",
    "program.subjects": "उपलब्ध विषय",
    "program.location": "स्थान",
    "program.contact": "पूछताछ",
    "program.guidance": "हमारी विशेषज्ञ फैकल्टी",
    "program.routine": "कोर्स स्ट्रक्चर",
    "program.capacity": "व्यक्तिगत ध्यान",
    "program.eligibility": "कक्षा 4 से 12वीं और ड्रॉपर",
    "program.guidance.under": "विशेषज्ञों के नेतृत्व में",
    "program.teachers": "डॉ. मनीषा कुमारी (विज्ञान/केमिस्ट्री), अमन कुमार (गणित), निशा कुमारी (ग्रामर)",
    "program.location.title": "स्थान और संपर्क",
    "program.location.center": "सांसा लर्न - ऑफलाइन कोचिंग",
    "program.location.address1": "चांदमारी रोड, कंकड़बाग, पटना",
    "program.location.address2": "(गली नंबर 06 के सामने)",
    "program.location.contact": "व्हाट्सएप/कॉल",
    "program.routine.class": "कक्षा स्तर",
    "program.routine.time": "विषय",
    "program.routine.schedule": "फोकस क्षेत्र",
    "program.cta": "3-दिवसीय डेमो के लिए रजिस्टर करें",
    "program.hero.subtitle": "कंकड़बाग, पटना में प्रोफेशनल ऑफलाइन कोचिंग",
    "register.title": "ऑनलाइन रजिस्ट्रेशन",
    "register.subtitle": "अपनी 3-दिवसीय डेमो क्लास सुरक्षित करने के लिए नीचे दिया गया फॉर्म भरें।",
    "register.studentName": "छात्र का नाम",
    "register.gender": "लिंग",
    "register.gender.male": "पुरुष",
    "register.gender.female": "महिला",
    "register.gender.other": "अन्य",
    "register.gender.placeholder": "लिंग चुनें",
    "register.class": "लक्ष्य कक्षा",
    "register.class.placeholder": "कक्षा चुनें",
    "register.fatherName": "पिता का नाम",
    "register.motherName": "माता का नाम",
    "register.whatsapp": "अभिभावक व्हाट्सएप नंबर",
    "register.alternate": "वैकल्पिक नंबर",
    "register.address": "पता",
    "register.submit": "डेमो के लिए रजिस्टर करें",
    "register.photo": "छात्र की फोटो (वैकल्पिक)",
    "register.photo.hint": "JPG, PNG की अनुमति है। अधिकतम 2MB।",
    "register.details.student": "छात्र का विवरण",
    "register.details.parent": "अभिभावक का विवरण",
    "register.details.contact": "संपर्क विवरण",
    "register.footer.note": "सबमिट करके, आप व्हाट्सएप के माध्यम से प्रोग्राम अपडेट प्राप्त करने के लिए सहमत हैं।",
    "thankyou.title": "रजिस्ट्रेशन सफल!",
    "thankyou.message": "आपकी 3-दिवसीय डेमो क्लास बुक हो गई है। हम जल्द ही आपसे संपर्क करेंगे।",
    "thankyou.download": "रसीद डाउनलोड करें",
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
