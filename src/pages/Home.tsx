import { Heart, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

const Home = () => {
  const [daysCount, setDaysCount] = useState(0);
  const [timeDetails, setTimeDetails] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Example start date - in a real app this would come from a database
  const startDate = new Date("2024-01-14");
  
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diffTime = now.getTime() - startDate.getTime();
      
      // Calculate days
      const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setDaysCount(totalDays);
      
      // Calculate detailed time
      const years = Math.floor(totalDays / 365);
      const months = Math.floor((totalDays % 365) / 30);
      const days = Math.floor((totalDays % 365) % 30);
      
      const hours = now.getHours() - startDate.getHours();
      const minutes = now.getMinutes() - startDate.getMinutes();
      const seconds = now.getSeconds() - startDate.getSeconds();
      
      setTimeDetails({
        years,
        months,
        days,
        hours: hours >= 0 ? hours : hours + 24,
        minutes: minutes >= 0 ? minutes : minutes + 60,
        seconds: seconds >= 0 ? seconds : seconds + 60
      });
    };
    
    calculateTime();
    // Update every second
    const interval = setInterval(calculateTime, 1000);
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
            <p className="text-muted-foreground text-lg mb-6">
              {daysCount === 1 ? 'day' : 'days'}
            </p>
            
            {/* Detailed Time Counter */}
            <div className="grid grid-cols-6 gap-2 mt-6 mb-6">
              <div className="bg-background/50 rounded-xl p-3">
                <p className="text-2xl font-bold text-primary">{timeDetails.years}</p>
                <p className="text-xs text-muted-foreground">Years</p>
              </div>
              <div className="bg-background/50 rounded-xl p-3">
                <p className="text-2xl font-bold text-primary">{timeDetails.months}</p>
                <p className="text-xs text-muted-foreground">Months</p>
              </div>
              <div className="bg-background/50 rounded-xl p-3">
                <p className="text-2xl font-bold text-primary">{timeDetails.days}</p>
                <p className="text-xs text-muted-foreground">Days</p>
              </div>
              <div className="bg-background/50 rounded-xl p-3">
                <p className="text-2xl font-bold text-primary">{timeDetails.hours}</p>
                <p className="text-xs text-muted-foreground">Hours</p>
              </div>
              <div className="bg-background/50 rounded-xl p-3">
                <p className="text-2xl font-bold text-primary">{timeDetails.minutes}</p>
                <p className="text-xs text-muted-foreground">Mins</p>
              </div>
              <div className="bg-background/50 rounded-xl p-3">
                <p className="text-2xl font-bold text-primary">{timeDetails.seconds}</p>
                <p className="text-xs text-muted-foreground">Secs</p>
              </div>
            </div>
            
            {/* Start Date Display */}
            <div className="flex items-center justify-center gap-2 text-muted-foreground mt-4">
              <Calendar className="w-4 h-4" />
              <p className="text-sm">
                Since {startDate.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
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
