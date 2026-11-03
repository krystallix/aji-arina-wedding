import React from 'react';
import type { WeddingConfig } from '../types';
import { FloralCorners } from '../components/FloralCorners';

interface HeroSectionProps {
  data: WeddingConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  return (
    <section className="snap-section relative w-full h-dvh min-h-dvh max-h-dvh shrink-0 flex flex-col justify-between items-center text-center px-8 py-12 sm:py-16 bg-[#fef9f5] overflow-hidden">
      <FloralCorners />
      {/* Top Tagline */}
      <div className="pt-4 relative z-10">
        <p className="text-[11px] sm:text-[12px] tracking-[0.35em] uppercase text-stone-500 font-normal">
          The Wedding Of
        </p>
      </div>

      {/* Main Couple Names */}
      <div className="flex flex-col items-center justify-center my-auto py-8 relative z-10">
        <h1 className="font-display text-[44px] sm:text-[54px] font-normal text-[#721c24] tracking-wider leading-[1.1]">
          {data.bride.name}
        </h1>

        <span className="font-script text-[32px] sm:text-[38px] text-stone-400 my-2 leading-none">
          and
        </span>

        <h1 className="font-display text-[44px] sm:text-[54px] font-normal text-[#721c24] tracking-wider leading-[1.1]">
          {data.groom.name}
        </h1>

        <div className="w-10 h-[1px] bg-stone-300 my-8" />

        <p className="text-[13px] sm:text-[14px] text-stone-600 tracking-[0.25em] uppercase font-normal">
          Minggu, 13 Desember 2026
        </p>
      </div>

      {/* Subtle Bottom Hint */}
      <div className="pb-4 flex flex-col items-center opacity-60 relative z-10">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
          Scroll Down
        </span>
        <div className="w-[1px] h-8 bg-stone-300 mt-3" />
      </div>
    </section>
  );
};
