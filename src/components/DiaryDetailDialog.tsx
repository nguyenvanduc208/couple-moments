import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Calendar, User, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Comment {
  author: string;
  content: string;
  date: string;
}

interface DiaryEntry {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  images: string[];
  comments: Comment[];
}

interface DiaryDetailDialogProps {
  entry: DiaryEntry | null;
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (entryId: number, comment: Comment) => void;
}

const DiaryDetailDialog = ({ entry, isOpen, onClose, onAddComment }: DiaryDetailDialogProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newComment, setNewComment] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, entry?.id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleAddComment = () => {
    if (newComment.trim() && entry) {
      onAddComment(entry.id, {
        author: "You",
        content: newComment,
        date: new Date().toISOString()
      });
      setNewComment("");
      
      setTimeout(() => {
        if (scrollAreaRef.current) {
          const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
          if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
          }
        }
      }, 100);
    }
  };

  const handlePrevImage = () => {
    if (entry) {
      setCurrentImageIndex((prev) => (prev === 0 ? entry.images.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    if (entry) {
      setCurrentImageIndex((prev) => (prev === entry.images.length - 1 ? 0 : prev + 1));
    }
  };

  if (!entry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{entry.title}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 overflow-hidden">
          {/* Left: Image Carousel */}
          <div className="space-y-4">
            {entry.images.length > 0 && (
              <div className="relative">
                <div className="relative aspect-square bg-black rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={entry.images[currentImageIndex]}
                      alt={`Memory ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  
                  {entry.images.length > 1 && (
                    <>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                        onClick={handlePrevImage}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                        onClick={handleNextImage}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {entry.images.length}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right: Content and Comments */}
          <div className="flex flex-col max-h-[calc(90vh-8rem)]">
            <div className="space-y-4 mb-4">
              <p className="text-muted-foreground leading-relaxed">{entry.content}</p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{entry.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(entry.date)}</span>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="border-t border-border pt-4 flex-1 flex flex-col min-h-0">
              <h4 className="font-semibold mb-3">Comments ({entry.comments.length})</h4>
              
              <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4 mb-4">
                <div className="space-y-3">
                  {entry.comments.map((comment, idx) => (
                    <div key={idx} className="bg-secondary/30 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(comment.date)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Add Comment Input */}
              <div className="flex gap-2 pt-2 border-t border-border">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiaryDetailDialog;
