import { Calendar, MessageCircle, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
}

const DiaryCard = ({ entry, index }: DiaryCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card 
      className="overflow-hidden bg-secondary/30 border-0 shadow-card hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Images Gallery */}
      {entry.images.length > 0 && (
        <div className={`grid ${entry.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2 p-2`}>
          {entry.images.map((image, idx) => (
            <div 
              key={idx} 
              className={`relative overflow-hidden rounded-2xl ${entry.images.length === 1 ? 'aspect-video' : 'aspect-square'} bg-secondary`}
            >
              <img
                src={image}
                alt={`Memory ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
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
          <div className="border-t border-border pt-4 space-y-3">
            {entry.comments.map((comment, idx) => (
              <div key={idx} className="bg-background/50 rounded-xl p-3">
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
        )}

        {/* Action Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-4 text-primary hover:text-primary hover:bg-primary/10"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Add Comment
        </Button>
      </div>
    </Card>
  );
};

export default DiaryCard;
