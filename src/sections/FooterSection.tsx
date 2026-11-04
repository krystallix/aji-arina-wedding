import React from 'react';
import type { WeddingConfig } from '../types';
import { FloralCorners } from '../components/FloralCorners';
import { useInView } from '../hooks/useInView';

interface FooterSectionProps {
  data: WeddingConfig;
  isActive?: boolean;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ data, isActive = false }) => {
  const { ref, isInView } = useInView<HTMLElement>(0.2, isActive);

  return (
    <footer
      ref={ref}
      className={`snap-section relative w-full h-dvh min-h-dvh max-h-dvh shrink-0 flex flex-col justify-between items-center text-center px-8 py-12 sm:py-16 bg-[#fef9f5] overflow-hidden ${
        isInView ? 'is-visible' : ''
      }`}
    >
      <FloralCorners />

      <div className="pt-4 relative z-10" />

      <div className="my-auto flex flex-col items-center relative z-10 w-full max-w-[340px]">
        <span className="reveal-scale delay-150 font-display text-[40px] sm:text-[48px] text-stone-900 leading-none mb-3">
          A &amp; A
        </span>

        {/* Foto The Sekids */}
        <div className="reveal-scale delay-250 w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-lg border-2 border-stone-200/80 my-3 bg-stone-100">
          <img
            src="/assets/thesekids.webp"
            alt="Foto Arina & Aji"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="reveal delay-350 w-10 h-[1px] bg-stone-300 my-4" />
        <h3 className="reveal delay-450 font-classic text-[16px] sm:text-[18px] text-stone-800 tracking-wider mb-1.5">
          {data.bride.name} &amp; {data.groom.name}
        </h3>
        <p className="reveal delay-550 text-[12px] text-stone-400 tracking-[0.2em] uppercase">
          Minggu, 13 Desember 2026
        </p>
      </div>

      <div className="reveal delay-600 pb-4 relative z-10">
        <p className="text-[10px] tracking-[0.25em] uppercase text-stone-300">
          Arina &amp; Aji Wedding Invitation
        </p>
      </div>
    </footer>
  );
};
