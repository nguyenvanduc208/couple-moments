import { Home, BookHeart } from "lucide-react";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border z-50">
      <div className="container max-w-2xl mx-auto">
        <div className="flex items-center justify-around py-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-8 py-2 rounded-2xl transition-all ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Home className={`w-6 h-6 ${isActive ? "fill-primary" : ""}`} />
                <span className="text-xs font-medium">Home</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/diary"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-8 py-2 rounded-2xl transition-all ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <BookHeart className={`w-6 h-6 ${isActive ? "fill-primary" : ""}`} />
                <span className="text-xs font-medium">Diary</span>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
