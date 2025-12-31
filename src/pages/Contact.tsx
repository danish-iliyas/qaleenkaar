import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-carpet.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const whatsappNumber = "+911234567890";
  const email = "info@loomtales.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
                      +91 123 456 7890
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
                      Jaipur, Rajasthan 302001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 md:p-12">
              <h2 className="font-serif text-2xl md:text-3xl font-normal mb-8 text-black uppercase tracking-widest">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-sans text-xs font-bold mb-2 text-black uppercase tracking-widest"
                  >
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ENTER YOUR NAME"
                    className="bg-white border-gray-200 focus:border-black rounded-none h-12 placeholder:text-gray-300 placeholder:text-xs placeholder:uppercase placeholder:tracking-wider focus:ring-0"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-sans text-xs font-bold mb-2 text-black uppercase tracking-widest"
                  >
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ENTER YOUR EMAIL"
                    className="bg-white border-gray-200 focus:border-black rounded-none h-12 placeholder:text-gray-300 placeholder:text-xs placeholder:uppercase placeholder:tracking-wider focus:ring-0"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block font-sans text-xs font-bold mb-2 text-black uppercase tracking-widest"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="ENTER YOUR PHONE"
                    className="bg-white border-gray-200 focus:border-black rounded-none h-12 placeholder:text-gray-300 placeholder:text-xs placeholder:uppercase placeholder:tracking-wider focus:ring-0"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block font-sans text-xs font-bold mb-2 text-black uppercase tracking-widest"
                  >
                    Your Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="HOW CAN WE HELP?"
                    rows={5}
                    className="bg-white border-gray-200 focus:border-black rounded-none placeholder:text-gray-300 placeholder:text-xs placeholder:uppercase placeholder:tracking-wider focus:ring-0 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-900 text-white font-sans text-xs font-bold uppercase tracking-[0.2em] h-14 rounded-none transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
