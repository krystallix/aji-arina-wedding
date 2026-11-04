import React from 'react';
import type { WeddingConfig } from '../types';
import { FloralCorners } from '../components/FloralCorners';
import { useInView } from '../hooks/useInView';

interface CoupleSectionProps {
  data: WeddingConfig;
  isActive?: boolean;
  isInitial?: boolean;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ data, isActive = false, isInitial = false }) => {
  const { ref, isInView } = useInView<HTMLElement>(0.2, isActive);

  return (
    <section
      ref={ref}
      className={`snap-section relative w-full h-dvh min-h-dvh max-h-dvh shrink-0 flex flex-col justify-center items-center text-center px-6 sm:px-8 py-10 sm:py-12 bg-[#fef9f5] overflow-hidden ${
        isInitial ? 'static-initial' : isInView ? 'is-visible' : ''
      }`}
    >
      <FloralCorners />

      <div className="w-full max-w-[380px] flex flex-col items-center my-auto relative z-10">
        {/* Teks Pengantar / Salam */}
        <div className="w-full mb-7 sm:mb-9">
          <h3 className="reveal delay-100 font-classic text-[15px] sm:text-[17px] text-stone-900 tracking-wider mb-2 font-normal">
            {data.salam}
          </h3>
          <p className="reveal delay-200 text-[12px] sm:text-[13px] text-stone-500 leading-relaxed max-w-[330px] mx-auto font-normal">
            {data.inviteText}
          </p>
        </div>

        {/* Mempelai Wanita: Arina Nur Nadhifah, S.H. */}
        <div className="flex flex-col items-center w-full">
          <h2 className="reveal-scale delay-300 font-display text-[26px] sm:text-[32px] font-normal text-[#721c24] tracking-[0.04em] leading-tight mb-2">
            {data.bride.fullName}
          </h2>
          <p className="reveal delay-350 font-garamond text-[14.5px] sm:text-[16px] text-stone-800 leading-snug">
            {data.bride.parents}
          </p>
          <p className="reveal delay-400 font-garamond text-[14px] sm:text-[15.5px] text-stone-700 leading-snug mt-0.5">
            {data.bride.address}
          </p>
        </div>

        {/* Divider: "dengan" */}
        <div className="my-5 sm:my-6 flex flex-col items-center">
          <span className="reveal-scale delay-450 font-script text-[32px] sm:text-[38px] text-stone-600 leading-none lowercase">
            dengan
          </span>
        </div>

        {/* Mempelai Pria: Aji Nursafiki */}
        <div className="flex flex-col items-center w-full">
          <h2 className="reveal-scale delay-500 font-display text-[26px] sm:text-[32px] font-normal text-[#721c24] tracking-[0.04em] leading-tight mb-2">
            {data.groom.fullName}
          </h2>
          <p className="reveal delay-550 font-garamond text-[14.5px] sm:text-[16px] text-stone-800 leading-snug">
            {data.groom.parents}
          </p>
          <p className="reveal delay-600 font-garamond text-[14px] sm:text-[15.5px] text-stone-700 leading-snug mt-0.5">
            {data.groom.address}
          </p>
        </div>
      </div>
    </section>
  );
};
