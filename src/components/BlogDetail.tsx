import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Loader2,
  AlertCircle,
  ArrowLeft,
  Share2,
  Twitter,
  Linkedin,
  Link2
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const API_BASE = "http://localhost/adminPannel/api";

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
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();
};

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const blogUrl = window.location.href;

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(blog?.title || "")}`;
    window.open(url, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`;
    window.open(url, "_blank");
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(blog?.title + " - " + blogUrl)}`;
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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#fff5fa] to-[#f8eaff]">
          <Loader2 className="w-12 h-12 text-[#794299] animate-spin" />
        </div>
        <Footer />
      </>
    );

  // Error Screen
  if (error || !blog)
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#fff8fc] text-center px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Post Not Found</h1>
          <p className="text-lg text-gray-500 mb-6">{error}</p>
          <Button asChild className="bg-[#794299] hover:bg-[#62009b]">
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
    <div className="bg-gradient-to-b from-[#fff9fb] via-[#fdf3ff] to-[#f9e8ff]">
      <Header />

      <main className="pt-[20px] pb-20">
        <div className="container mx-auto px-4">

          {/* BACK BUTTON aligned with blog card */}
          <div className="max-w-4xl mx-auto flex justify-end mb-6">
            <Link
              to="/blog"
              className="
                inline-flex items-center gap-3
                px-5 py-2.5
                rounded-xl
                bg-white
                shadow-sm
                border border-gray-100
                transition-all
                hover:shadow-md
                hover:bg-[#f7e5ff]/70
              "
            >
              <span
                className="
                  w-9 h-9
                  flex items-center justify-center
                  rounded-full
                  bg-[#e7c7ff]
                  text-[#7c3aed]
                "
              >
                <ArrowLeft className="w-4 h-4" />
              </span>

              <span className="font-medium text-gray-700 text-[15px]">
                Back to all posts
              </span>
            </Link>
          </div>

          {/* BLOG CARD */}
          <div className="
            max-w-4xl mx-auto 
            bg-white/80 
            backdrop-blur-xl 
            shadow-xl 
            rounded-3xl 
            p-6 md:p-10 
            border border-white/20
          ">

            {/* TITLE */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {blog.title}
            </h1>

            {/* META */}
            <div className="flex flex-wrap items-center gap-3 text-gray-500 mb-8">
              <span className="font-medium text-[#794299]">The Qaleenkaar</span>
              <span className="text-gray-400">•</span>
              <span className="text-[#794299] font-medium">{blog.category}</span>
              <span className="text-gray-400">•</span>
              <span>{formatDate(blog.post_date)}</span>
            </div>

            {/* SHARE BUTTONS */}
            <div className="flex items-center gap-3 flex-wrap mb-10">

              <Button variant="outline" size="sm" onClick={shareOnWhatsApp} className="bg-white hover:bg-[#f7e5ff]">
                <Share2 className="w-4 h-4 mr-2" /> WhatsApp
              </Button>

              <Button variant="outline" size="sm" onClick={shareOnTwitter} className="bg-white hover:bg-[#f7e5ff]">
                <Twitter className="w-4 h-4 mr-2" /> Twitter
              </Button>

              <Button variant="outline" size="sm" onClick={shareOnLinkedIn} className="bg-white hover:bg-[#f7e5ff]">
                <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
              </Button>

              <Button variant="outline" size="sm" onClick={copyToClipboard} className="bg-white hover:bg-[#f7e5ff]">
                <Link2 className="w-4 h-4 mr-2" /> Copy Link
              </Button>

            </div>

            {/* FEATURED IMAGE */}
            <div className="mb-10">
              <img
                src={blog.featured_image_path}
                alt={blog.title}
                className="w-full rounded-2xl shadow-lg max-h-[60vh] object-cover"
              />
            </div>

            {/* CONTENT */}
            <article
              className="
                prose prose-lg md:prose-xl 
                text-gray-700 leading-relaxed
                prose-headings:text-gray-900 
                prose-a:text-[#794299]
                hover:prose-a:text-[#62009b]
                prose-img:rounded-xl 
                prose-img:shadow-md
                prose-blockquote:border-l-4 
                prose-blockquote:border-[#794299]
                prose-blockquote:pl-6
                prose-blockquote:text-xl 
                prose-blockquote:italic
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
