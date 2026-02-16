import { useState, useEffect } from "react";
import { X, MapPin, MessageCircle } from "lucide-react";
import qrCodeImage from "@assets/Scan_For_Sansa_Learn_Coaching_Location_1769839600723.png";

export function LocationQRPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const showPopup = () => {
      setIsOpen(true);
    };

    const initialTimer = setTimeout(showPopup, 3000);
    const intervalTimer = setInterval(showPopup, 10 * 60 * 1000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-2xl max-w-sm w-full border-4 border-golden animate-in fade-in zoom-in duration-300">
        <div className="bg-golden p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-black font-bold uppercase">
            <MapPin className="w-5 h-5" />
            <span>Visit Our Coaching</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-black/10 rounded transition-colors"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>
        
        <div className="p-6 text-center">
          <p className="text-lg font-bold mb-4 text-foreground">
            Scan to Know the Location
          </p>
          
          <div className="bg-white p-4 rounded-lg inline-block mb-4 shadow-inner">
            <img 
              src={qrCodeImage} 
              alt="Scan for Sansa Learn Coaching Location" 
              className="w-48 h-48 mx-auto"
            />
          </div>
          
          <p className="text-sm text-muted-foreground font-mono mb-6">
            Chandmari Road, Kankarbagh<br/>
            Patna (Opposite Gali No. 06)
          </p>
          
          <div className="flex flex-col gap-3">
            <a 
              href="https://wa.me/919296820840" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-green-500 text-white font-bold py-3 px-6 uppercase text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> Chat / Call Enquiry
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-golden text-black font-bold py-2 px-6 uppercase text-sm hover:bg-golden/80 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
