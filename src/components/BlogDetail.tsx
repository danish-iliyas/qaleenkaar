import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Loader2,
  AlertCircle,
  ArrowLeft,
  Share2,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost/adminPannel/api";

// Blog Type
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

const formatDate = (dateString: string) => {
  if (!dateString) return "Date not available";
  return new Date(dateString)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
};

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const blogUrl = window.location.href;

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      blogUrl
    )}&text=${encodeURIComponent(blog?.title || "")}`;
    window.open(url, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      blogUrl
    )}`;
    window.open(url, "_blank");
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      blog?.title + " - " + blogUrl
    )}`;
    window.open(url, "_blank");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(blogUrl);
    alert("Link copied to clipboard!");
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_BASE}/blog/${id}`);
        const data = await response.json();

        if (data.status === "success") setBlog(data.data);
        else setError("Blog not found");
      } catch {
        setError("Unable to load blog post.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Loading Screen
  if (loading)
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen bg-white">
          <Loader2 className="w-8 h-8 text-black animate-spin" />
        </div>
        <Footer />
      </>
    );

  // Error Screen
  if (error || !blog)
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
          <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
          <h1 className="text-2xl font-normal text-black uppercase tracking-widest mb-2">
            Post Not Found
          </h1>
          <p className="text-sm text-gray-500 mb-6 uppercase tracking-wide">
            {error}
          </p>
          <Button
            asChild
            className="bg-black hover:bg-gray-900 text-white rounded-none font-sans text-xs uppercase tracking-widest px-8"
          >
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Link>
          </Button>
        </div>
        <Footer />
      </>
    );

  // SUCCESS UI
  return (
    <div className="bg-white">
      <Header />

      <main className="pt-10 pb-20">
        <div className="container mx-auto px-4">
          {/* BACK BUTTON aligned with blog card */}
          <div className="max-w-4xl mx-auto flex justify-start mb-8">
            <Link
              to="/blog"
              className="
                inline-flex items-center gap-2
                text-xs font-bold font-sans uppercase tracking-[0.2em]
                text-black
                border-b border-transparent
                hover:border-black
                transition-all
                pb-1
              "
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all posts</span>
            </Link>
          </div>

          {/* BLOG CONTENT */}
          <div className="max-w-4xl mx-auto">
            {/* FEATURED IMAGE */}
            <div className="mb-10 w-full aspect-[21/9] overflow-hidden bg-gray-100">
              <img
                src={blog.featured_image_path}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* HEADER INFO */}
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <div className="flex justify-center items-center gap-4 text-[11px] font-sans font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
                <span className="text-black">{blog.category}</span>
                <span>|</span>
                <span>{formatDate(blog.post_date)}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-normal font-serif text-black leading-tight mb-8 uppercase tracking-wide">
                {blog.title}
              </h1>

              {/* SHARE BUTTONS - Minimal */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={shareOnWhatsApp}
                  className="p-2 border border-gray-200 hover:bg-black hover:text-white hover:border-black transition-colors rounded-none"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="p-2 border border-gray-200 hover:bg-black hover:text-white hover:border-black transition-colors rounded-none"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="p-2 border border-gray-200 hover:bg-black hover:text-white hover:border-black transition-colors rounded-none"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={copyToClipboard}
                  className="p-2 border border-gray-200 hover:bg-black hover:text-white hover:border-black transition-colors rounded-none"
                >
                  <Link2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CONTENT PROSE */}
            <article
              className="
                prose prose-lg md:prose-xl mx-auto
                font-sans text-gray-600 leading-8
                prose-headings:font-serif prose-headings:uppercase prose-headings:tracking-wide prose-headings:font-normal prose-headings:text-black
                prose-a:text-black prose-a:underline prose-a:decoration-1 prose-a:underline-offset-4
                prose-strong:text-black prose-strong:font-bold
                prose-blockquote:border-l-2 
                prose-blockquote:border-black
                prose-blockquote:pl-6
                prose-blockquote:text-lg 
                prose-blockquote:font-serif
                prose-blockquote:italic
                prose-blockquote:text-black
                prose-img:rounded-none
                prose-img:my-10
              "
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;
