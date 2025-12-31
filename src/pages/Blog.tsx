import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Calendar, ArrowRight, Tag, Loader2, AlertCircle } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Static image
import heroImage from "@/assets/hero-carpet.jpg";

const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://hotpink-tapir-344575.hostingersite.com/api";

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  featured_image_path: string;
  post_date: string;
  status: string;
}

interface Pagination {
  page: number;
  total_pages: number;
  total_results: number;
  per_page: number;
}

// Convert HTML → plain text
const stripHtml = (html: string) => {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

// Truncate text
const truncateText = (text: string, length: number = 120) => {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

const formatDate = (dateString: string) => {
  if (!dateString) return "Date not available";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return dateString;
  }
};

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Blogs API
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE}/blogs?page=${currentPage}`);
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "success") {
          setBlogs(data.data);
          setPagination(data.pagination);
        } else {
          throw new Error(data.message || "Failed to load blogs");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  return (
    <div className="bg-background">
      <Header />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative h-[25vh] min-h-[200px] lg:h-[40vh] bg-black flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Blog"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-3xl md:text-5xl font-normal text-white mb-4 uppercase tracking-widest">
              Stories & Insights
            </h1>
            <p className="font-sans text-xs md:text-sm text-white/80 leading-relaxed uppercase tracking-widest max-w-xl mx-auto">
              Explore the art, heritage, and craftsmanship behind every thread.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 text-black animate-spin" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex flex-col items-center justify-center h-64 text-red-600">
              <AlertCircle className="w-10 h-10 mb-4" />
              <h2 className="text-sm font-bold uppercase tracking-wide mb-2">
                Error fetching blogs
              </h2>
              <p className="text-xs uppercase tracking-wider">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && blogs.length === 0 && (
            <div className="text-center h-64">
              <h2 className="text-xl font-normal text-gray-400 uppercase tracking-widest">
                No blog posts found.
              </h2>
            </div>
          )}

          {/* Blog Cards Grid - Editorial Style */}
          {!loading && !error && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {blogs.map((post, i) => (
                <article
                  key={post.id}
                  className="group flex flex-col cursor-pointer"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {/* Image - Clean, sharp, zoom effect */}
                  <div className="relative aspect-[3/2] overflow-hidden bg-gray-100 mb-6">
                    <img
                      src={
                        post.featured_image_path ||
                        "https://placehold.co/600x400"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col flex-grow">
                    {/* Meta Data - Minimal Uppercase */}
                    <div className="flex items-center gap-4 text-[10px] text-gray-400 uppercase tracking-widest mb-3 font-sans">
                      <span className="text-black font-bold">
                        {post.category || "General"}
                      </span>
                      <span>|</span>
                      <span>{formatDate(post.post_date)}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl md:text-2xl font-normal mb-3 text-black group-hover:underline decoration-1 underline-offset-4 transition-all uppercase tracking-wide">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-sans text-xs text-gray-500 mb-4 line-clamp-3 leading-relaxed uppercase tracking-wide">
                      {truncateText(stripHtml(post.content), 120)}
                    </p>

                    {/* Read More Link */}
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center text-[10px] font-bold text-black uppercase tracking-[0.2em] hover:text-gray-600 transition-colors mt-auto self-start border-b border-black pb-0.5 hover:border-gray-600"
                    >
                      Read Article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && pagination?.total_pages! > 1 && (
            <div className="flex justify-center items-center gap-4 mt-20">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-none border-black hover:bg-black hover:text-white font-sans text-xs uppercase tracking-widest px-6"
              >
                Previous
              </Button>

              {Array.from(
                { length: pagination.total_pages },
                (_, i) => i + 1
              ).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-none w-10 h-10 font-sans text-xs ${
                    currentPage === page
                      ? "bg-black text-white hover:bg-gray-800"
                      : "border-transparent text-gray-500 hover:text-black"
                  }`}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pagination?.total_pages}
                className="rounded-none border-black hover:bg-black hover:text-white font-sans text-xs uppercase tracking-widest px-6"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
