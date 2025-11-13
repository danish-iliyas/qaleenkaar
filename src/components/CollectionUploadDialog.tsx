import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

interface CollectionUploadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onSuccess?: () => void;
}

const CollectionUploadDialog: React.FC<CollectionUploadDialogProps> = ({
  isOpen,
  onOpenChange,
  title,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    ref_number: "",
    title: "",
    product_type: "",
    price_text: "",
    description: "",
    size_feet: "",
    size_cms: "",
    material: "",
    colour: "",
    stock_status: "1",
  });

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError(null);
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, stock_status: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
      console.log("Files selected:", filesArray.length);
    }
  };

  const handleSubmit = async () => {
    console.log("Submit button clicked!");
    console.log("Form Data:", formData);

    // Basic validation
    if (!formData.title || !formData.ref_number || !formData.product_type) {
      setError("Please fill in all required fields (Title, Ref. Number, Product Type)");
      console.log("Validation failed");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Create FormData for multipart/form-data request
      const formDataToSend = new FormData();

      // Append all text fields
      formDataToSend.append("ref_number", formData.ref_number);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("product_type", formData.product_type);
      formDataToSend.append("price_text", formData.price_text);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("size_feet", formData.size_feet);
      formDataToSend.append("size_cms", formData.size_cms);
      formDataToSend.append("material", formData.material);
      formDataToSend.append("colour", formData.colour);
      formDataToSend.append("stock_status", formData.stock_status);

      // Append images if any
      if (images.length > 0) {
        images.forEach((file, index) => {
          formDataToSend.append(`images[${index}]`, file);
          console.log(`Added image ${index}:`, file.name);
        });
      }

      console.log("Making API call to: http://localhost/adminPannel/api/products");
      console.log("FormData entries:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      // Make POST request to the API
      const response = await fetch("http://localhost/adminPannel/api/products", {
        method: "POST",
        body: formDataToSend,
        // Don't set Content-Type - browser sets it automatically with boundary for FormData
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      const responseText = await response.text();
      console.log("Response text:", responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.log("Response is not JSON:", responseText);
        if (!response.ok) {
          throw new Error(`Server error: ${response.status} - ${responseText}`);
        }
        data = { message: "Success" };
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      console.log("Product created successfully:", data);

      // Show success message
      setSuccess(true);

      // Reset form
      setFormData({
        ref_number: "",
        title: "",
        product_type: "",
        price_text: "",
        description: "",
        size_feet: "",
        size_cms: "",
        material: "",
        colour: "",
        stock_status: "1",
      });
      setImages([]);
      
      // Reset file input
      const fileInput = document.getElementById("images") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Close dialog after a short delay
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Error creating product:", err);
      setError(err instanceof Error ? err.message : "Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Fill out the details below to add a new product.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Product created successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="py-4">
          {/* 2-column grid for the form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="New Modern Carpet"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="ref_number">
                  Ref. Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ref_number"
                  placeholder="MC-103"
                  value={formData.ref_number}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="product_type">
                  Product Type <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="product_type"
                  placeholder="e.g., Carpet, Shawl"
                  value={formData.product_type}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="material">Material</Label>
                <Input
                  id="material"
                  placeholder="Wool"
                  value={formData.material}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price_text">Price</Label>
                <Input
                  id="price_text"
                  placeholder="2111"
                  value={formData.price_text}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="colour">Colour</Label>
                <Input
                  id="colour"
                  placeholder="Red"
                  value={formData.colour}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="size_feet">Size (Feet)</Label>
                <Input
                  id="size_feet"
                  placeholder="5 x 8"
                  value={formData.size_feet}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="size_cms">Size (cm)</Label>
                <Input
                  id="size_cms"
                  placeholder="152 x 244"
                  value={formData.size_cms}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="stock_status">Stock Status</Label>
                <Select value={formData.stock_status} onValueChange={handleSelectChange}>
                  <SelectTrigger id="stock_status" className="mt-1">
                    <SelectValue placeholder="Select status..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">In Stock</SelectItem>
                    <SelectItem value="0">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="images">Images</Label>
                <Input 
                  id="images" 
                  type="file" 
                  multiple 
                  onChange={handleFileChange} 
                  accept="image/*"
                  className="mt-1"
                />
                {images.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {images.length} file(s) selected
                  </p>
                )}
              </div>
            </div>

            {/* Full Width Description */}
            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description..."
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              console.log("Cancel clicked");
              onOpenChange(false);
            }}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-[#794299] hover:bg-[#62009b] text-white"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Product"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionUploadDialog;