import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import washingImg from "@/assets/service-washing.jpg";
import repairImg from "@/assets/service-repair.jpg";
import restorationImg from "@/assets/service-restoration.jpg";
import exchangeImg from "@/assets/service-exchange.jpg";
import heroImage from "@/assets/hero-carpet.jpg";
import processImage from "../assets/sales-service.jpg";

const carpetServices = [
  {
    id: "professional-washing",
    title: "Professional Washing",
    description: [
      "Proper rug cleaning is vital for preserving the appearance and longevity of your precious rugs. The frequency of deep cleaning depends on factors like rug type, foot traffic, and the presence of pets or allergens. Generally, it's best to schedule a deep clean every 12 to 18 months.",
      "When dealing with hand-knotted or hand-woven rugs, which are delicately crafted, a specialized approach is required.",
    ],
    bulletPoints: [
      "Rug Inspection",
      "Dust and Grit Removal",
      "Pre-Treatment",
      "Full Immersion Cleaning",
      "Rug Drying",
      "Inspection and Delivery",
    ],
    videoSrc: "https://www.youtube.com/embed/rslXOypyNx0",
    layout: "video-left",
  },
  {
    id: "expert-repairing",
    title: "Expert Repairings",
    description: [
      "Expertise and skill are crucial when it to repairing damaged rugs, guaranteeing a successful restoration. Restoring a rug with minor damage is relatively easier compared to one with extensive damage. Our team of professional rug repair specialists possesses the necessary knowledge and experience to address various types of rug damage.",
    ],
    bulletPoints: [
      "Fringe repair/replacement",
      "Rug overcasting/Binding",
      "Reweaving/Rafu",
      "Color Restoration",
      "Delamination on Tufted Rugs",
    ],
    videoSrc: "https://www.youtube.com/embed/xpsrgBVnC4I",
    layout: "video-right",
  },
  {
    id: "complete-restoration",
    title: "Complete Restoration",
    description: [
      "It's always better to restore than replace. Our finest technicians will ensure your old rug matches your new interior. We bring vintage and antique carpets back to their former glory with our comprehensive service.",
    ],
    bulletPoints: [
      "Fresh new look to old rugs",
      "Match with your interior",
      "Restoration is better than replacement.",
    ],
    videoSrc: "https://www.youtube.com/embed/zThfR7ecetw",
    layout: "video-left",
  },
];

const shawlServices = [
  {
    id: "delicate-shawl-washing",
    title: "Delicate Shawl Washing",
    description: [
      "Specialized hand-washing for precious Pashmina and Kashmiri shawls, using gentle techniques that preserve the delicate fibers and intricate embroidery of your treasured items.",
    ],
    bulletPoints: [
      "Color-fastness testing",
      "Gentle, PH-neutral hand-wash",
      "Natural air drying",
      "Soft steam finishing",
    ],
    videoSrc: "https://www.youtube.com/embed/NP_jXK0Kk9k",
    layout: "video-left",
  },
  {
    id: "shawl-restoration",
    title: "Shawl Restoration",
    description: [
      "Expert restoration of vintage and heirloom shawls. Our artisans meticulously repair tears, re-weave holes, and revive faded colors using authentic materials and time-honored methods.",
    ],
    bulletPoints: [
      "Thread-by-thread reweaving",
      "Natural dye color matching",
      "Tear and hole repair",
      "Fringe and border restoration",
    ],
    videoSrc: "https://www.youtube.com/embed/NnhLLxUr9zE",
    layout: "video-right",
  },
];

const otherServices = [
  {
    id: "sell-exchange",
    title: "Sell & Exchange Program",
    description: [
      "Upgrade your collection with our exclusive sell and exchange program. We offer fair valuations for your quality pieces, allowing you to trade them for a new treasure from our curated collection.",
    ],
    bulletPoints: [
      "Expert valuation",
      "Trade-in for new items",
      "Consignment options",
      "Direct purchasing",
    ],
    videoSrc: "https://www.youtube.com/embed/M3HPNC3CLyk",
    layout: "video-right",
  },
];

const ServiceSection = ({
  services,
  sectionTitle,
  bgColor,
  sectionRef,
  id,
}: {
  services: any[];
  sectionTitle: string;
  bgColor: string;
  sectionRef: React.RefObject<HTMLElement>;
  id: string;
}) => {
  return (
    <section ref={sectionRef} id={id}>
      <div className="container mx-auto px-4">
        {/* Main section heading - larger */}
        <div className="text-center pt-4 mb-6">
          <Link
            to="#"
            className="inline-flex items-center text-black uppercase tracking-[0.2em] text-base md:text-lg lg:text-xl font-medium group"
          >
            <span className="border-b border-black font-bold pb-1 group-hover:border-b-2 transition-all">
              {sectionTitle}
            </span>
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="space-y-0">
          {services.map((service, index) => (
            <div
              key={index}
              id={service.id}
              className={`py-16 scroll-mt-20 ${index % 2 === 0
                ? "bg-gradient-to-b from-secondary/30 to-background"
                : "bg-white"
                }`}
            >
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
                  <div
                    className={`${index % 2 === 1 ? "lg:order-last" : ""
                      } flex items-center justify-center`}
                  >
                    <div className="rounded-lg w-full h-[16rem] lg:h-[20rem] overflow-hidden shadow-lg border border-black/5">
                      <iframe
                        src={`${service.videoSrc}?autoplay=1&mute=1&loop=1&controls=1&showinfo=0`}
                        title={service.title}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="w-full h-full object-cover"
                      ></iframe>
                    </div>
                  </div>

                  <div className="font-serif flex flex-col justify-start">
                    {/* Subheading with Book Now Button - smaller sizes */}
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6">
                      <h3 className="text-xl md:text-2xl font-medium text-gray-800 tracking-wider">
                        {service.title}
                      </h3>
                      <a
                        href={`https://wa.me/917982698231?text=Hi, I'm interested in ${encodeURIComponent(service.title)} service. Please provide more details.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-black uppercase tracking-[0.2em] text-xs font-medium group"
                      >
                        <span className="border-b border-black font-bold pb-0.5 group-hover:border-b-2 transition-all">
                          Book Now
                        </span>
                        <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>

                    {service.description.map((text: string, i: number) => (
                      <p
                        key={i}
                        className="text-base text-gray-600 mb-4 leading-relaxed"
                      >
                        {text}
                      </p>
                    ))}

                    <ul className="list-disc list-inside space-y-2 mt-4 text-base text-gray-600">
                      {service.bulletPoints.map((point: string, i: number) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const carpetRef = useRef<HTMLDivElement>(null);
  const shawlRef = useRef<HTMLDivElement>(null);
  const otherRef = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();

  useEffect(() => {
    // Handle hash navigation after page loads
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [hash]);

  return (
    <div className="bg-white">
      <Header />
      <img
        src={processImage}
        alt="Before rug restoration"
        className="rounded-lg shadow-lg"
      />

      {/* Carpet Services Section */}
      <ServiceSection
        services={carpetServices}
        sectionTitle="Carpet Services"
        bgColor="bg-amber-50"
        sectionRef={carpetRef}
        id="carpet"
      />

      {/* Shawl Services Section */}
      <ServiceSection
        services={shawlServices}
        sectionTitle="Shawl Services"
        bgColor="bg-white"
        sectionRef={shawlRef}
        id="shawl"
      />

      {/* Other Services Section */}
      <ServiceSection
        services={otherServices}
        sectionTitle="Other Services"
        bgColor="bg-amber-5Other"
        sectionRef={otherRef}
        id="other"
      />

      {/* Our Advantages Section - White */}
      <section className="py-4 bg-white border-t border-black/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-800 tracking-wider whitespace-nowrap">
              OUR ADVANTAGES
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <svg
                    className="w-12 h-12 text-gray-800 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-gray-800 mb-2">
                  Hassle-Free Process
                </h3>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <svg
                    className="w-12 h-12 text-gray-800 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-gray-800 mb-2">
                  Pick-up and Drop
                </h3>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <svg
                    className="w-12 h-12 text-gray-800 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 4.354a4 4 0 110 5.292m0 0H8.646a4 4 0 010-5.292m3.354 0H12m0 0h3.354a4 4 0 000 5.292M9 12H5.646m6.354 0h3.354"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-medium text-gray-800 mb-2">
                  Experienced Team
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
