import { Play, Pause, Heart, MoreHorizontal, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Song } from "@/data/musicData";

interface SongListProps {
  songs: Song[];
  currentSong?: Song | null;
  isPlaying?: boolean;
  onPlay: (song: Song) => void;
  onToggleFavorite?: (songId: number) => void;
  favoriteIds?: number[];
  showHeader?: boolean;
}

const SongList = ({
  songs,
  currentSong,
  isPlaying = false,
  onPlay,
  onToggleFavorite,
  favoriteIds = [],
  showHeader = true
}: SongListProps) => {
  const isCurrentSong = (song: Song) => currentSong?.id === song.id;

  return (
    <div className="w-full">
      {showHeader && (
        <div className="grid grid-cols-[16px_1fr_1fr_1fr_16px] gap-4 px-6 py-2 text-sm text-muted-foreground border-b border-border/50 mb-2">
          <div className="text-center">#</div>
          <div>Title</div>
          <div>Album</div>
          <div className="flex justify-end">
            <Clock size={16} />
          </div>
          <div></div>
        </div>
      )}

      <div className="space-y-1">
        {songs.map((song, index) => (
          <div
            key={song.id}
            className={cn(
              "group grid grid-cols-[16px_1fr_1fr_1fr_16px] gap-4 px-6 py-3 rounded-md hover:bg-card-hover transition-colors cursor-pointer",
              isCurrentSong(song) && "bg-card-hover"
            )}
            onClick={() => onPlay(song)}
          >
            {/* Index/Play Button */}
            <div className="flex items-center justify-center">
              {isCurrentSong(song) && isPlaying ? (
                <Pause size={16} className="text-primary" />
              ) : (
                <>
                  <span className="text-muted-foreground group-hover:hidden text-sm">
                    {index + 1}
                  </span>
                  <Play size={16} className="text-foreground hidden group-hover:block" />
                </>
              )}
            </div>

            {/* Title & Artist */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={song.imageUrl}
                alt={song.title}
                className="w-10 h-10 rounded-md object-cover"
              />
              <div className="min-w-0">
                <h4 className={cn(
                  "font-medium truncate text-sm",
                  isCurrentSong(song) ? "text-primary" : "text-foreground"
                )}>
                  {song.title}
                </h4>
                <p className="text-muted-foreground text-sm truncate">
                  {song.artist}
                </p>
              </div>
            </div>

            {/* Album */}
            <div className="flex items-center">
              <p className="text-muted-foreground text-sm truncate">
                {song.album}
              </p>
            </div>

            {/* Duration */}
            <div className="flex items-center justify-end">
              <span className="text-muted-foreground text-sm">
                {song.duration}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {onToggleFavorite && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(song.id);
                  }}
                  className="h-8 w-8 p-0"
                >
                  <Heart
                    size={14}
                    className={cn(
                      "transition-colors",
                      favoriteIds.includes(song.id)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;