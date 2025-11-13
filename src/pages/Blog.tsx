import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Calendar, ArrowRight, Tag, Loader2, AlertCircle } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Static image
import heroImage from "@/assets/hero-carpet.jpg";

const API_BASE = "http://localhost/adminPannel/api";

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
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Blog" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brown/60 via-brown/50 to-brown/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
              Stories & Insights
            </h1>
            <p className="font-body text-xl text-white/90 leading-relaxed">
              Explore the art, heritage, and craftsmanship behind every thread.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-12 h-12 text-[#794299] animate-spin" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex flex-col items-center justify-center h-64 text-red-600">
              <AlertCircle className="w-12 h-12 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Error fetching blogs</h2>
              <p>{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && blogs.length === 0 && (
            <div className="text-center h-64">
              <h2 className="text-2xl font-semibold text-muted-foreground">
                No blog posts found.
              </h2>
            </div>
          )}

          {/* Blog Cards */}
          {!loading && !error && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, i) => (
                <article
                  key={post.id}
                  className="group flex flex-col bg-card rounded-lg overflow-hidden shadow soft hover:shadow-lg duration-300 border border-black/5"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.featured_image_path || "https://placehold.co/600x400"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#6a2e8c] rounded-full text-white">
                        <Tag className="w-3 h-3" />
                        {post.category || "General"}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.post_date)}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold mb-3 text-foreground group-hover:text-[#794299] duration-300">
                      {post.title}
                    </h3>

                    {/* FIXED — Clean excerpt without HTML tags */}
                    <p className="font-body text-muted-foreground mb-4 flex-grow">
                      {truncateText(stripHtml(post.content), 120)}
                    </p>

                    <Button
                      asChild
                      variant="link"
                      className="text-[#794299] hover:text-[#62009b] p-0 h-auto self-start group-hover:gap-2 duration-300"
                    >
                      <Link to={`/blog/${post.id}`}>
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 duration-300" />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && pagination?.total_pages! > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16">
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className={`${currentPage === page ? "bg-[#794299]" : ""}`}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pagination?.total_pages}
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
