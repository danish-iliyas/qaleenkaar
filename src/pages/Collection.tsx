import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-carpet.jpg"; 
import { InView } from "react-intersection-observer";
import { ArrowRight, Loader2 } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost/adminPannel/api";

interface CollectionItem {
  id: number;
  title: string;
  description: string;
  images: string[];
  product_type: string;
  ref_number: string;
}

const Collection = () => {
  const { type } = useParams<{ type: string }>(); 
  const [pageTitle, setPageTitle] = useState("");
  const [collectionData, setCollectionData] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const whatsappNumber = "+911234567890";

  useEffect(() => {
    const fetchCollectionData = async () => {
      if (!type) return;
      setLoading(true);
      setError(null);

      let apiType = "";
      if (type === "carpets") {
        setPageTitle("Carpet Collection");
        apiType = "Carpet";
      } else if (type === "shawls") {
        setPageTitle("Shawl Collection");
        apiType = "Shawl";
      }

      try {
        const response = await fetch(`${API_BASE}/products/?type=${apiType}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        if (data.status === 'success' && Array.isArray(data.data)) {
          setCollectionData(data.data);
        } else if (Array.isArray(data)) {
          setCollectionData(data);
        } else {
          setCollectionData([]);
        }
      } catch (err) {
        setError("Failed to load collection. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
    window.scrollTo(0, 0);
  }, [type]);

  return (
    <div className="bg-white">
      <Header />

      {/* --- Hero Section --- */}
      <section className="relative h-[45vh] min-h-[350px] lg:h-[66vh] bg-red-600 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Our Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brown/60 via-brown/50 to-brown/40" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#FFFFFD] mb-6">
              Our Curated Collection
            </h1>
            <p className="font-body text-xl text-white/90 leading-relaxed">
              Explore our handpicked selection of exquisite carpets and shawls,
              each telling a unique story of artistry and tradition.
            </p>
          </div>
        </div>
      </section>

      {/* --- DYNAMIC Collection Grid --- */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-12 text-center text-[#5A386D]">
            {pageTitle}
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-[#5A386D] animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-600 font-medium">{error}</div>
          ) : collectionData.length === 0 ? (
            <div className="text-center py-20 text-gray-500 font-medium">No items found.</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {collectionData.map((item, index) => (
                <InView
                  key={item.id || index}
                  triggerOnce
                  threshold={0.1}
                  rootMargin="0px 0px -50px 0px"
                >
                  {({ ref, inView }) => (
                    <div
                      ref={ref}
                      className={`transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="group relative overflow-hidden bg-red-500 cursor-pointer bg-card shadow-soft hover:shadow-hover">
                        
                        {/* Image Container */}
                        <div className="w-[100%] aspect-square lg:h-96 overflow-hidden">
                          <img
                            src={item.images?.[0] || "https://via.placeholder.com/400"}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none" />
                          
                          {/* Card Content Over Image */}
                          <div className="absolute bottom-0 left-0 p-3 md:p-5 text-white w-full">
                            {item.product_type && (
                              <span className="inline-block px-3 py-1 bg-[#62009b]/80 backdrop-blur-sm rounded-full text-[10px] uppercase tracking-widest mb-2 font-bold">
                                {item.product_type}
                              </span>
                            )}
                            
                            {/* Title: Always visible, clamped to 1 line */}
                            <h3 className="font-display text-lg md:text-2xl font-bold drop-shadow-md line-clamp-1 mb-1">
                              {item.title}
                            </h3>

                            {/* Corrected: Reveal Description Area on Hover */}
                            <div
                              className="
                                transition-all duration-500 ease-in-out 
                                overflow-hidden max-h-0 opacity-0 
                                group-hover:max-h-48 group-hover:opacity-100 group-hover:pt-2
                              "
                            >
                              {/* Description: Clamped to 2 lines */}
                              <p className="font-body text-sm text-white/90 mb-3 line-clamp-2 leading-relaxed">
                                {item.description}
                              </p>
                              <Link
                                to={`/product/${item.id}`}
                                className="inline-flex items-center text-accent hover:text-white font-medium transition-all duration-300 text-sm border-b border-white/20 hover:border-white pb-0.5"
                              >
                                View Details
                                <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </InView>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-[#794299]">
              Interested in a Piece?
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
              Contact us to discuss pricing, customization options, or to
              schedule a private viewing of any item in our collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in your collection`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#794299] hover:bg-[#62009b] text-primary-foreground font-body font-medium rounded-lg transition-all duration-200 ease-out transform hover:scale-[1.02]"
              >
                Contact via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Collection;