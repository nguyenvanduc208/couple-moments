import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import DiaryCard from "@/components/DiaryCard";
import CreateDiaryModal from "@/components/CreateDiaryModal";
import DiaryDetailDialog from "@/components/DiaryDetailDialog";

// Sample diary entries
const sampleEntries = [
  {
    id: 1,
    title: "Our First Date",
    content: "The day we first met at the cafe downtown. I knew from that moment you were special. ☕️",
    date: "2024-01-14",
    author: "Sarah",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    ],
    comments: [
      { author: "Michael", content: "Best day of my life! 💕", date: "2024-01-15" }
    ]
  },
  {
    id: 2,
    title: "Beach Sunset",
    content: "Watching the sunset together, feeling grateful for every moment we share.",
    date: "2024-02-20",
    author: "Michael",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop",
    ],
    comments: []
  },
  {
    id: 3,
    title: "Cooking Together",
    content: "Made pasta from scratch tonight. It was messy but so much fun! 🍝",
    date: "2024-03-10",
    author: "Sarah",
    images: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
    ],
    comments: [
      { author: "Michael", content: "Even burnt pasta tastes good with you 😄", date: "2024-03-10" }
    ]
  }
];

const Diary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entries, setEntries] = useState(sampleEntries);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [detailEntry, setDetailEntry] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleCreateEntry = (newEntry: any) => {
    setEntries([newEntry, ...entries]);
  };

  const handleAddComment = (entryId: number, comment: any) => {
    setEntries(entries.map(entry => 
      entry.id === entryId 
        ? { ...entry, comments: [...entry.comments, comment] }
        : entry
    ));
  };

  const handleOpenDetail = (entry: any) => {
    setDetailEntry(entry);
    setIsDetailOpen(true);
  };

  // Get dates that have diary entries
  const datesWithEntries = entries.map(entry => new Date(entry.date));

  // Filter entries by selected date
  const filteredEntries = selectedDate 
    ? entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.toDateString() === selectedDate.toDateString();
      })
    : entries;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Our Moments</h1>
            <p className="text-muted-foreground text-sm">
              {filteredEntries.length} {filteredEntries.length === 1 ? 'memory' : 'memories'} 
              {selectedDate && ' on ' + selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "rounded-full",
                    selectedDate && "border-primary text-primary"
                  )}
                >
                  <CalendarIcon className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  modifiers={{
                    hasDiary: datesWithEntries
                  }}
                  modifiersStyles={{
                    hasDiary: {
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                      color: 'hsl(var(--primary))'
                    }
                  }}
                  className="pointer-events-auto"
                />
                {selectedDate && (
                  <div className="p-3 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedDate(undefined)}
                      className="w-full"
                    >
                      Clear filter
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Diary Entries */}
        <div className="space-y-6">
          {filteredEntries.map((entry, index) => (
            <DiaryCard 
              key={entry.id} 
              entry={entry} 
              index={index}
              onAddComment={handleAddComment}
              onOpenDetail={handleOpenDetail}
            />
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">
              {selectedDate ? 'No memories on this date' : 'No memories yet'}
            </p>
            <Button onClick={() => setIsModalOpen(true)} variant="outline" className="rounded-full">
              Create your first memory
            </Button>
          </div>
        )}
      </div>

      <CreateDiaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateEntry}
      />

      <DiaryDetailDialog
        entry={detailEntry ? entries.find(e => e.id === detailEntry.id) || detailEntry : null}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default Diary;
