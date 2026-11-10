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
  const hasAutoPlayedRef = useRef(false);

  // Sync state with native audio element events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Handle autoplay only once when triggered by user opening the invitation
  useEffect(() => {
    if (!autoPlayTrigger) {
      hasAutoPlayedRef.current = false;
      return;
    }

    if (!hasAutoPlayedRef.current && audioRef.current) {
      hasAutoPlayedRef.current = true;
      audioRef.current.play().catch((err) => {
        // Autoplay may be blocked by browser policy without user gesture
        console.warn('Playback error / autoplay blocked by browser policy:', err);
      });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.warn('Failed to play audio:', err);
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />

      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
          autoPlayTrigger
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
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
