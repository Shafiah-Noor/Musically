import { useMusicContext } from "@/context/MusicContext";
import SongCard from "@/components/music/SongCard";
import PlaylistCard from "@/components/music/PlaylistCard";
import Header from "@/components/layout/Header";
import { getRecentlyPlayed, getRecommended, getChillVibes, getLoveLattice, getRockMode } from "@/data/musicData";
const Home = () => {
  const {
    playSong,
    currentSong,
    isPlaying,
    toggleFavorite,
    isFavorite,
    recentlyPlayed
  } = useMusicContext();
  const recentSongs = recentlyPlayed.length > 0 ? recentlyPlayed.slice(0, 6) : getRecentlyPlayed();
  const recommendedSongs = getRecommended();
  const libraries = [{
    title: "Chill Vibes",
    description: "Relax and unwind with these peaceful tracks",
    songs: getChillVibes(),
    href: "/playlist/chill",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
  }, {
    title: "Love Lattice",
    description: "Romantic songs for your special moments",
    songs: getLoveLattice(),
    href: "/playlist/love",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop"
  }, {
    title: "Rock Mode",
    description: "High-energy rock anthems to pump you up",
    songs: getRockMode(),
    href: "/playlist/rock",
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop"
  }];
  const handlePlayPlaylist = (songs: any[]) => {
    if (songs.length > 0) {
      playSong(songs[0], songs);
    }
  };
  return <div className="flex-1 overflow-auto">
      <Header />
      
      <main className="px-4 sm:px-6 pb-6">
        {/* Welcome Message */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome to Musicfy ! </h1>
          <p className="text-muted-foreground">Discover your new favorite songs</p>
        </div>

        {/* Recently Played */}
        <section className="mb-6 lg:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">Recently Played</h2>
            <button className="text-muted-foreground hover:text-foreground text-sm font-medium">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {recentSongs.map(song => <SongCard key={song.id} song={song} isPlaying={currentSong?.id === song.id && isPlaying} onPlay={song => playSong(song)} onToggleFavorite={toggleFavorite} isFavorite={isFavorite(song.id)} />)}
          </div>
        </section>

        {/* Recommended for You */}
        <section className="mb-6 lg:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">Recommended for you</h2>
            <button className="text-muted-foreground hover:text-foreground text-sm font-medium">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {recommendedSongs.map(song => <SongCard key={song.id} song={song} isPlaying={currentSong?.id === song.id && isPlaying} onPlay={song => playSong(song)} onToggleFavorite={toggleFavorite} isFavorite={isFavorite(song.id)} />)}
          </div>
        </section>

        {/* Music Libraries */}
        <section className="mb-6 lg:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">Playlists</h2>
            <button className="text-muted-foreground hover:text-foreground text-sm font-medium">
              Show all
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {libraries.map(library => <PlaylistCard key={library.title} title={library.title} description={library.description} imageUrl={library.imageUrl} onPlay={() => handlePlayPlaylist(library.songs)} />)}
          </div>
        </section>

        {/* Editor's Pick Section */}
        <section className="mb-6 lg:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">Editor's Pick</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {recommendedSongs.slice(0, 6).map(song => <SongCard key={`editor-${song.id}`} song={song} isPlaying={currentSong?.id === song.id && isPlaying} onPlay={song => playSong(song)} onToggleFavorite={toggleFavorite} isFavorite={isFavorite(song.id)} />)}
          </div>
        </section>
      </main>
    </div>;
};
export default Home;