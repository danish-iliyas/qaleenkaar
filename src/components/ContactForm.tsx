import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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
    <div className="bg-gray-50 p-4 md:p-12">
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
  );
};

export default ContactForm;
