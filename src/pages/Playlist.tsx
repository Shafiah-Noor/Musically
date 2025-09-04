import { useParams } from "react-router-dom";
import { useMusicContext } from "@/context/MusicContext";
import SongList from "@/components/music/SongList";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Play, Pause, Heart, MoreHorizontal, Shuffle } from "lucide-react";
import { getChillVibes, getLoveLattice, getRockMode } from "@/data/musicData";

const Playlist = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { 
    playSong, 
    currentSong, 
    isPlaying, 
    togglePlay,
    toggleFavorite, 
    favorites 
  } = useMusicContext();

  const getPlaylistData = () => {
    switch (playlistId) {
      case 'chill':
        return {
          title: 'Chill Vibes',
          description: 'Relax and unwind with these peaceful tracks',
          songs: getChillVibes(),
          imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
          color: 'from-blue-500 to-purple-600'
        };
      case 'love':
        return {
          title: 'Love Lattice',
          description: 'Romantic songs for your special moments',
          songs: getLoveLattice(),
          imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
          color: 'from-pink-500 to-red-500'
        };
      case 'rock':
        return {
          title: 'Rock Mode',
          description: 'High-energy rock anthems to pump you up',
          songs: getRockMode(),
          imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
          color: 'from-orange-500 to-yellow-500'
        };
      default:
        return null;
    }
  };

  const playlistData = getPlaylistData();

  if (!playlistData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Playlist not found</h1>
          <p className="text-muted-foreground">The playlist you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const { title, description, songs, imageUrl, color } = playlistData;
  const isPlaylistPlaying = songs.some(song => song.id === currentSong?.id) && isPlaying;

  const handlePlayPlaylist = () => {
    if (isPlaylistPlaying) {
      togglePlay();
    } else {
      playSong(songs[0], songs);
    }
  };

  const handleShufflePlay = () => {
    const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
    playSong(shuffledSongs[0], shuffledSongs);
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header showSearch={false} />
      
      <main>
        {/* Playlist Header */}
        <div className={`bg-gradient-to-b ${color} px-6 py-8 text-white`}>
          <div className="flex items-end gap-6 max-w-screen-xl">
            <img
              src={imageUrl}
              alt={title}
              className="w-56 h-56 rounded-lg shadow-2xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium mb-2 opacity-90">PLAYLIST</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                {title}
              </h1>
              <p className="text-lg mb-4 opacity-90">
                {description}
              </p>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <span className="font-semibold">Musicfy</span>
                <span>•</span>
                <span>{songs.length} songs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gradient-to-b from-black/20 to-background px-6 py-6">
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
            
            <Button
              variant="ghost"
              size="lg"
              className="text-foreground hover:text-primary"
            >
              <Heart size={24} />
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              className="text-foreground hover:text-primary"
            >
              <MoreHorizontal size={24} />
            </Button>
          </div>
        </div>

        {/* Songs List */}
        <div className="px-6 pb-6">
          <SongList
            songs={songs}
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlay={(song) => playSong(song, songs)}
            onToggleFavorite={toggleFavorite}
            favoriteIds={favorites}
            showHeader={true}
          />
        </div>
      </main>
    </div>
  );
};

export default Playlist;