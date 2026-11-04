import React, { useState, useRef, useCallback } from 'react';
import type { WeddingConfig } from '../types';
import { Mail, MailOpen } from 'lucide-react';

interface CoverSectionProps {
  data: WeddingConfig;
  guestName: string;
  onOpen: () => void;
  isOpening?: boolean;
}

export const CoverSection: React.FC<CoverSectionProps> = ({
  data,
  guestName,
  onOpen,
  isOpening = false,
}) => {
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (isOpening) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
    setIsInteracting(true);
  }, [isOpening]);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
    setIsInteracting(false);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLElement>) => {
    if (isOpening) return;
    const card = cardRef.current;
    if (!card || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = card.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width - 0.5) * 1.5;
    const y = ((touch.clientY - rect.top) / rect.height - 0.5) * 1.5;
    setMousePos({ x, y });
    setIsInteracting(true);
  }, [isOpening]);

  const handleTouchEnd = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
    setIsInteracting(false);
  }, []);

  // Subtle natural 3D tilt without cutting edges
  const rotX = isInteracting ? -mousePos.y * 3.5 : 0;
  const rotY = isInteracting ? mousePos.x * 3.5 : 0;

  return (
    <section
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`snap-section relative w-full h-dvh min-h-dvh max-h-dvh shrink-0 flex flex-col justify-between items-center text-center px-6 sm:px-8 py-6 sm:py-8 bg-[#fef9f5] overflow-hidden select-none ${
        isOpening ? 'pointer-events-none' : ''
      }`}
    >
      {/* 3D World Transform Layer - 1:1 natural initial scale */}
      <div
        className={`w-full h-full absolute inset-0 flex flex-col justify-between items-center ${
          !isInteracting && !isOpening ? 'animate-ambient-3d' : ''
        }`}
        style={{
          transform: isOpening
            ? undefined
            : `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transformOrigin: '50% 50%',
          transition: isInteracting
            ? 'transform 0.12s ease-out'
            : 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {/* Background Image of the Floral Gate: zooms into center arch */}
        <div
          className={`absolute inset-0 w-full h-full pointer-events-none select-none z-0 ${
            isOpening ? 'animate-portal-gate' : ''
          }`}
          style={{
            transform: isOpening
              ? undefined
              : `translate3d(${mousePos.x * -4}px, ${mousePos.y * -4}px, 0)`,
            transformOrigin: '50% 50%',
            transition: isInteracting ? 'transform 0.15s ease-out' : 'transform 0.8s ease-out',
          }}
        >
          <img
            src="/assets/section1_bg.webp"
            alt="Wedding Gate"
            aria-hidden="true"
            className="w-full h-full object-cover object-center pointer-events-none opacity-80"
          />

          {/* Interactive Subtle Specular Light Sheen */}
          {isInteracting && !isOpening && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-40 mix-blend-soft-light"
              style={{
                background: `radial-gradient(circle at ${50 + mousePos.x * 30}% ${
                  50 + mousePos.y * 30
                }%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 65%)`,
              }}
            />
          )}
        </div>

        {/* Golden Light Bloom: bursts through the exact center of Arina & Aji */}
        {isOpening && (
          <div
            className="absolute top-[55.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full pointer-events-none z-20 animate-portal-light"
            style={{
              background:
                'radial-gradient(circle, rgba(254, 246, 237, 0.95) 0%, rgba(246, 222, 195, 0.65) 45%, rgba(212, 160, 110, 0) 70%)',
            }}
          />
        )}

        {/* Top spacer to keep sky view clean */}
        <div className="w-full pt-2 relative z-10" />

        {/* Center of the Gate: THE WEDDING OF, ARINA and AJI - centered at top-[55.5%] without duplicate translateY */}
        <div
          className={`absolute top-[55.5%] -translate-y-1/2 left-0 right-0 flex flex-col items-center justify-center px-6 z-10 select-none ${
            isOpening ? 'animate-portal-text-zoom' : ''
          }`}
          style={{
            transform: isOpening
              ? undefined
              : `translate3d(${mousePos.x * 5}px, ${mousePos.y * 5}px, 0)`,
            transformOrigin: '50% 50%',
            transition: isInteracting ? 'transform 0.12s ease-out' : 'transform 0.8s ease-out',
          }}
        >
          <div className="mb-1 sm:mb-1.5">
            <p className="text-[10px] sm:text-[11px] tracking-[0.34em] uppercase text-stone-600 font-normal">
              The Wedding of
            </p>
          </div>

          <h1 className="font-display text-[36px] sm:text-[44px] font-normal text-[#721c24] tracking-[0.06em] leading-tight drop-shadow-xs">
            {data.bride.name}
          </h1>

          <span className="font-script text-[26px] sm:text-[30px] text-stone-500 my-0.5 leading-none">
            and
          </span>

          <h1 className="font-display text-[36px] sm:text-[44px] font-normal text-[#721c24] tracking-[0.06em] leading-tight drop-shadow-xs">
            {data.groom.name}
          </h1>
        </div>

        {/* Bottom Area: Guest Name & Buka Undangan Button */}
        <div
          className={`w-full pb-3 sm:pb-5 flex flex-col items-center relative z-10 mt-auto ${
            isOpening ? 'animate-portal-bottom' : ''
          }`}
          style={{
            transform: isOpening
              ? undefined
              : `translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0)`,
            transition: isInteracting ? 'transform 0.12s ease-out' : 'transform 0.8s ease-out',
          }}
        >
          <div className="bg-[#fef9f5]/75 backdrop-blur-xs px-5 py-2.5 rounded-xl border border-stone-200/50 shadow-xs mb-3 flex flex-col items-center max-w-[320px]">
            <p className="text-[10px] sm:text-[10.5px] text-stone-600 font-normal tracking-wider uppercase mb-0.5">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <h2 className="text-[15.5px] sm:text-[17px] font-medium text-stone-900 tracking-wide mb-0.5 truncate max-w-[270px]">
              {guestName}
            </h2>
            <p className="text-[9px] text-stone-500 italic">
              *Mohon maaf bila ada kesalahan penulisan nama/gelar
            </p>
          </div>

          <button
            type="button"
            onClick={onOpen}
            disabled={isOpening}
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
            className="group relative inline-flex items-center gap-2.5 bg-[#721c24] hover:bg-[#58151c] active:scale-[0.97] transition-all duration-300 text-white text-[12px] sm:text-[12.5px] px-8 py-2.5 sm:py-3 rounded-lg cursor-pointer tracking-[0.16em] uppercase font-medium animate-pulse-glow"
          >
            {/* Animated Envelope Icon: smooth open/close flip & flap */}
            <span className="relative w-4 h-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Mail
                className={`w-4 h-4 text-rose-200/90 absolute transition-all duration-500 transform ${
                  isBtnHovered || isOpening ? 'opacity-0 scale-75 rotate-12' : 'opacity-100 scale-100 rotate-0'
                }`}
              />
              <MailOpen
                className={`w-4 h-4 text-white absolute transition-all duration-500 transform ${
                  isBtnHovered || isOpening ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-12'
                }`}
              />
            </span>
            <span>{isOpening ? 'Membuka...' : 'Buka Undangan'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
