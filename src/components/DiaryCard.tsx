import { Calendar, MessageCircle, User, Send, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
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

interface DiaryCardProps {
  entry: DiaryEntry;
  index: number;
  onAddComment: (entryId: number, comment: Comment) => void;
  onOpenDetail: (entry: DiaryEntry) => void;
}

const DiaryCard = ({ entry, index, onAddComment, onOpenDetail }: DiaryCardProps) => {
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(entry.id, {
        author: "You",
        content: newComment,
        date: new Date().toISOString()
      });
      setNewComment("");
      
      // Scroll to bottom after adding comment
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

  useEffect(() => {
    if (showComments && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [showComments]);

  return (
    <Card 
      className="overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Images Gallery - Show max 2 images + count */}
      {entry.images.length > 0 && (
        <div className={cn(
          "gap-2 p-2",
          entry.images.length === 1 ? "flex" : "grid grid-cols-2"
        )}>
          {entry.images.slice(0, 2).map((image, idx) => (
            <div 
              key={idx} 
              className={cn(
                "relative overflow-hidden rounded-xl aspect-square bg-muted/30 cursor-pointer",
                entry.images.length === 1 && "w-full"
              )}
              onClick={() => onOpenDetail(entry)}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
                <img
                  src={image}
                  alt={`Memory ${idx + 1}`}
                  className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
              {idx === 1 && entry.images.length > 2 && (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <span className="text-foreground text-3xl font-bold">+{entry.images.length - 2}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2">{entry.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{entry.content}</p>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{entry.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(entry.date)}</span>
          </div>
        </div>

        {/* Comments Section */}
        {entry.comments.length > 0 && (
          <div className="border-t border-border/50 pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="w-full mb-2 text-muted-foreground hover:text-foreground hover:bg-transparent"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {showComments ? 'Hide' : 'Show'} {entry.comments.length} {entry.comments.length === 1 ? 'comment' : 'comments'}
              {!showComments && entry.comments.length > 2 && <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>
            
            {showComments && (
              <ScrollArea ref={scrollAreaRef} className="h-[200px] pr-4">
                <div className="space-y-3">
                  {entry.comments.map((comment, idx) => (
                    <div key={idx} className="bg-muted/50 rounded-lg p-3">
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
            )}
          </div>
        )}

        {/* Add Comment Input */}
        <div className="border-t border-border/50 pt-4 mt-4">
          <div className="flex gap-2">
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
    </Card>
  );
};

export default DiaryCard;
