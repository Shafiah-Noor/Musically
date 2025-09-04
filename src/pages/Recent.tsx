import { useMusicContext } from "@/context/MusicContext";
import SongList from "@/components/music/SongList";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Play, Pause, Clock, Shuffle } from "lucide-react";

const Recent = () => {
  const { 
    recentlyPlayed,
    playSong, 
    currentSong, 
    isPlaying, 
    togglePlay,
    toggleFavorite,
    favorites
  } = useMusicContext();

  const isPlaylistPlaying = recentlyPlayed.some(song => song.id === currentSong?.id) && isPlaying;

  const handlePlayPlaylist = () => {
    if (recentlyPlayed.length === 0) return;
    
    if (isPlaylistPlaying) {
      togglePlay();
    } else {
      playSong(recentlyPlayed[0], recentlyPlayed);
    }
  };

  const handleShufflePlay = () => {
    if (recentlyPlayed.length === 0) return;
    
    const shuffledSongs = [...recentlyPlayed].sort(() => Math.random() - 0.5);
    playSong(shuffledSongs[0], shuffledSongs);
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header showSearch={false} />
      
      <main>
        {/* Recent Header */}
        <div className="bg-gradient-to-b from-background-tertiary to-background px-6 py-8">
          <div className="flex items-end gap-6 max-w-screen-xl">
            <div className="w-56 h-56 rounded-lg bg-gradient-to-br from-secondary to-accent shadow-2xl flex items-center justify-center">
              <Clock size={80} className="text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium mb-2 text-muted-foreground">PLAYLIST</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
                Recently Played
              </h1>
              <p className="text-lg mb-4 text-muted-foreground">
                Your listening history
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-semibold">Musicfy</span>
                <span>•</span>
                <span>{recentlyPlayed.length} songs</span>
              </div>
            </div>
          </div>
        </div>

        {recentlyPlayed.length > 0 ? (
          <>
            {/* Controls */}
            <div className="px-6 py-6">
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  onClick={handlePlayPlaylist}
                  className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-full w-16 h-16 play-button-glow"
                >
                  {isPlaylistPlaying ? <Pause size={24} /> : <Play size={24} />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleShufflePlay}
                  className="text-foreground hover:text-primary"
                >
                  <Shuffle size={24} />
                </Button>
              </div>
            </div>

            {/* Songs List */}
            <div className="px-6 pb-6">
              <SongList
                songs={recentlyPlayed}
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlay={(song) => playSong(song, recentlyPlayed)}
                onToggleFavorite={toggleFavorite}
                favoriteIds={favorites}
                showHeader={true}
              />
            </div>
          </>
        ) : (
          <div className="px-6 pb-6">
            <div className="text-center py-12">
              <Clock size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">No recent activity</h2>
              <p className="text-muted-foreground mb-6">
                Start listening to music and your history will appear here
              </p>
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-full px-8"
              >
                Discover music
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Recent;