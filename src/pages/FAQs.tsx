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
      answer: "We recommend professional cleaning every 12-18 months for most carpets. High-traffic areas or homes with pets may benefit from cleaning every 6-12 months.",
    },
    {
      question: "What's the difference between your washing services?",
      answer: "We offer Hand Washing (for delicate pieces), Steam Cleaning (for deep cleaning and allergens), and Dry Cleaning (for sensitive materials). Our experts will recommend the best method for your specific item.",
    },
    {
      question: "Can you repair moth damage to my carpet?",
      answer: "Yes, we specialize in repairing moth damage. Our artisans can reweave damaged areas, matching the original pattern, color, and pile height to make the repair virtually invisible.",
    },
    {
      question: "How long does the restoration process take?",
      answer: "A simple cleaning typically takes 5-7 days. Minor repairs may require 2-3 weeks, while extensive restoration projects can take 4-8 weeks or longer. We provide an estimated timeline after assessing your piece.",
    },
    {
      question: "Do you offer pickup and delivery services?",
      answer: "Yes, we provide convenient pickup and delivery services within our local area and can arrange secure, insured shipping for clients located elsewhere.",
    },
  ];

  return (
    <div className="bg-background">
      <Header />

      {/* Hero Section */}
       <section className="relative h-[45vh]  min-h-[350px] lg:h-[66vh] bg-red-600 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="FAQs"
            className="w-full h-full object-cover"
          />
          {/* MODIFIED: Gradient is more transparent for a clearer image */}
          <div className="absolute inset-0 bg-gradient-to-r from-brown/60 via-brown/50 to-brown/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="font-body text-xl text-white/90 leading-relaxed">
              Find answers to common questions about our services, processes, and carpet care best practices.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-lg shadow-soft px-6 border-0"
                >
                  <AccordionTrigger className="font-display text-lg text-left font-semibold text-foreground hover:text-[#794299] py-6 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Still Have Questions */}
            <div className="mt-16 p-8 bg-secondary rounded-lg text-center">
              <h2 className="font-display text-3xl font-bold mb-4 text-[#794299]">
                Still Have Questions?
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-6 leading-relaxed">
                Can't find the answer you're looking for? Our team is here to help with personalized guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/+911234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#794299] hover:bg-[#62009b] text-white font-body font-medium rounded-lg transition-colors duration-200 ease-out transform hover:scale-[1.02]"
                >
                  WhatsApp Us
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-card hover:bg-[#62009b]/80 hover:text-white font-body font-medium rounded-lg transition-colors duration-200 ease-out transform hover:scale-[1.02]"
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