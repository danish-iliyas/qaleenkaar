import React, { useState, useEffect } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

import {
  Loader2,
  CheckCircle2,
  XCircle,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

// CKEditor imports
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKUploadAdapter from "@/utils/CKUploadAdapter";

interface BlogUploadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onSuccess?: () => void;
  editMode?: boolean;
  blogData?: any;
}

// CKEditor upload endpoint
const uploadUrl = "http://localhost/adminPannel/api/upload-image";

const BlogUploadDialog: React.FC<BlogUploadDialogProps> = ({
  isOpen,
  onOpenChange,
  title,
  onSuccess,
  editMode = false,
  blogData,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    post_date: new Date().toISOString().split("T")[0],
    status: "draft",
  });

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load blog data in edit mode
  useEffect(() => {
    if (editMode && blogData) {
      setFormData({
        title: blogData.title,
        slug: blogData.slug,
        content: blogData.content,
        category: blogData.category,
        post_date: blogData.post_date,
        status: blogData.status,
      });
    }
  }, [editMode, blogData]);

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((p) => ({ ...p, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((p) => ({ ...p, status: value }));
  };

  const handleFileChange = (e: any) => {
    if (e.target.files?.[0]) {
      setFeaturedImage(e.target.files[0]);
    }
  };

  // SUBMIT BLOG
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const sendData = new FormData();
      sendData.append("title", formData.title);
      sendData.append("slug", formData.slug);
      sendData.append("content", formData.content);
      sendData.append("category", formData.category);
      sendData.append("post_date", formData.post_date);
      sendData.append("status", formData.status);

      if (featuredImage) {
        sendData.append("featured_image_path", featuredImage);
      }

      let url = "http://localhost/adminPannel/api/blogs";
      let method = "POST";

      if (editMode) {
        url = `http://localhost/adminPannel/api/blog/${blogData.id}`;
        sendData.append("_method", "PUT");
      }

      const res = await fetch(url, {
        method: method,
        body: sendData,
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text);

      setSuccess(true);
      onSuccess && onSuccess();

      setTimeout(() => {
        setSuccess(false);
        onOpenChange(false);
      }, 1500);

    } catch (err: any) {
      setError(err.message || "Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  // DELETE BLOG
  const handleDelete = async () => {
    if (!window.confirm("Delete this blog?")) return;

    const sendData = new FormData();
    sendData.append("_method", "DELETE");

    try {
      const res = await fetch(
        `http://localhost/adminPannel/api/blog/${blogData.id}`,
        { method: "POST", body: sendData }
      );
      const text = await res.text();
      if (!res.ok) throw new Error(text);

      onSuccess && onSuccess();
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // PUBLISH / UNPUBLISH
  const togglePublish = async () => {
    const endpoint =
      formData.status === "draft"
        ? "publish"
        : "unpublish";

    const res = await fetch(
      `http://localhost/adminPannel/api/blog/${blogData.id}/${endpoint}`,
      { method: "POST" }
    );

    const text = await res.text();
    if (!res.ok) {
      setError(text);
      return;
    }

    onSuccess && onSuccess();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">

        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {editMode ? "Edit blog post" : "Create a new blog post"}
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
            <AlertDescription>Saved successfully!</AlertDescription>
          </Alert>
        )}

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <Label>Title</Label>
            <Input id="title" value={formData.title} onChange={handleInputChange} />
          </div>

          <div>
            <Label>Slug</Label>
            <Input id="slug" disabled={editMode} value={formData.slug} onChange={handleInputChange} />
          </div>

          <div>
            <Label>Category</Label>
            <Input id="category" value={formData.category} onChange={handleInputChange} />
          </div>

          <div>
            <Label>Post Date</Label>
            <Input type="date" id="post_date" value={formData.post_date} onChange={handleInputChange} />
          </div>

          <div>
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={handleSelectChange}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Featured Image</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>

        {/* CKEditor Section */}
        <div className="mt-6">
          <Label>Content</Label>
          <div className="mt-2 border rounded-md bg-white p-2">
            <CKEditor
              editor={ClassicEditor}
              data={formData.content}
              onReady={(editor) => {
                editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
                  return new CKUploadAdapter(loader, uploadUrl);
                };
              }}
              onChange={(event, editor) => {
                setFormData((p) => ({ ...p, content: editor.getData() }));
              }}
            />
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter>
          {editMode && (
            <Button
              variant="destructive"
              className="mr-auto"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
          )}

          {editMode && (
            <Button variant="outline" onClick={togglePublish}>
              {formData.status === "draft" ? (
                <>
                  <Eye className="h-4 w-4 mr-2" /> Publish
                </>
              ) : (
                <>
                  <EyeOff className="h-4 w-4 mr-2" /> Unpublish
                </>
              )}
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            disabled={loading}
            className="bg-[#794299] hover:bg-[#62009b]"
            onClick={handleSubmit}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : editMode ? "Update" : "Save"}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default BlogUploadDialog;