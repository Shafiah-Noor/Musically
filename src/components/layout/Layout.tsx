import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import MusicPlayer from "../music/MusicPlayer";
import { useMusicContext } from "@/context/MusicContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
    toggleFavorite,
    isFavorite
  } = useMusicContext();

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {children}
        </div>
      </div>
      
      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onNext={playNext}
        onPrevious={playPrevious}
        onToggleFavorite={toggleFavorite}
        isFavorite={currentSong ? isFavorite(currentSong.id) : false}
      />
    </div>
  );
};

export default Layout;