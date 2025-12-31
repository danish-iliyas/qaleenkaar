import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-carpet.jpg";
import { InView } from "react-intersection-observer";
import { ArrowRight, Loader2 } from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost/adminPannel/api";

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

        if (data.status === "success" && Array.isArray(data.data)) {
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
      <section className="relative h-[25vh] min-h-[200px] lg:h-[40vh] bg-black flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Our Collection"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 container mx-auto px-4 pt-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="font-serif text-3xl md:text-5xl font-normal text-white mb-4 uppercase tracking-widest">
              Curated Collection
            </h1>
            <p className="font-sans text-xs md:text-sm text-white/80 leading-relaxed uppercase tracking-widest max-w-xl mx-auto">
              Exquisite carpets and shawls, telling unique stories of artistry.
            </p>
          </div>
        </div>
      </section>

      {/* --- DYNAMIC Collection Grid --- */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-normal mb-12 text-center text-black uppercase tracking-widest">
            {pageTitle}
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-black animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-gray-500 font-sans text-sm uppercase tracking-wide">
              {error}
            </div>
          ) : collectionData.length === 0 ? (
            <div className="text-center py-20 text-gray-400 font-sans text-sm uppercase tracking-wide">
              No items found.
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 lg:gap-x-8">
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
                      className={`group cursor-pointer transition-all duration-700 ${
                        inView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                    >
                      <Link to={`/product/${item.id}`} className="block">
                        {/* Image Container - Fashion/Editorial Ratio */}
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                          <img
                            src={
                              item.images?.[0] ||
                              "https://via.placeholder.com/400"
                            }
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        </div>

                        {/* Text Below Image - Minimal */}
                        <div className="text-center space-y-1">
                          {/* Title */}
                          <h3 className="font-sans text-sm font-bold text-black uppercase tracking-wide line-clamp-1">
                            {item.title}
                          </h3>

                          {/* Subtitle/Type - Optional, keeping it very clean */}
                          {item.product_type && (
                            <p className="font-sans text-[10px] text-gray-500 uppercase tracking-widest">
                              {item.product_type}
                            </p>
                          )}
                        </div>
                      </Link>
                    </div>
                  )}
                </InView>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-4xl font-normal mb-6 text-black uppercase tracking-widest">
              Interested in a Piece?
            </h2>
            <p className="font-sans text-xs md:text-sm text-gray-500 mb-10 leading-relaxed uppercase tracking-wide">
              Contact us to discuss pricing, customization options, or to
              schedule a private viewing of any item in our collection.
            </p>
            <div className="flex justify-center">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in your collection`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-black hover:bg-gray-900 text-white font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 min-w-[200px]"
              >
                Inquire via WhatsApp
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
