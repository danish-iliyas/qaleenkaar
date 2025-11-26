import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";

// Import both dialog components
import BlogUploadDialog from "@/components/BlogUploadDialog"; 
import CollectionUploadDialog from "@/components/CollectionUploadDialog";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost/adminPannel/api";

// --- Interfaces ---

interface Blog {
  id?: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  post_date: string;
  status: string;
  featured_image_path?: string;
}

interface Collection {
  id: number;
  ref_number: string;
  title: string;
  product_type: string;
  price_text: string;
  description: string;
  size_feet: string;
  size_cms: string;
  material: string;
  colour: string;
  stock_status: string;
  images?: string[];
}

const ManageContent: React.FC = () => {
  // --- State ---

  const [collections, setCollections] = useState<Collection[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState({ collections: true, blogs: true });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Blog Dialog State
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | undefined>(undefined);
  const [isBlogEditMode, setIsBlogEditMode] = useState(false);

  // Collection Dialog State
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection | undefined>(undefined);
  const [isCollectionEditMode, setIsCollectionEditMode] = useState(false);

  // --- Effects ---

  useEffect(() => {
    fetchCollections();
    fetchBlogs();
  }, []);

  // --- Pagination Logic ---

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCollections = collections.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(collections.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Data Fetching ---

  const fetchCollections = async () => {
    setLoading((prev) => ({ ...prev, collections: true }));
    try {
      const response = await fetch(`${API_BASE}/products`);
      const data = await response.json();

      if (Array.isArray(data)) setCollections(data);
      else if (data.data && Array.isArray(data.data))
        setCollections(data.data);
      else setCollections([]);
    } catch (error) {
      console.error("Error fetching collections:", error);
      setCollections([]);
    } finally {
      setLoading((prev) => ({ ...prev, collections: false }));
    }
  };

  const fetchBlogs = async () => {
    setLoading((prev) => ({ ...prev, blogs: true }));
    try {
      const response = await fetch(`${API_BASE}/blogs`);
      const data = await response.json();

      if (Array.isArray(data)) setBlogs(data);
      else if (data.data && Array.isArray(data.data)) setBlogs(data.data);
      else setBlogs([]);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading((prev) => ({ ...prev, blogs: false }));
    }
  };

  // --- Collection Handlers ---

  const handleOpenCreateCollection = () => {
    setSelectedCollection(undefined);
    setIsCollectionEditMode(false);
    setIsCollectionDialogOpen(true);
  };

  const handleOpenCollectionDialog = (product: Collection) => {
    setSelectedCollection(product);
    setIsCollectionEditMode(true);
    setIsCollectionDialogOpen(true);
  };

  const handleCollectionSuccess = () => {
    fetchCollections(); // Re-fetch collections list
    setIsCollectionDialogOpen(false);
  };

  const handleDeleteCollection = async (id: number) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;

    try {
      const response = await fetch(`${API_BASE}/product/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCollections(collections.filter((item) => item.id !== id));
        alert("Collection deleted successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to delete: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
      alert("Error deleting collection");
    }
  };

  // --- Blog Handlers ---

  const handleOpenBlogDialog = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsBlogEditMode(true); // Always edit from here
    setIsBlogDialogOpen(true);
  };

  const handleBlogSuccess = () => {
    fetchBlogs(); // Re-fetch the list of blogs
    setIsBlogDialogOpen(false);
  };

  const handleDeleteBlog = async (id: number | undefined) => {
    if (!id) {
        alert("Cannot delete post: Missing ID.");
        return;
    }

    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const response = await fetch(`${API_BASE}/blog/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        alert(data.message || "Blog post deleted successfully!");
        setBlogs(blogs.filter((post) => post.id !== id));
      } else {
        alert(`Failed to delete: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
      alert("An error occurred while deleting the blog post.");
    }
  };

  // --- Mock Data ---

  const mockServices = [
    { id: 1, title: "Professional Washing", type: "Carpet" },
    { id: 2, title: "Expert Repairing", type: "Carpet" },
    { id: 3, title: "Delicate Shawl Washing", type: "Shawl" },
  ];

  // --- Render ---

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-gray-800 tracking-wide mb-12 text-center">
            Manage All Content
          </h1>

          <Tabs defaultValue="collections" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow rounded-lg">
              <TabsTrigger value="collections">Collections</TabsTrigger>
              <TabsTrigger value="blogs">Blog Posts</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>

            {/* ================= Collections ================= */}
            <TabsContent value="collections">
              <div className="text-right my-4">
                <Button 
                  onClick={handleOpenCreateCollection}
                  className="bg-[#794299] hover:bg-[#62009b] text-white"
                >
                  + Add New Collection
                </Button>
              </div>

              <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="font-semibold text-gray-700">Image</TableHead>
                      <TableHead className="font-semibold text-gray-700">Title</TableHead>
                      <TableHead className="font-semibold text-gray-700 hidden md:table-cell">Type</TableHead>
                      <TableHead className="font-semibold text-gray-700 hidden md:table-cell">Status</TableHead>
                      <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading.collections ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : currentCollections.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          No collections found
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentCollections.map((item) => (
                        <TableRow key={item.id} className="hover:bg-gray-50 transition">
                          <TableCell>
                            <img
                              src={item.images?.[0] || "https://via.placeholder.com/60"}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded-md shadow-sm border"
                            />
                          </TableCell>
                          <TableCell className="font-medium text-gray-800">{item.title}</TableCell>
                          <TableCell className="hidden md:table-cell text-gray-600">{item.product_type}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.stock_status === "1"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.stock_status === "1" ? "In Stock" : "Out of Stock"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right space-x-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => handleOpenCollectionDialog(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive/80"
                              onClick={() => handleDeleteCollection(item.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {collections.length > 0 && (
                <div className="flex flex-col md:flex-row justify-between items-center mt-6 px-2 gap-3">
                  <p className="text-sm text-gray-600">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstItem + 1}</span>–
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, collections.length)}
                    </span>{" "}
                    of <span className="font-medium">{collections.length}</span> products
                  </p>

                  {totalPages > 1 && (
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        Previous
                      </Button>
                      {[...Array(totalPages)].map((_, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant={currentPage === index + 1 ? "default" : "outline"}
                          className="rounded-full w-8 h-8"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Button>
                      ))}
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* ================= Blogs ================= */}
            <TabsContent value="blogs">
              {/* You can add a "Create Blog" button here if you want */}
              <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="font-semibold text-gray-700">Title</TableHead>
                      <TableHead className="font-semibold text-gray-700 hidden md:table-cell">Category</TableHead>
                      <TableHead className="font-semibold text-gray-700 hidden md:table-cell">Status</TableHead>
                      <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading.blogs ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : blogs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                          No blog posts found
                        </TableCell>
                      </TableRow>
                    ) : (
                      blogs.map((post) => (
                        <TableRow key={post.id || post.slug} className="hover:bg-gray-50 transition">
                          <TableCell className="font-medium text-gray-800">{post.title}</TableCell>
                          <TableCell className="hidden md:table-cell text-gray-600">{post.category}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                post.status === "published"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {post.status === "published" ? "Published" : "Draft"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right space-x-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => handleOpenBlogDialog(post)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive hover:text-destructive/80"
                              onClick={() => handleDeleteBlog(post.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* ================= Services ================= */}
            <TabsContent value="services">
              <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="font-semibold text-gray-700">Title</TableHead>
                      <TableHead className="font-semibold text-gray-700 hidden md:table-cell">Type</TableHead>
                      <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockServices.map((service) => (
                      <TableRow key={service.id} className="hover:bg-gray-50 transition">
                        <TableCell className="font-medium text-gray-800">{service.title}</TableCell>
                        <TableCell className="hidden md:table-cell text-gray-600">{service.type}</TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80">
                            <Trash className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* --- Dialogs --- */}

      <BlogUploadDialog
        isOpen={isBlogDialogOpen}
        onOpenChange={setIsBlogDialogOpen}
        title="Edit Blog Post"
        editMode={isBlogEditMode}
        blogData={selectedBlog}
        onSuccess={handleBlogSuccess}
      />

      <CollectionUploadDialog
        isOpen={isCollectionDialogOpen}
        onOpenChange={setIsCollectionDialogOpen}
        editMode={isCollectionEditMode}
        productData={selectedCollection}
        onSuccess={handleCollectionSuccess}
      />
    </div>
  );
};

export default ManageContent;