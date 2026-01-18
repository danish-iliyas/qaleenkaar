import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { serviceApi, ServiceItem } from "@/services/serviceApi";
import { Loader2 } from "lucide-react";

interface ServiceUploadDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    editMode?: boolean;
    serviceData?: ServiceItem;
    onSuccess?: () => void;
}

const ServiceUploadDialog: React.FC<ServiceUploadDialogProps> = ({
    isOpen,
    onOpenChange,
    title,
    editMode = false,
    serviceData,
    onSuccess,
}) => {
    const [formData, setFormData] = useState({
        title: "",
        type: "carpet",
        link_to: "#",
        description: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editMode && serviceData) {
            setFormData({
                title: serviceData.title || "",
                type: serviceData.type || "carpet",
                link_to: serviceData.link_to || "#",
                description: serviceData.description || "",
            });
        } else {
            // Reset form for create mode
            setFormData({
                title: "",
                type: "carpet",
                link_to: "#",
                description: "",
            });
            setImageFile(null);
        }
    }, [editMode, serviceData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, type: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("type", formData.type);
            data.append("link_to", formData.link_to);
            data.append("description", formData.description);
            if (imageFile) {
                data.append("image", imageFile);
            }

            let response;
            if (editMode && serviceData?.id) {
                response = await serviceApi.update(serviceData.id, data);
            } else {
                response = await serviceApi.create(data);
            }

            if (response && response.status === "success") {
                alert(editMode ? "Service updated successfully!" : "Service created successfully!");
                onSuccess?.();
                onOpenChange(false);
            } else {
                alert("Operation failed: " + (response?.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Error submitting service:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Service Title</Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Professional Washing"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="type">Type</Label>
                        <Select onValueChange={handleSelectChange} value={formData.type}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="carpet">Carpet</SelectItem>
                                <SelectItem value="shawl">Shawl</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="image">Service Image {editMode && "(Leave empty to keep existing)"}</Label>
                        <Input id="image" type="file" onChange={handleImageChange} accept="image/*" />
                    </div>

                    <div>
                        <Label htmlFor="link_to">Link URL</Label>
                        <Input
                            id="link_to"
                            name="link_to"
                            value={formData.link_to}
                            onChange={handleChange}
                            placeholder="/services#section-id"
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Brief description..."
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-[#794299] hover:bg-[#62009b]">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : editMode ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ServiceUploadDialog;
