import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SellExchangeModal from "../components/SellExchangeModal";
import processImage from "../assets/sales-service.jpg";
import { serviceApi, ServiceItem } from "@/services/serviceApi";

// Component to render each service section dynamically
const ServiceCard = ({
  service,
  index,
  onBookNow,
}: {
  service: ServiceItem;
  index: number;
  onBookNow?: (serviceId: number) => void;
}) => {
  // Parse bullet points from comma-separated string
  const bulletPoints = service.bullet_points
    ? service.bullet_points.split(",").map((point) => point.trim()).filter(Boolean)
    : [];

  return (
    <div
      id={`service-${service.id}`}
      className={`py-16 scroll-mt-20 ${index % 2 === 0
        ? "bg-gradient-to-b from-secondary/30 to-background"
        : "bg-white"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
          {/* Video/Image Section */}
          <div
            className={`${index % 2 === 1 ? "lg:order-last" : ""
              } flex items-center justify-center`}
          >
            <div className="rounded-lg w-full h-[16rem] lg:h-[20rem] overflow-hidden shadow-lg border border-black/5">
              {service.video_src ? (() => {
                // Extract video ID from various YouTube URL formats
                const getYouTubeVideoId = (url: string): string | null => {
                  const patterns = [
                    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
                    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
                    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
                  ];
                  for (const pattern of patterns) {
                    const match = url.match(pattern);
                    if (match) return match[1];
                  }
                  return null;
                };
                const videoId = getYouTubeVideoId(service.video_src);
                const embedUrl = videoId
                  ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1`
                  : service.video_src;
                return (
                  <iframe
                    src={embedUrl}
                    title={service.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  ></iframe>
                );
              })() : (
                <img
                  src={service.image || "/placeholder.jpg"}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="font-serif flex flex-col justify-start">
            <h3 className="text-xl md:text-2xl font-medium text-gray-800 tracking-wider mb-2">
              {service.title}
            </h3>

            {/* Book Now Button */}
            {service.title?.toLowerCase().includes("sell") ||
              service.title?.toLowerCase().includes("exchange") ? (
              <button
                onClick={() => service.id && onBookNow?.(service.id)}
                className="inline-flex items-center text-black uppercase tracking-[0.2em] text-xs font-medium group mb-4"
              >
                <span className="border-b border-black font-bold pb-0.5 group-hover:border-b-2 transition-all">
                  Book Now
                </span>
                <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <a
                href={`https://wa.me/917982698231?text=Hi, I'm interested in ${encodeURIComponent(
                  service.title
                )} service. Please provide more details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-black uppercase tracking-[0.2em] text-xs font-medium group mb-4"
              >
                <span className="border-b border-black font-bold pb-0.5 group-hover:border-b-2 transition-all">
                  Book Now
                </span>
                <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>
            )}

            {/* Description */}
            {service.description && (
              <p className="text-base text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>
            )}

            {/* Bullet Points */}
            {bulletPoints.length > 0 && (
              <ul className="list-disc list-inside space-y-2 mt-4 text-base text-gray-600">
                {bulletPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceSection = ({
  services,
  sectionTitle,
  sectionId,
  sectionRef,
  onBookNow,
}: {
  services: ServiceItem[];
  sectionTitle: string;
  sectionId: string;
  sectionRef: React.RefObject<HTMLElement>;
  onBookNow?: (serviceId: number) => void;
}) => {
  return (
    <section ref={sectionRef} id={sectionId}>
      <div className="container mx-auto px-4">
        <div className="text-center pt-4 mb-6">
          <Link
            to="#"
            className="inline-flex items-center text-black uppercase tracking-[0.2em] text-base md:text-lg lg:text-xl font-medium group"
          >
            <span className="border-b md:text-4xl border-black font-bold pb-1 group-hover:border-b-2 transition-all">
              {sectionTitle}
            </span>
          </Link>
        </div>

        <div className="space-y-0">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onBookNow={onBookNow}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const carpetRef = useRef<HTMLDivElement>(null);
  const shawlRef = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();
  const [sellExchangeModalOpen, setSellExchangeModalOpen] = useState(false);

  // Dynamic service state
  const [carpetServices, setCarpetServices] = useState<ServiceItem[]>([]);
  const [shawlServices, setShawlServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const [carpets, shawls] = await Promise.all([
          serviceApi.getAll("carpet"),
          serviceApi.getAll("shawl"),
        ]);
        setCarpetServices(carpets);
        setShawlServices(shawls);
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Handle hash navigation after page loads and services are fetched
  useEffect(() => {
    if (hash && !loading) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [hash, loading]);

  const handleBookNow = (serviceId: number) => {
    // Check if the service is sell/exchange type
    const allServices = [...carpetServices, ...shawlServices];
    const service = allServices.find((s) => s.id === serviceId);
    if (
      service?.title?.toLowerCase().includes("sell") ||
      service?.title?.toLowerCase().includes("exchange")
    ) {
      setSellExchangeModalOpen(true);
    }
  };

  return (
    <div className="bg-white">
      <Header />
      <img
        src={processImage}
        alt="Before rug restoration"
        className="rounded-lg shadow-lg"
      />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-black" />
          <span className="ml-3 text-gray-600">Loading services...</span>
        </div>
      ) : (
        <>
          {/* Carpet Services Section */}
          {carpetServices.length > 0 && (
            <ServiceSection
              services={carpetServices}
              sectionTitle="Carpet Services"
              sectionId="carpet"
              sectionRef={carpetRef}
              onBookNow={handleBookNow}
            />
          )}

          {/* Shawl Services Section */}
          {shawlServices.length > 0 && (
            <ServiceSection
              services={shawlServices}
              sectionTitle="Shawl Services"
              sectionId="shawl"
              sectionRef={shawlRef}
              onBookNow={handleBookNow}
            />
          )}

          {/* Empty State */}
          {carpetServices.length === 0 && shawlServices.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No services available yet.</p>
            </div>
          )}
        </>
      )}

      {/* Sell & Exchange Modal */}
      <SellExchangeModal
        open={sellExchangeModalOpen}
        onOpenChange={setSellExchangeModalOpen}
      />

      {/* Our Advantages Section */}
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
