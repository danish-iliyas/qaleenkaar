import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import AuthProvider
import { AuthProvider } from "./context/AuthContext";

// Import Pages
import Index from "./pages/Index";
import Services from "./pages/Services";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Blog from "./pages/Blog";
import BookAppointment from "./pages/BookAppointment";
import NotFound from "./pages/NotFound";
import ProductDetailPage from "./components/ProductDetailPage";
import BlogDetail from "./components/BlogDetail.tsx"; 

// Import New Admin Page and Protected Route
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageContent from "./pages/ManageContent"; // <-- IMPORT NEW PAGE

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Wrap the entire app in AuthProvider */}
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
        <Route path="/collection/:type" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
            {/* Protected Admin Route */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            {/* --- NEW ROUTE ADDED --- */}
            <Route
              path="/admin/manage-content"
              element={
                <ProtectedRoute>
                  <ManageContent />
                </ProtectedRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;