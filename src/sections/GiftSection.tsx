import React, { useState } from 'react';
import type { WeddingConfig } from '../types';
import { Copy, Check } from 'lucide-react';
import { FloralCorners } from '../components/FloralCorners';

interface GiftSectionProps {
  data: WeddingConfig;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.bank.accountNumber);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <section className="snap-section relative w-full h-dvh min-h-dvh max-h-dvh shrink-0 flex flex-col justify-center items-center text-center px-8 py-12 sm:py-16 bg-[#fef9f5] overflow-hidden">
      <FloralCorners />

      <div className="w-full max-w-[380px] flex flex-col items-center relative z-10">
        {/* Gift Message Header */}
        <p className="text-[11px] tracking-[0.3em] uppercase text-stone-500 mb-6 font-normal">
          Tanda Kasih
        </p>

        <p className="text-[12.5px] sm:text-[13px] text-stone-500 font-normal leading-[1.8] max-w-[320px] mx-auto mb-6">
          {data.bank.note}
        </p>

        {/* Bank Account Card */}
        <div className="w-full max-w-[320px] mx-auto border border-stone-200 bg-stone-50/50 rounded-xl p-5">
          <div className="flex items-center justify-between w-full mb-3">
            <span className="font-semibold text-[15px] tracking-wider text-[#721c24]">
              {data.bank.bankName}
            </span>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest">
              Transfer Bank
            </span>
          </div>

          <div className="font-mono text-[18px] sm:text-[19px] font-semibold text-[#721c24] tracking-wider my-2 select-all">
            {data.bank.accountNumber}
          </div>

          <div className="text-[11.5px] text-stone-500 uppercase tracking-wider mb-4">
            {data.bank.accountHolder}
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 bg-[#721c24] hover:bg-[#58151c] active:scale-[0.98] transition-all duration-200 text-white text-[12px] px-5 py-2.5 rounded-lg cursor-pointer tracking-wider font-medium shadow-md shadow-rose-950/20"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                Nomor Rekening Disalin
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-rose-200" />
                Salin Nomor Rekening
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
