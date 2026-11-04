import React from 'react';
import type { WeddingConfig } from '../types';
import { FloralCorners } from '../components/FloralCorners';
import { useInView } from '../hooks/useInView';

interface VerseSectionProps {
  data: WeddingConfig;
  isActive?: boolean;
}

export const VerseSection: React.FC<VerseSectionProps> = ({ data, isActive = false }) => {
  const { ref, isInView } = useInView<HTMLElement>(0.2, isActive);

  return (
    <section
      ref={ref}
      className={`snap-section relative w-full h-dvh min-h-dvh max-h-dvh shrink-0 flex flex-col justify-center items-center text-center px-6 sm:px-8 py-8 sm:py-10 bg-[#fef9f5] overflow-hidden ${
        isInView ? 'is-visible' : ''
      }`}
    >
      <FloralCorners />

      <div className="reveal-scale delay-100 relative w-full max-w-[355px] sm:max-w-[385px] max-h-[86dvh] aspect-[374/523] flex flex-col justify-center items-center px-7 sm:px-9 py-8 my-auto z-10">
        <img
          src="/assets/paper_background.png"
          alt="Paper Background"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none -z-10 drop-shadow-md select-none"
        />

        <div className="w-full max-w-[290px] flex flex-col items-center translate-y-[20%]">
          <div className="reveal delay-200 w-8 h-[1px] bg-stone-300 mx-auto mb-6" />
          <blockquote className="reveal delay-300 font-garamond text-[12.5px] sm:text-[13.5px] text-stone-700 leading-[1.85] font-normal italic">
            &ldquo;{data.verse.text}&rdquo;
          </blockquote>
          <p className="reveal delay-450 font-classic text-[11px] sm:text-[11.5px] text-stone-500 font-medium mt-4 tracking-[0.2em] uppercase">
            {data.verse.surah}
          </p>
        </div>
      </div>
    </section>
  );
};
