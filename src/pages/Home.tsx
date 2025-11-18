import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

const Home = () => {
  const [daysCount, setDaysCount] = useState(0);
  
  // Example start date - in a real app this would come from a database
  const startDate = new Date("2024-01-14");
  
  useEffect(() => {
    const calculateDays = () => {
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setDaysCount(diffDays);
    };
    
    calculateDays();
    // Update daily
    const interval = setInterval(calculateDays, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in duration-700">
          <h1 className="text-2xl font-light text-foreground mb-2 tracking-wide">
            Our Love Story
          </h1>
          <Heart className="w-6 h-6 mx-auto text-primary animate-pulse" />
        </div>

        {/* Couple Profiles */}
        <div className="flex items-center justify-center gap-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-secondary border-4 border-powder overflow-hidden shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
                alt="Partner 1"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-foreground font-medium">Sarah</p>
          </div>
          
          <Heart className="w-8 h-8 text-primary fill-primary" />
          
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-secondary border-4 border-powder overflow-hidden shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                alt="Partner 2"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-foreground font-medium">Michael</p>
          </div>
        </div>

        {/* D-Day Counter */}
        <div className="bg-gradient-to-br from-romantic to-powder rounded-3xl p-8 shadow-card mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="text-center">
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">
              Together for
            </p>
            <div className="relative">
              <p className="text-7xl md:text-8xl font-bold text-primary mb-2 tracking-tight">
                {daysCount}
              </p>
              <div className="absolute inset-0 blur-2xl opacity-30 bg-primary -z-10" />
            </div>
            <p className="text-muted-foreground text-lg">
              {daysCount === 1 ? 'day' : 'days'}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <div className="bg-secondary/50 rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-primary mb-1">12</p>
            <p className="text-xs text-muted-foreground">Memories</p>
          </div>
          <div className="bg-secondary/50 rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-primary mb-1">48</p>
            <p className="text-xs text-muted-foreground">Photos</p>
          </div>
          <div className="bg-secondary/50 rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-primary mb-1">∞</p>
            <p className="text-xs text-muted-foreground">Love</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
