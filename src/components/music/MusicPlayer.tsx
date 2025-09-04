import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Song } from "@/data/musicData";

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onToggleFavorite?: (songId: number) => void;
  isFavorite?: boolean;
}

const MusicPlayer = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrevious,
  onToggleFavorite,
  isFavorite = false
}: MusicPlayerProps) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        setProgress(progressPercent);
        setCurrentTime(formatTime(audio.currentTime));
      }
    };

    const updateDuration = () => {
      if (audio.duration) {
        setDuration(formatTime(audio.duration));
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", onNext);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", onNext);
    };
  }, [onNext]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.src = currentSong.audioUrl;
    audio.volume = volume / 100;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [currentSong, isPlaying, volume]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const newTime = (value[0] / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  if (!currentSong) {
    return (
      <footer className="bg-background-secondary border-t border-border p-3 lg:p-4">
        <div className="text-center text-muted-foreground text-sm">
          Select a song to start playing
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-background-secondary border-t border-border p-3 lg:p-4">
      <audio ref={audioRef} />
      
      <div className="flex flex-col lg:flex-row items-center gap-4 max-w-screen-xl mx-auto">
        {/* Song Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1 lg:max-w-xs">
          <img
            src={currentSong.imageUrl}
            alt={currentSong.title}
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-md object-cover flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-foreground truncate text-sm lg:text-base">
              {currentSong.title}
            </h4>
            <p className="text-xs lg:text-sm text-muted-foreground truncate">
              {currentSong.artist}
            </p>
          </div>
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(currentSong.id)}
              className="p-2"
            >
              <Heart
                size={16}
                className={cn(
                  "transition-colors",
                  isFavorite ? "fill-primary text-primary" : "text-muted-foreground"
                )}
              />
            </Button>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-2 w-full lg:max-w-md order-first lg:order-none">
          <div className="flex items-center gap-3 lg:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onPrevious}
              className="text-foreground hover:text-primary p-2"
            >
              <SkipBack size={18} />
            </Button>
            
            <Button
              size="sm"
              onClick={onTogglePlay}
              className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-full w-10 h-10 lg:w-12 lg:h-12 play-button-glow"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onNext}
              className="text-foreground hover:text-primary p-2"
            >
              <SkipForward size={18} />
            </Button>
          </div>

          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground w-8 lg:w-10 text-right">
              {currentTime}
            </span>
            <Slider
              value={[progress]}
              onValueChange={handleProgressChange}
              max={100}
              step={0.1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-8 lg:w-10">
              {duration}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="hidden lg:flex items-center gap-2 min-w-0 flex-1 justify-end max-w-xs">
          <Volume2 size={16} className="text-muted-foreground" />
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-20 lg:w-24"
          />
        </div>
      </div>
    </footer>
  );
};

export default MusicPlayer;