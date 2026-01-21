import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

// Helper function to convert service title to a URL-friendly slug
const titleToSlug = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
};
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import heroImage from "@/assets/hero-carpet.jpg";
import washingImg from "@/assets/service-washing.jpg";
import repairImg from "@/assets/service-repair.jpg";
import restorationImg from "@/assets/service-restoration.jpg";
import exchangeImg from "@/assets/service-exchange.jpg";
import cleaningImg from "@/assets/service-cleaning.jpg";
import consultationImg from "@/assets/consultation-image.png";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import Slider from "react-slick";
import { InView } from "react-intersection-observer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import CustomerReviews from "@/components/customerReview";
import ContactForm from "@/components/ContactForm";
import { useState, useEffect } from "react";
import TrustSection from "@/components/TrustSection";
import { serviceApi } from "@/services/serviceApi";

const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://hotpink-tapir-344575.hostingersite.com/api";

// --- Helper Componentas ---

const NextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} !flex !items-center !justify-center !right-3 !z-20 bg-white hover:bg-black text-black hover:text-white w-8 h-8 border border-black/20 hover:border-black transition-all duration-300`}
      onClick={onClick}
    >
      <span className="text-lg font-bold">{"›"}</span>
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} !flex !items-center !justify-center !left-3 !z-20 bg-white hover:bg-black text-black hover:text-white w-8 h-8 border border-black/20 hover:border-black transition-all duration-300`}
      onClick={onClick}
    >
      <span className="text-lg font-bold">{"‹"}</span>
    </div>
  );
};

const PWAInstallPrompt = ({ deferredPrompt, onInstall, onDismiss }: any) => {
  if (!deferredPrompt) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-xl sm:rounded-xl shadow-2xl p-6 w-full max-w-sm">
        <h3 className="font-serif text-xl font-bold text-black mb-3 flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-yellow-500" /> Install Loom
          Tales App
        </h3>
        <p className="text-gray-700 mb-6">
          Get quick access! Install our app to save Loom Tales right to your
          phone's home screen.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            onClick={onDismiss}
            variant="outline"
            className="border-black text-black"
          >
            Not Now
          </Button>
          <Button onClick={onInstall} className="bg-black hover:bg-gray-800">
            Install App
          </Button>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<"carpet" | "shawl">("carpet");
  const [latestCollections, setLatestCollections] = useState<any[]>([]);
  const [isLoadingCollections, setIsLoadingCollections] = useState(true);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [collectionDropdownOpen, setCollectionDropdownOpen] = useState(false);

  // --- API LOGIC: Latest 4 from each ---
  useEffect(() => {
    const fetchLatestProducts = async () => {
      setIsLoadingCollections(true);
      try {
        const [carpetRes, shawlRes] = await Promise.all([
          fetch(`${API_BASE}/products/?type=Carpet`),
          fetch(`${API_BASE}/products/?type=Shawl`),
        ]);
        const carpetData = await carpetRes.json();
        const shawlData = await shawlRes.json();
        const carpets =
          (carpetData.status === "success" ? carpetData.data : carpetData) ||
          [];
        const shawls =
          (shawlData.status === "success" ? shawlData.data : shawlData) || [];
        setLatestCollections([...carpets.slice(0, 4), ...shawls.slice(0, 4)]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingCollections(false);
      }
    };
    fetchLatestProducts();
  }, []);

  // --- PWA LOGIC ---
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
      if (/Mobi|Android/i.test(navigator.userAgent)) setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    (installPrompt as any).prompt();
    (installPrompt as any).userChoice.then(() => {
      setInstallPrompt(null);
      setShowPrompt(false);
    });
  };

  // --- AUTO-SCROLL for Our Work section (5 seconds) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === workItems.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- CAROUSEL SETTINGS ---
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);

  const carouselSlides = [
    { type: "image", src: heroImage, alt: "Handcrafted masterpieces" },
    { type: "image", src: collection1, alt: "Traditional Persian Carpets" },
    { type: "image", src: collection2, alt: "Vintage Kashmiri Shawls" },
  ];

  const workItems = [
    {
      id: 1,
      before: "https://qaleen.com/public/uploads/images/small/71448/71448.jpg",
      after: "https://qaleen.com/public/uploads/images/small/37769/37769.jpg",
    },
    {
      id: 2,
      before: "https://qaleen.com/public/uploads/images/small/71448/71448.jpg",
      after: "https://qaleen.com/public/uploads/images/small/37769/37769.jpg",
    },
  ];

  const [carpetServices, setCarpetServices] = useState<any[]>([]);
  const [shawlServices, setShawlServices] = useState<any[]>([]);

  // Fetch Services from API
  useEffect(() => {
    const getServices = async () => {
      try {
        const carpets = await serviceApi.getAll("carpet");
        const shawls = await serviceApi.getAll("shawl");
        setCarpetServices(carpets);
        setShawlServices(shawls);
      } catch (err) {
        console.error("Failed to load services", err);
      }
    };
    getServices();
  }, []);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? workItems.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev === workItems.length - 1 ? 0 : prev + 1));

  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppFloat />

      {showPrompt && (
        <PWAInstallPrompt
          deferredPrompt={installPrompt}
          onInstall={handleInstallClick}
          onDismiss={() => setShowPrompt(false)}
        />
      )}

      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] lg:h-[100vh] w-full flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0" ref={emblaRef}>
          <div className="flex h-full">
            {carouselSlides.map((slide, index) => (
              <div className="relative flex-[0_0_100%] h-full" key={index}>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 w-full pb-16 lg:pb-20  text-center animate-fade-in">
          <Link
            to="/contact"
            className="inline-flex items-center border lg:py-4 py-2 px-4  border-white text-white uppercase tracking-[0.2em] text-xs lg:text-sm font-medium group"
          >
            <span className=" group-hover:border-b-2 transition-all">
              Get Free Quote
            </span>
            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* --- CURATED SERVICES (DUAL CARE TABS) --- */}
      <section className="py-8 pb-4 md:py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center">
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-black uppercase tracking-wider mb-4">
            OUR CURATED Services
          </h2>
          <div className="flex justify-center mb-8">
            <div className="inline-flex gap-[8px] p-1 ">
              <button
                onClick={() => setActiveTab("carpet")}
                className={`px-8 py-3 md:px-16 border border-black font-serif uppercase tracking-[0.2em] text-[11px] md:text-xs transition-all duration-500 ${activeTab === "carpet"
                  ? "bg-black text-white"
                  : "bg-white text-gray-800 hover:text-gray-900"
                  }`}
              >
                Carpets
              </button>
              <button
                onClick={() => setActiveTab("shawl")}
                className={`px-8 py-3 md:px-16 border border-black font-serif uppercase tracking-[0.2em] text-[11px] md:text-xs transition-all duration-500 ${activeTab === "shawl"
                  ? "bg-black text-white"
                  : "bg-white text-gray-800 hover:text-gray-900"
                  }`}
              >
                Shawls
              </button>
            </div>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-2">
            {(activeTab === "carpet" ? carpetServices : shawlServices).map(
              (service, index) => (
                <InView key={index} triggerOnce threshold={0.1}>
                  {({ ref, inView }) => (
                    <div
                      ref={ref}
                      className={`group flex flex-col w-full cursor-pointer transition-all duration-700 ${inView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                        }`}
                    >
                      {/* Image Container - Clean, Sharp, slight gray bg for loading */}
                      <Link
                        to={`/services#service-${service.id}`}
                        className="block  w-full"
                      >
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#f5f5f5] mb-4">
                          <img
                            src={service.image || "/placeholder.jpg"}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        </div>

                        {/* Text Container - Minimal, Sans-Serif, Title Case like screenshot */}
                        <div className="flex flex-col items-center text-center">
                          <h3 className="font-sans text-sm   md:text-sm lg:text-base font-bold text-black tracking-wide">
                            {service.title}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  )}
                </InView>
              )
            )}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/services"
              className="inline-flex items-center text-black uppercase tracking-[0.2em] text-sm md:text-sm lg:text-lg  font-medium group"
            >
              <span className="border-b  border-black pb-1 group-hover:border-b-2 transition-all">
                View All Services
              </span>
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <TrustSection />

      {/* --- OUR WORK TRANSFORMATION --- */}
      <section className="w-full bg-[#fdfcfd] py-4 md:py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          <div className="flex flex-col items-center mb-6 lg:mb-12">
            <Link
              to="#"
              className="inline-flex items-center text-black uppercase tracking-[0.2em] text-sm md:text-sm lg:text-lg  font-medium group"
            >
              <span className="border-b border-black font-bold pb-1 group-hover:border-b-2 transition-all">
                Our Work
              </span>
              {/* <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
            </Link>
          </div>
          <div className="relative flex flex-col items-center w-full max-w-6xl mx-auto">
            <div className="flex items-center px-8 lg:px-0 justify-center w-full gap-2 md:gap-12">
              <button
                onClick={handlePrev}
                className="hidden lg:flex p-4 text-gray-300 hover:text-black transition-colors"
              >
                <ChevronLeft className="w-10 h-10 stroke-[1px]" />
              </button>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 items-end">
                <div className="relative group">
                  <div className="absolute -top-4 left-4 z-20 bg-white px-3 py-1 shadow-sm">
                    <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-gray-500">
                      Before
                    </span>
                  </div>
                  <div className=" overflow-hidden shadow-lg border border-gray-100">
                    <img
                      src={workItems[currentIndex].before}
                      className="w-full h-80 sm:h-[550px] object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="relative group md:-translate-y-8">
                  <div className="absolute -top-3 right-4 z-20 bg-black px-4 py-1 shadow-md">
                    <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-white">
                      After
                    </span>
                  </div>
                  <div className="overflow-hidden shadow-  border border-gray-100">
                    <img
                      src={workItems[currentIndex].after}
                      className="w-full h-80 sm:h-[550px] object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleNext}
                className="hidden lg:flex p-4 text-gray-300 hover:text-black transition-colors"
              >
                <ChevronRight className="w-10 h-10 stroke-[1px]" />
              </button>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full mt-4 gap-2 px-4">
              <div className="hidden md:block font-serif text-sm tracking-widest text-gray-400">
                <span className="text-gray-900">0{currentIndex + 1}</span> / 0
                {workItems.length}
              </div>
              <div className="flex justify-center gap-3">
                {workItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-[2px] transition-all duration-500 ease-in-out ${index === currentIndex
                      ? "bg-black w-12"
                      : "bg-gray-200 w-6 hover:bg-gray-300"
                      }`}
                  />
                ))}
              </div>
              <div className="flex lg:hidden gap-10">
                <button onClick={handlePrev} className="p-2 text-black">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={handleNext} className="p-2 text-black">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- YOUTUBE VIDEO SECTION --- */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
          src="https://www.youtube.com/embed/JTA6VKeiRMY?autoplay=1&mute=1&loop=1&playlist=JTA6VKeiRMY&controls=0&showinfo=0&rel=0"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube Background Video"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 h-full flex items-center justify-center container mx-auto px-4 text-center">
          <h2 className="font-sans text-2xl md:text-3xl font-light text-white uppercase tracking-widest animate-fade-in">
            Because you deserve to shine!
          </h2>
        </div>
      </section>

      {/* --- DYNAMIC COLLECTIONS CAROUSEL --- */}
      <section className="py-8 md:py-16  relative z-30">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 animate-fade-in">
            <Link
              to="#"
              className="inline-flex items-center text-black uppercase tracking-[0.2em] text-sm md:text-sm lg:text-lg  font-medium group"
            >
              <span className="border-b border-black font-bold pb-1 group-hover:border-b-2 transition-all">
                Latest Arrivals
              </span>
              {/* <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
            </Link>
          </div>
          <div className="relative">
            {isLoadingCollections ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-black" />
              </div>
            ) : (
              <Slider
                dots={false}
                infinite
                speed={800}
                slidesToShow={2}
                slidesToScroll={1}
                autoplay
                autoplaySpeed={3500}
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
                responsive={[
                  { breakpoint: 768, settings: { slidesToShow: 1 } },
                ]}
              >
                {latestCollections.map((item) => (
                  <div key={item.id} className="px-2 sm:px-4">
                    <Link to={`/product/${item.id}`}>
                      <div className="group relative overflow-hidden bg-card shadow-soft hover:shadow-hover transition-all duration-700">
                        <div className="relative h-80 lg:h-[400px] overflow-hidden">
                          <img
                            src={item.images?.[0] || "/placeholder.jpg"}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 p-5 text-white w-full">
                            <span className="inline-block px-3 py-1 bg-black/80 backdrop-blur-sm text-[10px] uppercase tracking-widest mb-2">
                              {item.product_type}
                            </span>
                            <h3 className="font-display text-xl font-bold drop-shadow-md">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                        <div className="text-center py-4 bg-white border-t border-gray-50">
                          <h4 className="text-sm font-serif text-black uppercase tracking-widest">
                            Explore {item.product_type}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            )}
          </div>
          <div className="text-center mt-4 md:mt-16 animate-fade-in relative z-[100]">
            <div className="inline-block relative">
              <button
                onClick={() => setCollectionDropdownOpen(!collectionDropdownOpen)}
                className="inline-flex items-center text-black uppercase tracking-[0.2em] text-sm md:text-sm lg:text-lg font-medium group"
              >
                <span className="border-b border-black font-bold pb-1 group-hover:border-b-2 transition-all">
                  Explore Collection
                </span>
                <ChevronRight className={`ml-3 w-4 h-4 transition-transform duration-300 ${collectionDropdownOpen ? 'rotate-90' : ''}`} />
              </button>
              {/* Elegant Dropdown Menu */}
              {collectionDropdownOpen && (
                <>
                  {/* Backdrop to close dropdown when clicking outside */}
                  <div
                    className="fixed inset-0 z-[99]"
                    onClick={() => setCollectionDropdownOpen(false)}
                  />
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 z-[100]">
                    {/* Arrow pointer */}
                    <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-black rotate-45" />
                    <div className="bg-black text-white min-w-[200px] overflow-hidden shadow-2xl">
                      <Link
                        to="/collection/carpets"
                        className="flex items-center justify-between px-6 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 border-b border-white/10"
                        onClick={() => setCollectionDropdownOpen(false)}
                      >
                        <span>Carpets</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <Link
                        to="/collection/shawls"
                        className="flex items-center justify-between px-6 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
                        onClick={() => setCollectionDropdownOpen(false)}
                      >
                        <span>Shawls</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <CustomerReviews />

      {/* --- APPOINTMENT SECTION --- */}
      <section className="py-2 md:py-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" />
        <div className="container mx-auto px-4 lg:px-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-2 lg:gap-20 items-center">
            <div className="animate-fade-in">
              <ContactForm />
            </div>
            <div className="hidden md:block relative h-96 lg:h-[600px] overflow-hidden animate-fade-in shadow-2xl">
              <img
                src={consultationImg}
                alt="Consultation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
