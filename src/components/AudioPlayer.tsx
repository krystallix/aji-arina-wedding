import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  autoPlayTrigger?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  autoPlayTrigger = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Auto-play was prevented by user/browser policy
          setIsPlaying(false);
        });
    }
  }, [autoPlayTrigger, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />

      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Matikan musik' : 'Putar musik'}
          className="w-10 h-10 rounded-full bg-[#721c24] text-white flex items-center justify-center shadow-lg hover:bg-[#58151c] active:scale-95 transition-all duration-200 cursor-pointer border border-rose-950/20"
        >
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-white" />
          ) : (
            <VolumeX className="w-4 h-4 text-rose-200/90" />
          )}
        </button>
      </div>
    </>
  );
};
