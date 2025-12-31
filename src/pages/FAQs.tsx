import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImage from "@/assets/hero-carpet.jpg";

const FAQs = () => {
  const faqs = [
    {
      question: "How often should I have my carpet professionally cleaned?",
      answer:
        "We recommend professional cleaning every 12-18 months for most carpets. High-traffic areas or homes with pets may benefit from cleaning every 6-12 months.",
    },
    {
      question: "What's the difference between your washing services?",
      answer:
        "We offer Hand Washing (for delicate pieces), Steam Cleaning (for deep cleaning and allergens), and Dry Cleaning (for sensitive materials). Our experts will recommend the best method for your specific item.",
    },
    {
      question: "Can you repair moth damage to my carpet?",
      answer:
        "Yes, we specialize in repairing moth damage. Our artisans can reweave damaged areas, matching the original pattern, color, and pile height to make the repair virtually invisible.",
    },
    {
      question: "How long does the restoration process take?",
      answer:
        "A simple cleaning typically takes 5-7 days. Minor repairs may require 2-3 weeks, while extensive restoration projects can take 4-8 weeks or longer. We provide an estimated timeline after assessing your piece.",
    },
    {
      question: "Do you offer pickup and delivery services?",
      answer:
        "Yes, we provide convenient pickup and delivery services within our local area and can arrange secure, insured shipping for clients located elsewhere.",
    },
  ];

  return (
    <div className="bg-background">
      <Header />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative h-[45vh]  min-h-[350px] lg:h-[66vh] bg-black flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="FAQs"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="font-serif text-5xl md:text-6xl font-normal text-white mb-6 uppercase tracking-widest">
              Frequently Asked Questions
            </h1>
            <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed uppercase tracking-widest max-w-xl mx-auto">
              Find answers to common questions about our services, processes,
              and carpet care best practices.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Accordion
              type="single"
              collapsible
              className="space-y-0 border-t border-gray-200"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-transparent border-b border-gray-200 px-0"
                >
                  <AccordionTrigger className="font-serif text-lg text-left font-normal text-black hover:text-gray-600 py-8 hover:no-underline uppercase tracking-wide">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-sm text-gray-500 leading-relaxed pb-8 uppercase tracking-wide">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Still Have Questions */}
            <div className="mt-24 p-8 bg-gray-50 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-normal mb-6 text-black uppercase tracking-widest">
                Still Have Questions?
              </h2>
              <p className="font-sans text-sm text-gray-500 mb-10 leading-relaxed uppercase tracking-wide">
                Can't find the answer you're looking for? Our team is here to
                help with personalized guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/+911234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-black hover:bg-gray-900 text-white font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 min-w-[200px]"
                >
                  WhatsApp Us
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-black hover:bg-black hover:text-white text-black font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 min-w-[200px]"
                >
                  Contact Form
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQs;
