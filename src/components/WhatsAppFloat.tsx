import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  const whatsappNumber = "+911234567890";

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      // ✅ CHANGED: Added 'hidden' and 'lg:block'
      className="fixed bottom-7 right-4 z-50 group hidden lg:block"
      aria-label="Contact us on WhatsApp"
    >
      <div className="relative">
        {/* Pulsing rings */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
        <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-50" />

        {/* Main button */}
        <div className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 group-hover:scale-110">
          <MessageCircle className="w-6 h-6" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppFloat;