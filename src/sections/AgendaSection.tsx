import React from 'react';
import type { WeddingConfig } from '../types';
import { FloralCorners } from '../components/FloralCorners';
import { useInView } from '../hooks/useInView';

interface AgendaSectionProps {
  data: WeddingConfig;
  isActive?: boolean;
}

export const AgendaSection: React.FC<AgendaSectionProps> = ({ data, isActive = false }) => {
  const { ref, isInView } = useInView<HTMLElement>(0.2, isActive);

  return (
    <section
      ref={ref}
      className={`snap-section relative w-full h-dvh min-h-dvh max-h-dvh shrink-0 flex flex-col justify-center items-center text-center px-6 sm:px-8 py-8 sm:py-10 bg-[#fef9f5] overflow-hidden ${
        isInView ? 'is-visible' : ''
      }`}
    >
      <FloralCorners />

      <div className="w-full max-w-[360px] flex flex-col items-center my-auto relative z-10">
        {/* Intro text */}
        <p className="reveal delay-100 font-garamond text-[15px] sm:text-[16px] text-stone-800 leading-normal mb-5 sm:mb-6">
          yang Insya Allah akan diselenggarakan pada:
        </p>

        {/* 1. AKAD NIKAH */}
        <div className="w-full flex flex-col items-center">
          <h2 className="reveal delay-150 font-display text-[22px] sm:text-[25px] font-normal text-[#721c24] tracking-[0.1em] leading-none mb-1">
            {data.akad.title}
          </h2>

          <div className="reveal-scale delay-200">
            <img
              src="/assets/separator.svg"
              alt="separator"
              className="w-36 sm:w-44 my-2.5 sm:my-3 object-contain animate-breathe"
            />
          </div>

          <p className="reveal delay-250 font-classic text-[16px] sm:text-[18px] text-stone-900 tracking-wider font-normal leading-snug">
            {data.akad.date}
          </p>
          <p className="reveal delay-300 font-garamond text-[14px] sm:text-[15px] text-stone-800 mt-1 leading-snug">
            Pukul {data.akad.time}
          </p>
        </div>

        {/* Spacing between Akad & Ngunduh Mantu */}
        <div className="h-6 sm:h-8" />

        {/* 2. NGUNDUH MANTU */}
        <div className="w-full flex flex-col items-center">
          <h2 className="reveal delay-350 font-display text-[22px] sm:text-[25px] font-normal text-[#721c24] tracking-[0.1em] leading-none mb-1">
            {data.resepsi.title}
          </h2>

          <div className="reveal-scale delay-400">
            <img
              src="/assets/separator.svg"
              alt="separator"
              className="w-36 sm:w-44 my-2.5 sm:my-3 object-contain animate-breathe [animation-delay:1.2s]"
            />
          </div>

          <p className="reveal delay-450 font-classic text-[16px] sm:text-[18px] text-stone-900 tracking-wider font-normal leading-snug">
            {data.resepsi.date}
          </p>
          <p className="reveal delay-500 font-garamond text-[14px] sm:text-[15px] text-stone-800 mt-1 leading-snug mb-4">
            Pukul {data.resepsi.time}
          </p>

          {/* LOKASI */}
          <div className="flex flex-col items-center">
            <h3 className="reveal delay-550 font-classic text-[14px] sm:text-[15px] font-normal text-stone-900 tracking-[0.18em] uppercase mb-1">
              LOKASI
            </h3>
            <p className="reveal delay-600 font-garamond text-[14px] sm:text-[15px] text-stone-800 leading-snug">
              {data.map.placeName}
            </p>
            <p className="reveal delay-650 font-garamond text-[13.5px] sm:text-[14.5px] text-stone-700 leading-snug mt-0.5">
              {data.map.address}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
