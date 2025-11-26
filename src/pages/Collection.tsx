import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-carpet.jpg"; // Keep hero image
import { InView } from "react-intersection-observer";
import { ArrowRight, Loader2 } from "lucide-react"; // Import Loader2

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost/adminPannel/api";

interface CollectionItem {
  id: number;
  title: string;
  description: string;
  images: string[]; // Assuming 'images' is an array of URLs from your API
  product_type: string;
  ref_number: string;
  // Add any other fields you might need from the API
}

const Collection = () => {
  const { type } = useParams<{ type: string }>(); // 'carpets' or 'shawls'
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

      // Map URL param to API type
      let apiType = "";
      if (type === "carpets") {
        setPageTitle("Carpet Collection");
        apiType = "Carpet"; // Capitalized, singular
      } else if (type === "shawls") {
        setPageTitle("Shawl Collection");
        apiType = "Shawl"; // Capitalized, singular
      } else {
        setError("Unknown collection type.");
        setLoading(false);
        return;
      }

      try {
        // --- THIS IS THE CORRECTED API CALL ---
        const response = await fetch(`${API_BASE}/products/?type=${apiType}`);
        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Check if API returns { status: 'success', data: [...] } or just [...]
        if (data.status === 'success' && Array.isArray(data.data)) {
          setCollectionData(data.data);
        } else if (Array.isArray(data)) { // Fallback if API just returns array
          setCollectionData(data);
        } else {
          setCollectionData([]);
        }
      } catch (err) {
        console.error("Failed to fetch collection:", err);
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

 
        <section className="relative h-[45vh]  min-h-[350px] lg:h-[66vh] bg-red-600 flex items-center overflow-hidden">
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
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-12 text-center text-[#5A386D]">
              {pageTitle}
            </h2>
            
            {/* --- Loading/Error/Empty States --- */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-12 h-12 text-[#5A386D] animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-20 text-red-600 font-medium">
                {error}
              </div>
            ) : collectionData.length === 0 ? (
              <div className="text-center py-20 text-gray-500 font-medium">
                No items found in this collection.
              </div>
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
                        className={`
                          transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                          ${
                            inView
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-12"
                          }
                        `}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div
                          className={`
                            group relative overflow-hidden rounded-lg cursor-pointer bg-card
                            shadow-soft hover:shadow-hover
                          `}
                        >
                          <div className="relative aspect-square lg:h-96 overflow-hidden">
                            <img
                              // Use the first image from the API
                              src={item.images?.[0] || "https://via.placeholder.com/400"}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none" />
                            <div className="absolute bottom-0 left-0 p-3 md:p-5 text-white w-full">
                              {item.product_type && (
                                <span className="inline-block px-3 py-1 bg-[#62009b]/80 backdrop-blur-sm rounded-full text-xs mb-2">
                                  {item.product_type}
                                </span>
                              )}
                              <h3 className="font-display text-lg md:text-2xl font-bold drop-shadow-md">
                                {item.title}
                              </h3>
                              <div
                                className="
                                  transition-all duration-300 ease-in-out 
                                  overflow-hidden max-h-0 opacity-0 
                                  group-hover:max-h-40 group-hover:opacity-100 group-hover:pt-2
                                "
                              >
                                <p className="font-body text-sm text-white/90 mb-2 line-clamp-2 hidden md:block">
                                  {item.description}
                                </p>
                                <Link
                                  // Update this link if you have a product detail page
                                  to={`/product/${item.id || item.id}`}
                                  className="inline-flex items-center text-accent hover:text-white font-medium transition-all duration-300 text-sm"
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
        </div>
      </section>

      {/* CTA Section (Unchanged) */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
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