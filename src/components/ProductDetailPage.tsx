import React, { useState, useEffect } from "react";
// --- NEW --- Import hooks to get URL param and fetch data
import { useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Home,
  User,
  ShoppingCart,
  Search,
} from "lucide-react";
import Header from "@/components/Header"; // Adjust path if needed
import Footer from "@/components/Footer"; // Adjust path if needed
import { Loader2 } from "lucide-react"; // For loading spinner

// --- NEW --- Define the Product type based on your API
interface Product {
  id: number;
  name: string;
  ref_number: string; // Changed from refNumber to match backend
  size_feet: string;
  size_cms: string;
  material: string;
  colour: string; // Changed from colors to match backend
  description: string;
  stock_status: string; // Changed from inStock to match backend
  images: string[]; // Expect an array of image URLs
}

const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://hotpink-tapir-344575.hostingersite.com/api";

const ProductDetailPage: React.FC = () => {
  // --- NEW --- Get the 'id' from the URL (e.g., /product/123)
  const { id } = useParams<{ id: string }>();

  // --- NEW --- State for product data, loading, and errors
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // This state now controls the image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- NEW --- Fetch product data when the component loads or ID changes
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE}/product/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();

        // Check if data is nested (e.g., { "data": { ... } })
        const productData = data.data ? data.data : data;

        // Ensure images is an array
        if (!Array.isArray(productData.images)) {
          productData.images = [productData.images];
        }

        setProduct(productData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // --- NEW --- Functions to navigate the product's image gallery
  const nextImage = () => {
    if (!product) return;
    setCurrentIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product) return;
    setCurrentIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

  // --- NEW --- Loading State
  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
          <Loader2 className="w-12 h-12 animate-spin text-gray-800" />
        </div>
        <Footer />
      </>
    );
  }

  // --- NEW --- Error State
  if (error || !product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-700">
              {error || "Product could not be found."}
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // --- MODIFIED --- All data now comes from the 'product' state
  return (
    <>
      <Header />
      <div className="min-h-screen flex justify-center items-center bg-gray-50 pb-20 lg:pb-8  ">
        <div className="max-w-7xl mx-auto bg-white  lg:shadow-lg overflow-hidden lg:m-8">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-0">
            {/* Left Sidebar - Thumbnail Gallery */}
            <div className="col-span-2 bg-gray-100 p-4 space-y-3">
              {/* --- MODIFIED --- Map over product.images */}
              {product.images.map((imageSrc, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`cursor-pointer border-2 rounded overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? "border-blue-500 shadow-md scale-105"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={imageSrc}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Center - Main Carpet Display */}
            <div className="col-span-6 relative bg-white p-8 flex items-center justify-center">
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>

              <div className="relative">
                {/* --- MODIFIED --- Show the current selected image */}
                <img
                  src={product.images[currentIndex]}
                  alt={product.name}
                  className="max-h-[600px] w-auto object-contain rounded-lg shadow-xl"
                />
              </div>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {/* --- MODIFIED --- Map over product.images */}
                {product.images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-blue-500"
                        : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Sidebar - Product Details */}
            {/* --- MODIFIED --- All data from 'product' state */}
            <div className="col-span-4 p-8 bg-gray-50">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl font-serif text-gray-900">
                  {product.name}
                </h1>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  {/* <Heart className="w-6 h-6" /> */}
                </button>
              </div>

              <p className="text-lg text-gray-600 mb-8">
                Price available on request
              </p>

              <div className="space-y-6 mb-8">
                <p className="text-gray-700 leading-relaxed text-sm">
                  {product.description}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Reference Number</span>
                    <span className="text-gray-900 font-medium">
                      {product.ref_number}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Size In Feet</span>
                    <span className="text-gray-900 font-medium">
                      {product.size_feet}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Size In Cms</span>
                    <span className="text-gray-900 font-medium">
                      {product.size_cms}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Material</span>
                    <span className="text-gray-900 font-medium">
                      {product.material}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Colour</span>
                    <span className="text-gray-900 font-medium text-right text-sm">
                      {product.colour}
                    </span>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-2 ${
                    product.stock_status === "1"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <div
                    className={`w-2 h-2 ${
                      product.stock_status === "1"
                        ? "bg-green-600"
                        : "bg-red-600"
                    } rounded-full`}
                  ></div>
                  <span className="text-sm font-medium">
                    {product.stock_status === "1" ? "In stock" : "Out of stock"}
                  </span>
                </div>
              </div>

              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg transition-colors font-medium mb-3">
                Contact Us
              </button>

              {/* <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-900 py-3 px-6 rounded-lg transition-colors font-medium">
                Add to wishlist
              </button> */}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Mobile Main Image with Navigation */}
            <div className="relative bg-white">
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>

              <div className="px-12 py-8">
                <img
                  src={product.images[currentIndex]}
                  alt={product.name}
                  className="w-full h-auto max-h-96 object-contain rounded-lg"
                />
              </div>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>

              {/* Mobile Dots Indicator */}
              <div className="flex justify-center gap-2 pb-4">
                {product.images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-blue-500"
                        : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Mobile Thumbnail Gallery - Horizontal Scroll */}
            <div className="flex gap-2 p-4 overflow-x-auto bg-gray-50">
              {product.images.map((imageSrc, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 cursor-pointer border-2 rounded overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? "border-blue-500 shadow-md"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={imageSrc}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Mobile Product Details */}
            <div className="p-4 bg-white">
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-xl font-serif text-gray-900 flex-1 pr-2">
                  {product.name}
                </h1>
                <button className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              <p className="text-base text-gray-600 mb-4">
                Price available on request
              </p>

              <div className="space-y-4 mb-6">
                <p className="text-gray-700 leading-relaxed text-sm">
                  {product.description}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
                    <span className="text-gray-600">Reference Number</span>
                    <span className="text-gray-900 font-medium">
                      {product.ref_number}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
                    <span className="text-gray-600">Size In Feet</span>
                    <span className="text-gray-900 font-medium">
                      {product.size_feet}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
                    <span className="text-gray-600">Size In Cms</span>
                    <span className="text-gray-900 font-medium">
                      {product.size_cms}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
                    <span className="text-gray-600">Material</span>
                    <span className="text-gray-900 font-medium">
                      {product.material}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200 text-sm">
                    <span className="text-gray-600">Colour</span>
                    <span className="text-gray-900 font-medium text-right text-xs">
                      {product.colour}
                    </span>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-2 ${
                    product.stock_status === "1"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <div
                    className={`w-2 h-2 ${
                      product.stock_status === "1"
                        ? "bg-green-600"
                        : "bg-red-600"
                    } rounded-full`}
                  ></div>
                  <span className="text-sm font-medium">
                    {product.stock_status === "1" ? "In stock" : "Out of stock"}
                  </span>
                </div>
              </div>

              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg transition-colors font-medium mb-3">
                Contact Us
              </button>

              <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-900 py-3 px-6 rounded-lg transition-colors font-medium">
                Add to wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg lg:hidden z-50">
          <div className="grid grid-cols-5 h-16">
            <button className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">
              <Home className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">HOME</span>
            </button>

            <button className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">
              <User className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">ACCOUNT</span>
            </button>

            <button className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">
              <Heart className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">WISHLIST</span>
            </button>

            <button className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-900 transition-colors relative">
              <ShoppingCart className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">CART</span>
              <span className="absolute top-1 right-6 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            <button className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">
              <Search className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">SEARCH</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
