import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { useMusicContext } from "@/context/MusicContext";

interface HeaderProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

const Header = ({ onSearch, showSearch = true }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { searchSongs, playSong } = useMusicContext();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    const results = searchSongs(query);
    setSearchResults(results);
    setShowResults(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  const handleResultClick = (song: any) => {
    playSong(song, searchResults);
    setShowResults(false);
    setSearchQuery("");
  };

  const canGoBack = location.pathname !== "/";

  return (
    <header className="flex items-center justify-between p-4 lg:p-6 bg-background-secondary/50 backdrop-blur-md sticky top-0 z-10">
      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          disabled={!canGoBack}
          className="rounded-full w-8 h-8 p-0 disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(1)}
          className="rounded-full w-8 h-8 p-0"
        >
          <ChevronRight size={18} />
        </Button>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="flex-1 max-w-md mx-4 lg:mx-8 relative">
          <form onSubmit={handleSearch} className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for songs, artists, albums..."
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => searchQuery && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="pl-10 bg-background-tertiary border-border/50 focus:border-primary rounded-full"
            />
          </form>
          
          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
              {searchResults.slice(0, 8).map((song) => (
                <div
                  key={song.id}
                  onClick={() => handleResultClick(song)}
                  className="flex items-center gap-3 p-3 hover:bg-card-hover cursor-pointer transition-colors"
                >
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{song.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* User Actions */}
      <div className="hidden sm:flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full px-4 lg:px-6 text-sm font-medium hover:bg-background-tertiary"
        >
          Sign up
        </Button>
        <Button
          size="sm"
          className="rounded-full px-4 lg:px-6 text-sm font-medium bg-primary hover:bg-primary-hover text-primary-foreground"
        >
          Log in
        </Button>
      </div>
    </header>
  );
};

export default Header;