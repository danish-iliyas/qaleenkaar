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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-background">
      <Header />

      {/* Hero Section */}
        <section className="relative h-[45vh]  min-h-[350px] lg:h-[66vh] bg-red-600 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Get in Touch"
            className="w-full h-full object-cover"
          />
          {/* MODIFIED: Gradient is more transparent for a clearer image */}
          <div className="absolute inset-0 bg-gradient-to-r from-brown/60 via-brown/50 to-brown/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="font-body text-xl text-white/90 leading-relaxed">
              We'd love to hear from you. Reach out for inquiries, appointments, or just to say hello.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-[#794299]">
                  Contact Information
                </h2>
                <p className="font-body text-lg text-[#7A4B7A] leading-relaxed">
                  Have questions? Need a quote? We're here to help with expert guidance and personalized solutions.
                </p>
              </div>

              <div className="space-y-6">
                {/* Phone & WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#794299]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#794299]">Phone & WhatsApp</h3>
                    <a href={`tel:${whatsappNumber}`} className="font-body text-[#7A4B7A] hover:text-[#62009b] transition-colors">
                      +91 123 456 7890
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#794299]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#794299]">Email</h3>
                    <a href={`mailto:${email}`} className="font-body text-[#7A4B7A] hover:text-[#62009b] transition-colors">
                      {email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#794299]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#794299]">Visit Our Studio</h3>
                    <p className="font-body text-[#7A4B7A]">
                      123 Heritage Lane, Crafts District<br />
                      Jaipur, Rajasthan 302001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg shadow-soft border border-black/5">
              <h2 className="font-display text-3xl font-bold mb-6 text-[#794299]">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form fields remain the same */}
                <div>
                  <label htmlFor="name" className="block font-body font-medium mb-2 text-[#794299]">Your Name *</label>
                  <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block font-body font-medium mb-2 text-[#794299]">Email Address *</label>
                  <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-body font-medium mb-2 text-[#794299]">Phone Number</label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label htmlFor="message" className="block font-body font-medium mb-2 text-[#794299]">Your Message *</label>
                  <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} placeholder="Tell us how we can help..." rows={5} />
                </div>
                <Button type="submit" size="lg" className="w-full bg-[#794299] hover:bg-[#62009b] text-white transition-all duration-200 ease-out transform hover:scale-[1.02]">
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