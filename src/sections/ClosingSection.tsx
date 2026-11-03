import React from 'react';
import type { WeddingConfig } from '../types';
import { FloralCorners } from '../components/FloralCorners';

interface ClosingSectionProps {
  data: WeddingConfig;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ data }) => {
  return (
    <section className="snap-section relative w-full h-dvh min-h-dvh max-h-dvh shrink-0 flex flex-col justify-center items-center text-center px-8 py-12 sm:py-16 bg-[#fef9f5] overflow-hidden">
      <FloralCorners />

      <div className="w-full max-w-[380px] flex flex-col items-center relative z-10">
        {/* Closing Invitation Message */}
        <div className="text-[12.5px] sm:text-[13px] text-stone-500 leading-[1.8] max-w-[320px] mx-auto mb-8">
          <p>
            {data.closing.text}
          </p>
        </div>

        {/* Happy Couple Sign-off */}
        <div className="flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-stone-400 mb-3 font-normal">
            {data.closing.signOff}
          </p>

          <div className="flex flex-col items-center">
            <h3 className="font-display text-[26px] sm:text-[30px] font-normal text-[#721c24] tracking-wider leading-none">
              {data.bride.name}
            </h3>
            <span className="font-script text-[22px] text-stone-400 my-1 leading-none">
              and
            </span>
            <h3 className="font-display text-[26px] sm:text-[30px] font-normal text-[#721c24] tracking-wider leading-none">
              {data.groom.name}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};
