import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header"; // This will now import your new header
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import heroImage from "@/assets/hero-carpet.jpg"; // Slide 1
import washingImg from "@/assets/service-washing.jpg";
import repairImg from "@/assets/service-repair.jpg";
import restorationImg from "@/assets/service-restoration.jpg";
import exchangeImg from "@/assets/service-exchange.jpg";
import cleaningImg from "@/assets/service-cleaning.jpg";
import collection1 from "@/assets/collection-1.jpg"; // Slide 2
import collection2 from "@/assets/collection-2.jpg"; // Slide 3
import collection3 from "@/assets/collection-3.jpg";
import Slider from "react-slick";
import { InView } from "react-intersection-observer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// ✅ 1. Import Embla Carousel hooks
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import CustomerReviews from "@/components/customerReview";
import { useState } from "react"; // ✅ Added missing import

// --- Helper Components (Moved outside Index for efficiency) ---

const NextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} !flex !items-center !justify-center !right-3 !z-20 bg-[#c5aad4] hover:bg-[#e9e2ec] text-white w-7 h-7 rounded-full shadow-lg transition-all duration-300`}
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
      className={`${className} !flex !items-center !justify-center !left-3 !z-20 bg-[#ac92bb] hover:bg-[#ceb4dd] text-white w-7 h-7 rounded-full shadow-lg transition-all duration-300`}
      onClick={onClick}
    >
      <span className="text-lg font-bold">{"‹"}</span>
    </div>
  );
};

// --- Main Page Component ---

const Index = () => {
  const whatsappNumber = "+911234567890";

  // ✅ 2. Setup Embla Carousel
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  ]);

  // ✅ 3. Define slides
  const carouselSlides = [
    {
      type: "image",
      src: heroImage,
      alt: "Handcrafted masterpieces",
    },
    {
      type: "image",
      src: collection1,
      alt: "Traditional Persian Carpets",
    },
    {
      type: "image",
      src: collection2,
      alt: "Vintage Kashmiri Shawls",
    },
    {
      type: "video",
      src: "https://videos.pexels.com/video-files/3840810/3840810-hd_1920_1080_25fps.mp4",
      alt: "Carpet weaving process",
    },
  ];

  const carpetServices = [
    {
      title: "Professional Washing",
      description:
        "Gentle yet thorough cleaning methods that preserve the integrity and beauty of your precious carpets.",
      image: washingImg,
      type: "Carpet",
      linkTo: "/services/carpet-washing",
    },
    {
      title: "Expert Repairing",
      description:
        "Master craftsmen restore damaged areas with traditional techniques, maintaining authentic patterns.",
      image: repairImg,
      type: "Carpet",
      linkTo: "/services/carpet-repairing",
    },
    {
      title: "Complete Restoration",
      description:
        "Bringing vintage carpets back to their original glory with meticulous attention to detail.",
      image: restorationImg,
      type: "Carpet",
      linkTo: "/services/carpet-restoration",
    },
    {
      title: "Wall Hanging Care",
      description:
        "Specialized cleaning and maintenance for decorative wall hangings, preserving their elegance and charm.",
      image: cleaningImg,
      type: "Carpet",
      linkTo: "/services/wall-hanging-care",
    },
  ];

  const shawlServices = [
    {
      title: "Delicate Shawl Washing",
      description:
        "Specialized hand-washing techniques for precious Pashmina and Kashmiri shawls using traditional methods.",
      image: washingImg,
      type: "Shawl",
      linkTo: "/services/shawl-washing",
    },
    {
      title: "Shawl Restoration",
      description:
        "Expert restoration of vintage shawls, repairing tears and reviving faded colors with authentic materials.",
      image: restorationImg,
      type: "Shawl",
      linkTo: "/services/shawl-restoration",
    },
    {
      title: "Premium Dry Cleaning",
      description:
        "Eco-friendly dry cleaning for sensitive shawl materials that require extra care and gentle handling.",
      image: cleaningImg,
      type: "Shawl",
      linkTo: "/services/shawl-cleaning",
    },
    {
      title: "Sell & Exchange",
      description:
        "Trade your old shawls for new ones or get the best value with our fair exchange program.",
      image: exchangeImg,
      type: "Shawl",
      linkTo: "/services/sell-exchange",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      review:
        "Loom Tales transformed my grandmother's antique carpet. The restoration work is exceptional, and it looks as beautiful as it did decades ago. Highly recommend their services!",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      review:
        "Professional, trustworthy, and skilled artisans. They handled my precious Pashmina shawl with such care. The cleaning results exceeded my expectations.",
      rating: 5,
    },
    {
      name: "Anita Desai",
      review:
        "I've been using Loom Tales for years. Their attention to detail and commitment to preserving the heritage of each piece is unmatched. A true gem in carpet care.",
      rating: 5,
    },
  ];

  const collections = [
    {
      image: collection1,
      title: "Traditional Persian Carpets",
      type: "Carpet",
    },
    { image: collection2, title: "Vintage Kashmiri Shawls", type: "Shawl" },
    { image: collection3, title: "Contemporary Designer Rugs", type: "Carpet" },
    { image: washingImg, title: "Heritage Pashmina Shawls", type: "Shawl" },
    { image: repairImg, title: "Antique Turkish Carpets", type: "Carpet" },
    { image: restorationImg, title: "Luxury Silk Shawls", type: "Shawl" },
  ];

  // State logic for "OUR WORK" carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const workItems = [
    {
      id: 1,
      before:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      after:
        "https://images.unsplash.com/photo-1578722374513-b83ab0e8ad33?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      before:
        "https://images.unsplash.com/photo-1566195992552-5f80fcbb0e4d?w=600&h=400&fit=crop",
      after:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      before:
        "https://images.unsplash.com/photo-1578723988236-6d80cc773253?w=600&h=400&fit=crop",
      after:
        "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=400&fit=crop",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? workItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === workItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppFloat />
      {/* --- Hero Section --- */}
      <section className="relative h-[45vh]  min-h-[350px] lg:h-[66vh] bg-red-600 flex items-center overflow-hidden">
        <div className="absolute inset-0" ref={emblaRef}>
          <div className="flex h-full">
            {/* Map through carousel slides */}
            {carouselSlides.map((slide, index) => (
              <div className="relative flex-[0_0_100%] h-full" key={index}>
                {slide.type === "image" ? (
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={slide.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ))}
          </div>
        </div>

        {/* Static Content Overlay (Text + Button) */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-xl animate-fade-in">
            <h1 className="font-serif text-white text-3xl md:text-6xl lg:text-4xl font-normal mb-8 leading-tight">
              Handcrafted masterpieces <br /> from the world's finest looms
            </h1>
            <Button
              asChild
              // size="lg" is removed since we are defining custom responsive sizes
              className="
    bg-white text-gray-900 font-serif rounded-none
    hover:bg-gray-200 transition-colors
    
    /* ✅ Mobile (default) sizes: */
    h-[36px] px-4 text-base
    
    /* ✅ Desktop (lg:) sizes: */
    lg:h-14 lg:px-10 lg:text-lg
  "
            >
              <Link to="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>
      {/* --- END: Hero Section --- */}

      {/* --- Dual Care Services Section --- */}
      {/* ✅ CHANGED: Standardized section padding */}
      <section className="py-8 pb-4 md:py-8 bg-secondary/30">
        <div className="container mx-auto px-2 sm:px-4 ">
          {/* 1. Main "SERVICES" Title */}
          <div className="text-center mx-auto mb-4 w-full">
            <div className="inline-block  border border-none rounded-sm">
              <h2
                className="font-serif text-2xl md:text-4xl font-bold text-[#3f5066] uppercase tracking-wider 
  drop-shadow-[2px_2px_0px_#e8d2ff]"
              >
                Services
              </h2>
            </div>
          </div>
          {/* 2. Main 2-column grid (Carpet vs Shawl) */}
          {/* ✅ CHANGED: Reduced the gap that you saw in the screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 gap-y-8">
            {/* --- 3. CARPETS COLUMN (Left) --- */}
            <div>
              <h3 className="font-serif text-2xl text-center font-medium text-gray-700 uppercase tracking-widest mb-4">
                Carpet
              </h3>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-8">
                {carpetServices.map((service, index) => (
                  <InView
                    key={index}
                    triggerOnce
                    threshold={0.1}
                    rootMargin="0px 0px -50px 0px"
                  >
                    {({ ref, inView }) => (
                      <div
                        ref={ref}
                        className={`
                          group relative h-80 lg:h-96 w-full overflow-hidden  shadow-lg cursor-pointer
                          transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                          ${inView
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-12"
                          }
                        `}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <img
                          src={service.image}
                          alt={service.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                        <div className="relative z-10 flex flex-col justify-between h-full p-4 md:p-6">
                          {service.type && (
                            <div>
                              <span className="inline-block bg-[#794299] text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full font-serif text-xs md:text-sm font-medium">
                                {service.type}
                              </span>
                            </div>
                          )}
                          <div className="transition-transform duration-500 group-hover:-translate-y-1">
                            <h3 className="font-serif text-2xl md:text-4xl lg:text-4xl font-bold text-white mb-2 drop-shadow-md leading-tight">
                              {service.title}
                            </h3>
                            <Link
                              to={service.linkTo}
                              className="inline-flex items-center text-accent hover:text-white font-medium transition-all duration-300 text-base group-hover:gap-1 mt-0 opacity-0 group-hover:opacity-100"
                            >
                              View Details
                              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </InView>
                ))}
              </div>
            </div>{" "}
            {/* End carpet column */}
            {/* --- 4. SHAWLS COLUMN (Right) --- */}
            <div>
              <h3 className="font-serif text-2xl text-center font-medium text-gray-700 uppercase tracking-widest mb-4">
                Shawl
              </h3>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-8">
                {shawlServices.map((service, index) => (
                  <InView
                    key={index}
                    triggerOnce
                    threshold={0.1}
                    rootMargin="0px 0px -50px 0px"
                  >
                    {({ ref, inView }) => (
                      <div
                        ref={ref}
                        className={`
                          group relative h-80 lg:h-96 w-full overflow-hidden  shadow-lg cursor-pointer
                          transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                          ${inView
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-12"
                          }
                        `}
                        style={{
                          transitionDelay: `${(carpetServices.length + index) * 100
                            }ms`,
                        }}
                      >
                        <img
                          src={service.image}
                          alt={service.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="relative z-10 flex flex-col justify-between h-full p-4 md:p-6">
                          {service.type && (
                            <div>
                              <span className="inline-block bg-[#794299] text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full font-serif text-xs md:text-sm font-medium">
                                {service.type}
                              </span>
                            </div>
                          )}
                          <div className="transition-transform duration-500 group-hover:-translate-y-1">
                            <h3 className="font-serif text-2xl md:text-4xl lg:text-4xl font-bold text-white mb-2 drop-shadow-md leading-tight">
                              {service.title}
                            </h3>
                            <Link
                              to={service.linkTo}
                              className="inline-flex items-center text-accent hover:text-white font-medium transition-all duration-300 text-base group-hover:gap-1 mt-0 opacity-0 group-hover:opacity-100"
                            >
                              View Details
                              <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </InView>
                ))}
              </div>
            </div>{" "}
            {/* End shawl column */}
          </div>{" "}
          {/* End 2-column grid */}
          {/* 5. "View All" Button */}
          {/* ✅ CHANGED: Reduced excessive top margin */}
          <div className="text-center mt-12 animate-fade-in">
            <Button
              asChild
              size="lg"
              className="bg-[#5A386D] hover:bg-[#62009b] text-lg px-8 mb-9 transition-all duration-200 ease-out transform hover:scale-[1.02]"
            >
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>{" "}
        {/* End container */}
      </section>
      {/* --- END: Dual Care Services Section --- */}

      {/* --- YOUTUBE VIDEO SECTION --- */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 z-0"
          src="https://www.youtube.com/embed/SNIHII7Pjb8?si=odObuwsWpnBfRyiu&autoplay=1&mute=1&loop=1&playlist=SNIHII7Pjb8&controls=0&showinfo=0"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube Background Video"
        ></iframe>

        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* 3. Content */}
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-sans text-2xl md:text-3xl font-light text-white uppercase tracking-widest animate-fade-in">
              Because you deserve to shine!
            </h2>
          </div>
        </div>
      </section>

      {/* --- Collections Section --- */}
      {/* ✅ CHANGED: Standardized section padding */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-background to-secondary/30 overflow-hidden">
        <div className="container mx-auto px-2 sm:px-4 overflow-hidden">
          {/* === Section Header === */}
          {/* ✅ CHANGED: Reduced bottom margin for consistency */}
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-[#5A386D]">
              Collections
            </h2>
          </div>

          {/* === Carousel === */}
          <div className="relative overflow-hidden">
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
                { breakpoint: 1024, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 2 } },
              ]}
            >
              {collections.map((item, index) => (
                <InView
                  key={index}
                  triggerOnce
                  threshold={0.1}
                  rootMargin="0px 0px -50px 0px"
                >
                  {({ ref, inView }) => (
                    <div ref={ref} className="px-2 sm:px-4">
                      <div
                        className={`group relative overflow-hidden cursor-pointer bg-card shadow-soft hover:shadow-hover transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${inView
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-12"
                          }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        {/* === Image === */}
                        <div className="relative h-80 lg:h-[400px] overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none" />
                          <div className="absolute bottom-0 left-0 p-5 text-white w-full transition-transform duration-500 group-hover:-translate-y-1">
                            {item.type && (
                              <span className="inline-block px-3 py-1 bg-[#62009b]/80 backdrop-blur-sm rounded-full text-xs mb-2">
                                {item.type}
                              </span>
                            )}
                            <h3 className="font-display text-2xl font-bold drop-shadow-md">
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        {/* === Fixed Text Below Image === */}
                        <div className="text-center py-4 bg-white">
                          {index % 2 === 0 ? (
                            <h4 className="text-xl font-serif text-[#5A386D] uppercase tracking-wide">
                              Carpet
                            </h4>
                          ) : (
                            <h4 className="text-xl font-serif text-[#5A386D] uppercase tracking-wide">
                              Shawl
                            </h4>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </InView>
              ))}
            </Slider>
          </div>

          {/* === Button === */}
          {/* ✅ CHANGED: Reduced top margin for consistency */}
          <div className="text-center mt-12 md:mt-16 animate-fade-in">
            <Button
              asChild
              size="lg"
              className="bg-[#5A386D] hover:bg-[#62009b] text-lg px-8 transition-all duration-200 ease-out transform hover:scale-[1.02]"
            >
              <Link to="/collection">
                Explore Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* --- END: Collections Section --- */}

      <CustomerReviews />

      {/* --- OUR WORK Section --- */}
      {/* ✅ CHANGED: Standardized section padding */}
      <section className="w-full bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Heading */}
          <h2 className="text-center font-serif text-3xl md:text-5xl font-semibold text-[#794299] tracking-wide mb-12">
            OUR WORK
          </h2>

          {/* Carousel Container */}
          <div className="relative flex flex-col items-center w-full">
            <div className="flex items-center justify-center w-full gap-4 sm:gap-8">
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                className="hidden sm:flex flex-shrink-0 p-3 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300 z-10"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 text-[#794299]" />
              </button>

              {/* Images Container */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Before Image */}
                <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                  <img
                    src={workItems[currentIndex].before}
                    alt="Before"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <p className="text-center text-[#794299] text-xl py-2 font-serif">
                    Before
                  </p>
                </div>

                {/* After Image */}
                <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                  <p className="text-center text-[#794299] text-xl py-2 font-serif">
                    After
                  </p>
                  <img
                    src={workItems[currentIndex].after}
                    alt="After"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="hidden sm:flex flex-shrink-0 p-3 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300 z-10"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 text-[#794299]" />
              </button>
            </div>

            {/* Mobile Arrows */}
            <div className="flex sm:hidden justify-center gap-8 mt-6">
              <button
                onClick={handlePrev}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
              >
                <ChevronLeft className="w-5 h-5 text-[#794299]" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
              >
                <ChevronRight className="w-5 h-5 text-[#794299]" />
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {workItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                      ? "bg-[#794299] w-8"
                      : "bg-gray-300 w-2 hover:bg-gray-400"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* --- END: OUR WORK Section --- */}

      {/* --- Appointment Section --- */}
      {/* ✅ CHANGED: Standardized section padding */}
      <section className="py-12 md:py-16  bg-white from-primary via-primary-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)",
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#794299] mb-6">
                Book Your Free Design Consultation
              </h2>
              <p className="font-body text-lg text-[#7A4B7A]/90 mb-8 leading-relaxed">
                Come visit our beautiful showroom to see first hand our
                selection of beautiful rugs and carpets. Let our master
                craftsmen care for your precious textiles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#794299] hover:bg-[#62009b]/90 text-white text-lg px-8 transition-all duration-200 ease-out transform hover:scale-[1.02]"
                >
                  <Link to="/book-appointment">Book My Visit</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-[#794299] hover:bg-[#62009b]/90 text-white text-lg px-8 transition-all duration-200 ease-out transform hover:scale-[1.02]"
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden animate-fade-in shadow-2xl">
              <img
                src={collection2}
                alt="Consultation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* --- END: Appointment Section --- */}

      <Footer />
    </div>
  );
};

export default Index;
