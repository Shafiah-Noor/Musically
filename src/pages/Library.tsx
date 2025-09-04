import { useState } from "react";
import { useMusicContext } from "@/context/MusicContext";
import SongCard from "@/components/music/SongCard";
import PlaylistCard from "@/components/music/PlaylistCard";
import Header from "@/components/layout/Header";
import { getChillVibes, getLoveLattice, getRockMode } from "@/data/musicData";

const Library = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'playlists' | 'artists' | 'albums'>('all');
  
  const { 
    playSong, 
    currentSong, 
    isPlaying, 
    toggleFavorite, 
    isFavorite,
    recentlyPlayed,
    favorites,
    searchSongs
  } = useMusicContext();

  const playlists = [
    {
      title: "Liked Songs",
      description: `${favorites.length} songs`,
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      songs: searchSongs('').filter(song => favorites.includes(song.id))
    },
    {
      title: "Recently Played",
      description: `${recentlyPlayed.length} songs`,
      imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop",
      songs: recentlyPlayed
    },
    {
      title: "Chill Vibes",
      description: "10 songs",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      songs: getChillVibes()
    },
    {
      title: "Love Lattice",
      description: "10 songs",
      imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop",
      songs: getLoveLattice()
    },
    {
      title: "Rock Mode",
      description: "10 songs", 
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
      songs: getRockMode()
    }
  ];

  const recentSongs = recentlyPlayed.slice(0, 6);

  const filters = [
    { key: 'all' as const, label: 'All' },
    { key: 'playlists' as const, label: 'Playlists' },
    { key: 'artists' as const, label: 'Artists' },
    { key: 'albums' as const, label: 'Albums' }
  ];

  const handlePlayPlaylist = (songs: any[]) => {
    if (songs.length > 0) {
      playSong(songs[0], songs);
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header showSearch={false} />
      
      <main className="px-6 pb-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Your Library</h1>
          
          {/* Filter Tabs */}
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recently Played Quick Access */}
        {selectedFilter === 'all' && recentSongs.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recently Played</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentSongs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  isPlaying={currentSong?.id === song.id && isPlaying}
                  onPlay={(song) => playSong(song)}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={isFavorite(song.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Playlists Section */}
        {(selectedFilter === 'all' || selectedFilter === 'playlists') && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {selectedFilter === 'all' ? 'Your Playlists' : 'Playlists'}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {playlists.map((playlist) => (
                <div
                  key={playlist.title}
                  className="flex items-center gap-4 p-4 bg-card hover:bg-card-hover rounded-lg transition-colors cursor-pointer group"
                  onClick={() => handlePlayPlaylist(playlist.songs)}
                >
                  <img
                    src={playlist.imageUrl}
                    alt={playlist.title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-card-foreground truncate">
                      {playlist.title}
                    </h3>
                    <p className="text-muted-foreground text-sm truncate">
                      {playlist.description}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-primary hover:bg-primary-hover rounded-full flex items-center justify-center text-primary-foreground play-button-glow">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.287V1.713Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Artists Section (placeholder) */}
        {selectedFilter === 'artists' && (
          <section className="text-center py-12">
            <div className="text-muted-foreground mb-4">Artists view coming soon</div>
            <p className="text-sm text-muted-foreground">
              Explore artists you've listened to
            </p>
          </section>
        )}

        {/* Albums Section (placeholder) */}
        {selectedFilter === 'albums' && (
          <section className="text-center py-12">
            <div className="text-muted-foreground mb-4">Albums view coming soon</div>
            <p className="text-sm text-muted-foreground">
              Browse albums in your collection
            </p>
          </section>
        )}
      </main>
    </div>
  );
};

export default Library;