import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { X, Upload, ImagePlus } from "lucide-react";

interface SellExchangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  name: string;
  email: string;
  contactNumber: string;
  itemType: string;
  size: string;
  condition: string;
  photos: File[];
}

const SellExchangeModal = ({ open, onOpenChange }: SellExchangeModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contactNumber: "",
    itemType: "",
    size: "",
    condition: "",
    photos: [],
  });
  const [photoPreview, setPhotoPreview] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 4 - formData.photos.length;
    const newFiles = Array.from(files).slice(0, remainingSlots);

    if (newFiles.length === 0) {
      toast.error("Maximum 4 photos allowed");
      return;
    }

    // Validate file types
    const validFiles = newFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length !== newFiles.length) {
      toast.error("Please upload only image files");
    }

    // Create previews
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...validFiles],
    }));

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
    setPhotoPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      contactNumber: "",
      itemType: "",
      size: "",
      condition: "",
      photos: [],
    });
    setPhotoPreview([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.contactNumber.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    if (!formData.itemType) {
      toast.error("Please select item type");
      return;
    }
    if (!formData.size.trim()) {
      toast.error("Please enter the size");
      return;
    }
    if (!formData.condition.trim()) {
      toast.error("Please describe the condition");
      return;
    }
    if (formData.photos.length === 0) {
      toast.error("Please upload at least one photo");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create email body with form data
      const emailBody = `
SELL & EXCHANGE REQUEST
========================

Customer Details:
-----------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.contactNumber}

Item Details:
-------------
Item Type: ${formData.itemType}
Size: ${formData.size}

Condition & Description:
------------------------
${formData.condition}

Note: ${formData.photos.length} photo(s) attached. Please check your email attachments.
      `.trim();

      const emailSubject = `Sell & Exchange Request - ${formData.itemType} from ${formData.name}`;

      // Open mailto with form data
      const mailtoLink = `mailto:Qaleenkaar@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      // Open email client
      window.location.href = mailtoLink;

      toast.success("Your request has been sent successfully.", {
        description: "we will contact you with in 2 ,3 buisness days.",
        duration: 7000,
      });

      resetForm();
      onOpenChange(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Example image labels for guidance
  const imageGuideLabels = [
    "Full Front View",
    "Front Zoom In",
    "Back Zoom In",
    "Any Damages"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-normal text-black uppercase tracking-widest">
            Sell & Exchange
          </DialogTitle>
          <DialogDescription className="font-sans text-xs text-gray-500 uppercase tracking-wide">
            Submit your carpet or shawl details for evaluation
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-2 mt-4">
          {/* Photo Upload Guide */}
          <div className="space-y-2">
            <Label className="font-sans text-xs font-bold text-black uppercase tracking-widest">
              Photos Guide - Upload 4 Photos Like This *
            </Label>

            {/* Example Image Guide */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {imageGuideLabels.map((label, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-1"
                >
                  <div className="w-8 h-8 mb-1 rounded bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-lg font-bold">{index + 1}</span>
                  </div>
                  <span className="text-[8px] text-gray-500 uppercase text-center leading-tight font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Actual Photo Upload Section */}
            <Label className="font-sans text-[10px] text-gray-600 uppercase tracking-wide">
              Your Uploaded Photos:
            </Label>
            <div className="grid grid-cols-4 gap-3">
              {photoPreview.map((preview, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
                >
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] text-center py-0.5 uppercase">
                    {imageGuideLabels[index] || `Photo ${index + 1}`}
                  </div>
                </div>
              ))}
              {formData.photos.length < 4 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <ImagePlus className="w-6 h-6 text-gray-400" />
                  <span className="text-[10px] text-gray-400 uppercase">
                    Add
                  </span>
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">
              Upload photos as shown above (will be attached to email)
            </p>
          </div>

          {/* Item Type */}
          <div className="space-y-2">
            <Label className="font-sans text-xs font-bold text-black uppercase tracking-widest">
              Item Type *
            </Label>
            <Select
              value={formData.itemType}
              onValueChange={(value) => handleSelectChange("itemType", value)}
            >
              <SelectTrigger className="bg-white border-gray-200 focus:border-black rounded-none h-12">
                <SelectValue placeholder="SELECT ITEM TYPE" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carpet">Carpet</SelectItem>
                <SelectItem value="shawl">Shawl</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <Label className="font-sans text-xs font-bold text-black uppercase tracking-widest">
              Size (e.g., 6x9 foot) *
            </Label>
            <Input
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              placeholder="ENTER SIZE"
              className="bg-white border-gray-200 focus:border-black rounded-none h-12 placeholder:text-gray-300 placeholder:text-xs placeholder:uppercase placeholder:tracking-wider"
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label className="font-sans text-xs font-bold text-black uppercase tracking-widest">
              Your Name *
            </Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="ENTER YOUR NAME"
              className="bg-white border-gray-200 focus:border-black rounded-none h-12 placeholder:text-gray-300 placeholder:text-xs placeholder:uppercase placeholder:tracking-wider"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label className="font-sans text-xs font-bold text-black uppercase tracking-widest">
              Phone Number *
            </Label>
            <Input
              name="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="ENTER PHONE NUMBER"
              className="bg-white border-gray-200 focus:border-black rounded-none h-12 placeholder:text-gray-300 placeholder:text-xs placeholder:uppercase placeholder:tracking-wider"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="font-sans text-xs font-bold text-black uppercase tracking-widest">
              Email *
            </Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="ENTER EMAIL ADDRESS"
              className="bg-white border-gray-200 focus:border-black rounded-none h-12 placeholder:text-gray-300 placeholder:text-xs placeholder:uppercase placeholder:tracking-wider"
              required
            />
          </div>

          {/* Condition/Description */}
          <div className="space-y-2">
            <Label className="font-sans text-xs font-bold text-black uppercase tracking-widest">
              Condition & Description *
            </Label>
            <Textarea
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              placeholder="DESCRIBE THE CONDITION OF YOUR ITEM (E.G., AGE, WEAR, ANY DAMAGE, ETC.)"
              rows={4}
              className="bg-white border-gray-200 focus:border-black rounded-none placeholder:text-gray-300 placeholder:text-xs placeholder:uppercase placeholder:tracking-wider resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black hover:bg-gray-900 text-white font-sans text-xs font-bold uppercase tracking-[0.2em] h-14 rounded-none transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SellExchangeModal;
