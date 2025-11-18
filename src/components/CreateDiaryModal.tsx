import { useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface CreateDiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: any) => void;
}

const CreateDiaryModal = ({ isOpen, onClose, onSubmit }: CreateDiaryModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const handleAddImage = () => {
    if (currentImageUrl && imageUrls.length < 5) {
      setImageUrls([...imageUrls, currentImageUrl]);
      setCurrentImageUrl("");
    } else if (imageUrls.length >= 5) {
      toast.error("Maximum 5 images allowed");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Please add a title");
      return;
    }

    const newEntry = {
      id: Date.now(),
      title,
      content,
      date: new Date().toISOString().split('T')[0],
      author: "Sarah", // In real app, this would be the current user
      images: imageUrls,
      comments: []
    };

    onSubmit(newEntry);
    
    // Reset form
    setTitle("");
    setContent("");
    setImageUrls([]);
    setCurrentImageUrl("");
    
    toast.success("Memory created!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Create New Memory
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Title
            </label>
            <Input
              placeholder="Give your memory a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border-border"
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              What happened?
            </label>
            <Textarea
              placeholder="Share your thoughts and feelings..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="rounded-xl border-border min-h-[120px] resize-none"
            />
          </div>

          {/* Images */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Photos ({imageUrls.length}/5)
            </label>
            
            {/* Image URL Input */}
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Paste image URL..."
                value={currentImageUrl}
                onChange={(e) => setCurrentImageUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddImage()}
                className="rounded-xl border-border"
              />
              <Button
                type="button"
                onClick={handleAddImage}
                disabled={!currentImageUrl || imageUrls.length >= 5}
                size="icon"
                className="rounded-xl bg-primary hover:bg-primary/90"
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Image Preview Grid */}
            {imageUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-secondary group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Create Memory
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDiaryModal;
