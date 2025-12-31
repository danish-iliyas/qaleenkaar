import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  const whatsappNumber = "+911234567890";

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      // Fixed position, hidden on mobile, visible on desktop
      className="fixed bottom-8 right-8 z-50 group hidden lg:block"
      aria-label="Contact us on WhatsApp"
    >
      <div className="relative">
        {/* Main button - Sharp Square, Black */}
        <div
          className="
          relative 
          bg-black 
          text-white 
          w-14 h-14 
          flex items-center justify-center 
          shadow-none 
          transition-all duration-500 
          ease-[cubic-bezier(0.25,1,0.5,1)] 
          group-hover:-translate-y-2
          border border-transparent
          rounded-full
          hover:bg-white hover:text-black hover:border-black
        "
        >
          <MessageCircle className="w-6 h-6 stroke-[1.5]" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppFloat;
