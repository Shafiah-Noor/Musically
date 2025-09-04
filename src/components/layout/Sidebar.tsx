import { useState } from "react";
import { Home, Search, Library, Heart, Plus, Download, X, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navItems = [{
    name: "Home",
    icon: Home,
    path: "/"
  }, {
    name: "Search",
    icon: Search,
    path: "#search"
  }, {
    name: "Your Library",
    icon: Library,
    path: "/library"
  }];
  const libraryItems = [{
    name: "Liked Songs",
    icon: Heart,
    path: "/favorites"
  }, {
    name: "Recently Played",
    icon: Download,
    path: "/recent"
  }];
  const playlists = [{
    name: "Chill Vibes",
    path: "/playlist/chill"
  }, {
    name: "Love Lattice",
    path: "/playlist/love"
  }, {
    name: "Rock Mode",
    path: "/playlist/rock"
  }];
  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }
  };
  return <aside className={cn("bg-sidebar h-screen flex flex-col p-2 gap-2 transition-all duration-300 relative", isCollapsed ? "w-16" : "w-64")}>
      {/* Close/Open Button */}
      <div className="flex items-center justify-between px-2 py-2">
        {!isCollapsed && <Link to="/" className="text-xl font-bold gradient-text">Musicfy.com</Link>}
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="ml-auto p-2 hover:bg-sidebar-accent rounded-full">
          {isCollapsed ? <Menu size={18} /> : <X size={18} />}
        </Button>
      </div>

        {/* Main Navigation */}
        <nav className="px-2">
          <ul className="space-y-1">
            {navItems.map(item => <li key={item.name}>
                {item.path === "#search" ? <button onClick={handleSearchClick} className={cn("flex items-center gap-4 px-4 py-3 rounded-md text-sidebar-foreground transition-colors hover:bg-sidebar-accent w-full text-left", isCollapsed && "justify-center px-2")}>
                    <item.icon size={20} />
                    {!isCollapsed && <span className="font-medium">{item.name}</span>}
                  </button> : <Link to={item.path} className={cn("flex items-center gap-4 px-4 py-3 rounded-md text-sidebar-foreground transition-colors hover:bg-sidebar-accent", location.pathname === item.path && "bg-sidebar-accent text-sidebar-primary", isCollapsed && "justify-center px-2")}>
                    <item.icon size={20} />
                    {!isCollapsed && <span className="font-medium">{item.name}</span>}
                  </Link>}
              </li>)}
          </ul>
        </nav>

        {/* Library Section */}
        {!isCollapsed && <div className="px-2 mt-6">
            <div className="flex items-center justify-between px-4 py-2">
              <h3 className="text-sidebar-foreground/70 text-sm font-semibold">Library</h3>
            </div>
            
            <ul className="space-y-1">
              {libraryItems.map(item => <li key={item.name}>
                  <Link to={item.path} className={cn("flex items-center gap-4 px-4 py-2 rounded-md text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent", location.pathname === item.path && "bg-sidebar-accent text-sidebar-primary")}>
                    <item.icon size={18} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>)}
            </ul>
          </div>}

        {/* Playlists */}
        <div className="px-2 mt-4 flex-1">
          {!isCollapsed && <>
              <div className="flex items-center justify-between px-4 py-2">
                <h3 className="text-sidebar-foreground/70 text-sm font-semibold">Playlists</h3>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground" title="Create Playlist">
                  <Plus size={16} />
                </Button>
              </div>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {playlists.map(playlist => <Link key={playlist.name} to={playlist.path} className={cn("block px-4 py-2 rounded-md text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent text-sm", location.pathname === playlist.path && "bg-sidebar-accent text-sidebar-primary")}>
                    {playlist.name}
                  </Link>)}
              </div>
            </>}
          
          {/* Collapsed state - show only playlist icons */}
          {isCollapsed && <div className="space-y-2">
              {playlists.map((playlist, index) => <Link key={playlist.name} to={playlist.path} className={cn("flex items-center justify-center p-2 rounded-md text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent", location.pathname === playlist.path && "bg-sidebar-accent text-sidebar-primary")} title={playlist.name}>
                  <Library size={18} />
                </Link>)}
              <Button variant="ghost" size="sm" className="w-full h-10 p-2 hover:bg-sidebar-accent text-sidebar-foreground/70" title="Create Playlist">
                <Plus size={18} />
              </Button>
            </div>}
        </div>
    </aside>;
};
export default Sidebar;