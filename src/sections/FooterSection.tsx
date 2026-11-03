import React from 'react';
import type { WeddingConfig } from '../types';
import { FloralCorners } from '../components/FloralCorners';

interface FooterSectionProps {
  data: WeddingConfig;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ data }) => {
  return (
    <footer className="snap-section relative w-full h-dvh min-h-dvh max-h-dvh shrink-0 flex flex-col justify-between items-center text-center px-8 py-12 sm:py-16 bg-[#fef9f5] overflow-hidden">
      <FloralCorners />

      <div className="pt-4 relative z-10" />

      <div className="my-auto flex flex-col items-center relative z-10">
        <span className="font-display text-[44px] sm:text-[52px] text-stone-900 leading-none mb-3">
          A &amp; A
        </span>
        <div className="w-10 h-[1px] bg-stone-300 my-6" />
        <h3 className="font-classic text-[16px] sm:text-[18px] text-stone-800 tracking-wider mb-2">
          {data.bride.name} &amp; {data.groom.name}
        </h3>
        <p className="text-[12px] text-stone-400 tracking-[0.2em] uppercase">
          Minggu, 13 Desember 2026
        </p>
      </div>

      <div className="pb-4 relative z-10">
        <p className="text-[10px] tracking-[0.25em] uppercase text-stone-300">
          Arina &amp; Aji Wedding Invitation
        </p>
      </div>
    </footer>
  );
};
