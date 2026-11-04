import React, { useState } from 'react';
import type { GuestMessage } from '../types';
import { Send, Heart } from 'lucide-react';
import { FloralCorners } from '../components/FloralCorners';
import { useInView } from '../hooks/useInView';

const STORAGE_KEY = 'wedding_arina_aji_guestbook_v3';

const DUMMY_NAMES = [
  'dimas & keluarga',
  'nadia & sahabat',
  'dimas',
  'nadia',
];

const isDummyMessage = (msg: GuestMessage) => {
  if (!msg || !msg.name) return true;
  if (['1', '2'].includes(msg.id)) return true;
  const lowerName = msg.name.toLowerCase().trim();
  if (DUMMY_NAMES.includes(lowerName)) return true;
  if (
    msg.message &&
    (msg.message.includes('Barakallahu lakum') ||
      msg.message.includes('Selamat berbahagia untuk kedua mempelai'))
  ) {
    return true;
  }
  return false;
};

interface GuestBookSectionProps {
  isActive?: boolean;
}

export const GuestBookSection: React.FC<GuestBookSectionProps> = ({ isActive = false }) => {
  const { ref, isInView } = useInView<HTMLElement>(0.2, isActive);
  const [messages, setMessages] = useState<GuestMessage[]>(() => {
    try {
      // Clear legacy storage keys containing previous mock data
      localStorage.removeItem('wedding_piki_rauuf_wishes');
      localStorage.removeItem('wedding_aji_arina_wishes');

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter((m: GuestMessage) => !isDummyMessage(m));
          if (cleaned.length !== parsed.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
          }
          return cleaned;
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newMessage: GuestMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      attendance,
      message: message.trim(),
      createdAt: 'Baru saja',
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setName('');
    setMessage('');
    setIsSubmitting(false);
  };

  const hasMessages = messages.length > 0;

  return (
    <section
      ref={ref}
      className={`snap-section relative w-full h-dvh min-h-dvh max-h-dvh shrink-0 flex flex-col items-center text-center px-4 sm:px-8 py-4 sm:py-6 bg-[#fef9f5] overflow-hidden ${
        isInView ? 'is-visible' : ''
      }`}
    >
      <FloralCorners />

      <div
        className={`w-full max-w-[370px] relative z-10 flex flex-col items-center ${
          hasMessages ? 'h-full justify-between' : 'my-auto'
        }`}
      >
        {/* Title */}
        <div className="shrink-0 mb-1.5 sm:mb-2">
          <p className="reveal delay-100 text-[10.5px] sm:text-[11px] tracking-[0.3em] uppercase text-stone-500 mb-0.5 font-normal">
            Buku Tamu
          </p>
          <h2 className="reveal delay-150 font-display text-[22px] sm:text-[26px] font-normal text-stone-900 tracking-wider mb-0.5">
            Ucapan &amp; Doa
          </h2>
          <p className="reveal delay-200 text-[11px] sm:text-[11.5px] text-stone-500 leading-relaxed max-w-[320px] mx-auto">
            Sampaikan doa restu dan ucapan hangat untuk kedua mempelai
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="reveal-scale delay-300 w-full max-w-[350px] shrink-0 border border-stone-200 bg-stone-50/70 rounded-xl p-3 sm:p-3.5 text-left mb-2 sm:mb-2.5 shadow-xs"
        >
          {/* Name input */}
          <div className="mb-2">
            <label className="block text-[10px] text-stone-500 uppercase tracking-wider mb-0.5 font-medium">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tuliskan nama Anda"
              className="w-full px-2.5 py-1 text-[12px] bg-white border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#721c24]"
            />
          </div>

          {/* Attendance option */}
          <div className="mb-2">
            <label className="block text-[10px] text-stone-500 uppercase tracking-wider mb-0.5 font-medium">
              Konfirmasi Kehadiran
            </label>
            <div className="grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => setAttendance('hadir')}
                className={`py-1 px-1.5 text-[10px] rounded-md text-center cursor-pointer transition-all ${
                  attendance === 'hadir'
                    ? 'bg-[#721c24] text-white font-medium shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-rose-50/50 hover:border-[#721c24]/30'
                }`}
              >
                Hadir
              </button>
              <button
                type="button"
                onClick={() => setAttendance('ragu')}
                className={`py-1 px-1.5 text-[10px] rounded-md text-center cursor-pointer transition-all ${
                  attendance === 'ragu'
                    ? 'bg-[#721c24] text-white font-medium shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-rose-50/50 hover:border-[#721c24]/30'
                }`}
              >
                Ragu
              </button>
              <button
                type="button"
                onClick={() => setAttendance('tidak_hadir')}
                className={`py-1 px-1.5 text-[10px] rounded-md text-center cursor-pointer transition-all ${
                  attendance === 'tidak_hadir'
                    ? 'bg-[#721c24] text-white font-medium shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-rose-50/50 hover:border-[#721c24]/30'
                }`}
              >
                Tidak Hadir
              </button>
            </div>
          </div>

          {/* Message textarea */}
          <div className="mb-2">
            <label className="block text-[10px] text-stone-500 uppercase tracking-wider mb-0.5 font-medium">
              Pesan &amp; Doa
            </label>
            <textarea
              required
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan dan doa restu..."
              className="w-full px-2.5 py-1 text-[12px] bg-white border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#721c24] resize-none"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-[#721c24] hover:bg-[#58151c] active:scale-[0.98] transition-all text-white text-[11.5px] py-2 rounded-lg cursor-pointer tracking-wider font-medium uppercase shadow-xs"
          >
            <Send className="w-3 h-3 text-rose-200" />
            Kirim Doa Restu
          </button>
        </form>

        {/* Message List */}
        {hasMessages ? (
          <div className="reveal delay-450 flex-1 min-h-0 w-full max-w-[350px] overflow-y-auto space-y-2 pr-1 text-left touch-pan-y overscroll-contain">
            {messages.map((item) => (
              <div
                key={item.id}
                className="border border-stone-200 bg-white rounded-lg p-2.5 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-medium text-[12px] text-stone-900 truncate">
                    {item.name}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded border border-stone-200 text-stone-600 uppercase tracking-wider shrink-0">
                    {item.attendance === 'hadir'
                      ? 'Hadir'
                      : item.attendance === 'ragu'
                      ? 'Ragu'
                      : 'Tidak Hadir'}
                  </span>
                </div>
                <p className="text-[11.5px] text-stone-600 leading-relaxed break-words">
                  {item.message}
                </p>
                <div className="flex items-center justify-between text-[9.5px] text-stone-400 mt-1.5 pt-1 border-t border-stone-100">
                  <span>{item.createdAt}</span>
                  <span className="inline-flex items-center gap-1 text-stone-400">
                    <Heart className="w-2.5 h-2.5 fill-current" />
                    Doa
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="reveal delay-450 w-full max-w-[350px] text-left">
            <div className="border border-dashed border-stone-200 bg-white/60 rounded-lg p-3 text-center">
              <p className="text-[11.5px] text-stone-500 italic">
                Belum ada ucapan. Jadilah yang pertama memberikan doa restu.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
