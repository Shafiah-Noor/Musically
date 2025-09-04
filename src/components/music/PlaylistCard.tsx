import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PlaylistCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href?: string;
  isPlaying?: boolean;
  onPlay?: () => void;
  className?: string;
}

const PlaylistCard = ({
  title,
  description,
  imageUrl,
  isPlaying = false,
  onPlay,
  className
}: PlaylistCardProps) => {
  return (
    <div className={cn(
      "group music-card bg-card hover:bg-card-hover p-4 rounded-lg transition-all duration-300 cursor-pointer",
      className
    )}>
      <div className="relative mb-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-full aspect-square object-cover rounded-md"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center">
          <Button
            size="sm"
            onClick={onPlay}
            className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-full w-12 h-12 play-button-glow transform scale-90 group-hover:scale-100 transition-transform"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-card-foreground truncate">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm truncate">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PlaylistCard;