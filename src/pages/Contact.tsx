import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-carpet.jpg";

const Contact = () => {
  const whatsappNumber = "+917982698231";
  const email = "Qaleenkaar@gmail.com";

  return (
    <div className="bg-background">
      <Header />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative h-[45vh]  min-h-[350px] lg:h-[66vh] bg-black flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Get in Touch"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="font-serif text-5xl md:text-6xl font-normal text-white mb-6 uppercase tracking-widest">
              Get in Touch
            </h1>
            <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed uppercase tracking-widest max-w-xl mx-auto">
              We'd love to hear from you. Reach out for inquiries, appointments,
              or just to say hello.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-normal mb-6 text-black uppercase tracking-widest">
                  Contact Information
                </h2>
                <p className="font-sans text-sm text-gray-500 leading-relaxed uppercase tracking-wide">
                  Have questions? Need a quote? We're here to help with expert
                  guidance and personalized solutions.
                </p>
              </div>

              <div className="space-y-10">
                {/* Phone & WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-black stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-black uppercase tracking-widest mb-2">
                      Phone & WhatsApp
                    </h3>
                    <a
                      href={`tel:${whatsappNumber}`}
                      className="font-sans text-sm text-gray-600 hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5"
                    >
                      +91 987 193 0986
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5 text-black stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-black uppercase tracking-widest mb-2">
                      Email
                    </h3>
                    <a
                      href={`mailto:${email}`}
                      className="font-sans text-sm text-gray-600 hover:text-black transition-colors border-b border-transparent hover:border-black pb-0.5"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-black stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-black uppercase tracking-widest mb-2">
                      Visit Our Studio
                    </h3>
                    <p className="font-sans text-sm text-gray-600 leading-relaxed uppercase tracking-wide">
                      123 Heritage Lane, Crafts District
                      <br />
                      New Delhi, Delhi 110001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
