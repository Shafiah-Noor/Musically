import { Play, Pause, Heart, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Song } from "@/data/musicData";

interface SongCardProps {
  song: Song;
  isPlaying?: boolean;
  onPlay: (song: Song) => void;
  onToggleFavorite?: (songId: number) => void;
  isFavorite?: boolean;
  showArtist?: boolean;
}

const SongCard = ({
  song,
  isPlaying = false,
  onPlay,
  onToggleFavorite,
  isFavorite = false,
  showArtist = true
}: SongCardProps) => {
  return (
    <div className="group music-card bg-card hover:bg-card-hover p-4 rounded-lg transition-all duration-300 cursor-pointer">
      <div className="relative mb-4">
        <img
          src={song.imageUrl}
          alt={song.title}
          className="w-full aspect-square object-cover rounded-md"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center">
          <Button
            size="sm"
            onClick={() => onPlay(song)}
            className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-full w-12 h-12 play-button-glow transform scale-90 group-hover:scale-100 transition-transform"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
        </div>

        {/* Favorite Button */}
        {onToggleFavorite && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(song.id);
            }}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 backdrop-blur-sm"
          >
            <Heart
              size={16}
              className={cn(
                "transition-colors",
                isFavorite ? "fill-primary text-primary" : "text-white"
              )}
            />
          </Button>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-card-foreground truncate text-sm">
          {song.title}
        </h3>
        {showArtist && (
          <p className="text-muted-foreground text-xs truncate">
            {song.artist}
          </p>
        )}
      </div>

      {/* More Options */}
      <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-muted-foreground">{song.duration}</span>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <MoreHorizontal size={14} />
        </Button>
      </div>
    </div>
  );
};

export default SongCard;