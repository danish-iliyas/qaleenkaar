import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react";

// --- Helper: YouTube URL Parser ---
const getYouTubeEmbedUrl = (url) => {
  let videoId = "";
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtube.com"))
      videoId = urlObj.searchParams.get("v");
    else if (urlObj.hostname === "youtu.be")
      videoId = urlObj.pathname.substring(1);
  } catch (e) {
    return "";
  }
  return videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
    : "";
};

// --- Review Card Component ---
const ReviewCard = ({ name, rating, review, date, videoUrl, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const isYouTubeVideo =
    videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");
  const playableUrl = isPlaying
    ? isYouTubeVideo
      ? getYouTubeEmbedUrl(videoUrl)
      : videoUrl
    : "";

  return (
    /* h-full and flex-col ensure all cards in the row match the tallest card */
    <div className="bg-white overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full mx-2">
      {/* Video/Thumbnail Section */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        {!isPlaying ? (
          <>
            <img
              src={thumbnail}
              alt={name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all group"
            >
              <div className="w-14 h-14 bg-black flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </button>
          </>
        ) : (
          <div className="w-full h-full">
            {isYouTubeVideo ? (
              <iframe
                className="w-full h-full"
                src={playableUrl}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <video
                src={playableUrl}
                controls
                autoPlay
                className="w-full h-full"
              />
            )}
          </div>
        )}
      </div>

      {/* Content Section: flex-grow ensures the card stretches correctly */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-serif text-lg font-bold text-gray-900">
              {name}
            </h4>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
              {date}
            </p>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < rating ? "fill-black text-black" : "text-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
        {/* flex-grow on the text forces all bottom content to align */}
        <p className="text-gray-600 text-sm leading-relaxed italic flex-grow">
          "{review}"
        </p>
      </div>
    </div>
  );
};

// --- Main Testimonials Section ---
const CustomerReviews = () => {
  // Embla setup with autoplay for auto-scrolling
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  // All reviews combined in one array
  const reviews = [
    {
      name: "Priya Sharma",
      rating: 5,
      review:
        "Absolutely amazing service! My antique Persian carpet looks brand new. The team was professional and the restoration work is impeccable.",
      date: "OCT 2024",
      videoUrl: "https://www.youtube.com/watch?v=rslXOypyNx0",
      thumbnail:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    },
    {
      name: "Kavita Reddy",
      rating: 5,
      review:
        "My delicate Pashmina shawl was beautifully cleaned. They understand the intricacies of handling fine fabrics.",
      date: "OCT 2024",
      videoUrl: "https://www.youtube.com/watch?v=rslXOypyNx0",
      thumbnail:
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800",
    },
    {
      name: "Rahul Mehta",
      rating: 5,
      review:
        "Best carpet cleaning service in Delhi! They handled my expensive silk carpet with utmost care.",
      date: "SEPT 2024",
      videoUrl: "https://www.youtube.com/watch?v=rslXOypyNx0",
      thumbnail:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
    },
    {
      name: "Meera Kapoor",
      rating: 5,
      review:
        "Exceptional shawl restoration! They revived my vintage Kashmiri shawl perfectly. All tears expertly repaired.",
      date: "SEPT 2024",
      videoUrl: "https://www.youtube.com/watch?v=rslXOypyNx0",
      thumbnail:
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800",
    },
    {
      name: "Anjali Gupta",
      rating: 4,
      review:
        "Great restoration work on my grandmother's old carpet. The results were worth the wait.",
      date: "AUG 2024",
      videoUrl: "https://www.youtube.com/watch?v=rslXOypyNx0",
      thumbnail:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800",
    },
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-light text-black uppercase tracking-[0.2em] mb-4">
            Customer Reviews
          </h2>
          <div className="w-16 h-px bg-black mx-auto opacity-30" />
        </div>

        {/* Carousel Viewport */}
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {reviews.map((rev, i) => (
                <div
                  key={i}
                  className="flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_33.333%] min-w-0"
                >
                  <ReviewCard {...rev} />
                </div>
              ))}
            </div>
          </div>

          {/* Minimal Navigation Arrows */}
          <div className="flex justify-center items-center gap-12 mt-12">
            <button
              onClick={scrollPrev}
              className="p-2 text-gray-300 hover:text-black transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-8 h-8 stroke-[1px]" />
            </button>
            <div className="h-px w-12 bg-gray-200" />
            <button
              onClick={scrollNext}
              className="p-2 text-gray-300 hover:text-black transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-8 h-8 stroke-[1px]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
