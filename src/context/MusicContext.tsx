import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Song, songs } from "@/data/musicData";

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  currentPlaylist: Song[];
  currentIndex: number;
  favorites: number[];
  recentlyPlayed: Song[];
  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentPlaylist: (playlist: Song[], index?: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  addToFavorites: (songId: number) => void;
  removeFromFavorites: (songId: number) => void;
  toggleFavorite: (songId: number) => void;
  isFavorite: (songId: number) => boolean;
  playSong: (song: Song, playlist?: Song[]) => void;
  searchSongs: (query: string) => Song[];
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusicContext must be used within a MusicProvider");
  }
  return context;
};

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider = ({ children }: MusicProviderProps) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("musicfy-favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedRecent = localStorage.getItem("musicfy-recent");
    if (savedRecent) {
      setRecentlyPlayed(JSON.parse(savedRecent));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("musicfy-favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save recent to localStorage
  useEffect(() => {
    localStorage.setItem("musicfy-recent", JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  const playNext = () => {
    if (currentPlaylist.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % currentPlaylist.length;
    setCurrentIndex(nextIndex);
    setCurrentSong(currentPlaylist[nextIndex]);
  };

  const playPrevious = () => {
    if (currentPlaylist.length === 0) return;
    
    const prevIndex = currentIndex === 0 ? currentPlaylist.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentSong(currentPlaylist[prevIndex]);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const addToFavorites = (songId: number) => {
    setFavorites(prev => [...prev, songId]);
  };

  const removeFromFavorites = (songId: number) => {
    setFavorites(prev => prev.filter(id => id !== songId));
  };

  const toggleFavorite = (songId: number) => {
    if (favorites.includes(songId)) {
      removeFromFavorites(songId);
    } else {
      addToFavorites(songId);
    }
  };

  const isFavorite = (songId: number) => {
    return favorites.includes(songId);
  };

  const addToRecentlyPlayed = (song: Song) => {
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(s => s.id !== song.id);
      return [song, ...filtered].slice(0, 20); // Keep last 20 songs
    });
  };

  const playSong = (song: Song, playlist?: Song[]) => {
    setCurrentSong(song);
    setIsPlaying(true);
    addToRecentlyPlayed(song);

    if (playlist) {
      setCurrentPlaylist(playlist);
      const index = playlist.findIndex(s => s.id === song.id);
      setCurrentIndex(index >= 0 ? index : 0);
    } else {
      // If no playlist provided, use all songs
      setCurrentPlaylist(songs);
      const index = songs.findIndex(s => s.id === song.id);
      setCurrentIndex(index >= 0 ? index : 0);
    }
  };

  const searchSongs = (query: string): Song[] => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return songs.filter(song =>
      song.title.toLowerCase().includes(lowerQuery) ||
      song.artist.toLowerCase().includes(lowerQuery) ||
      song.album.toLowerCase().includes(lowerQuery) ||
      song.genre.toLowerCase().includes(lowerQuery)
    );
  };

  const value: MusicContextType = {
    currentSong,
    isPlaying,
    currentPlaylist,
    currentIndex,
    favorites,
    recentlyPlayed,
    setCurrentSong,
    setIsPlaying,
    setCurrentPlaylist,
    playNext,
    playPrevious,
    togglePlay,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    playSong,
    searchSongs
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};