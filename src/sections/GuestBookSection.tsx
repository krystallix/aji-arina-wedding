import React, { useState } from 'react';
import type { GuestMessage } from '../types';
import { Send, Heart } from 'lucide-react';
import { FloralCorners } from '../components/FloralCorners';

const STORAGE_KEY = 'wedding_piki_rauuf_wishes';

const INITIAL_MESSAGES: GuestMessage[] = [
  {
    id: '1',
    name: 'Dimas & Keluarga',
    attendance: 'hadir',
    message:
      'Barakallahu lakum wa baraka alaikum wa jama\'a bainakuma fii khoir. Selamat menempuh hidup baru Arina & Aji, semoga senantiasa sakinah mawaddah warahmah!',
    createdAt: 'Baru saja',
  },
  {
    id: '2',
    name: 'Nadia & Sahabat',
    attendance: 'hadir',
    message:
      'Selamat berbahagia untuk kedua mempelai! Semoga lancar seluruh rangkaian acara dan langgeng selalu. Aamiin.',
    createdAt: '1 jam lalu',
  },
];

export const GuestBookSection: React.FC = () => {
  const [messages, setMessages] = useState<GuestMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_MESSAGES;
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

  return (
    <section className="snap-section relative w-full h-dvh min-h-dvh max-h-dvh shrink-0 flex flex-col justify-center items-center text-center px-6 sm:px-8 py-8 sm:py-10 bg-[#fef9f5] overflow-hidden">
      <FloralCorners />

      <div className="w-full max-w-[360px] flex flex-col items-center my-auto relative z-10">
        {/* Title */}
        <p className="text-[11px] tracking-[0.3em] uppercase text-stone-500 mb-1 font-normal">
          Buku Tamu
        </p>
        <h2 className="font-display text-[24px] sm:text-[28px] font-normal text-stone-900 tracking-wider mb-1">
          Ucapan &amp; Doa
        </h2>
        <p className="text-[11.5px] sm:text-[12px] text-stone-500 leading-relaxed max-w-[320px] mx-auto mb-4">
          Sampaikan doa restu dan ucapan hangat untuk kedua mempelai
        </p>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[340px] border border-stone-200 bg-stone-50/50 rounded-xl p-4 text-left mb-4"
        >
          {/* Name input */}
          <div className="mb-2.5">
            <label className="block text-[10.5px] text-stone-500 uppercase tracking-wider mb-1 font-medium">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tuliskan nama Anda"
              className="w-full px-3 py-1.5 text-[12.5px] bg-white border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#721c24]"
            />
          </div>

          {/* Attendance option */}
          <div className="mb-2.5">
            <label className="block text-[10.5px] text-stone-500 uppercase tracking-wider mb-1 font-medium">
              Konfirmasi Kehadiran
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setAttendance('hadir')}
                className={`py-1 px-2 text-[10.5px] rounded-md text-center cursor-pointer transition-all ${
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
                className={`py-1 px-2 text-[10.5px] rounded-md text-center cursor-pointer transition-all ${
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
                className={`py-1 px-2 text-[10.5px] rounded-md text-center cursor-pointer transition-all ${
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
          <div className="mb-3">
            <label className="block text-[10.5px] text-stone-500 uppercase tracking-wider mb-1 font-medium">
              Pesan &amp; Doa
            </label>
            <textarea
              required
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan dan doa restu..."
              className="w-full px-3 py-1.5 text-[12.5px] bg-white border border-stone-200 rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#721c24] resize-none"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#721c24] hover:bg-[#58151c] active:scale-[0.98] transition-all text-white text-[12px] py-2.5 rounded-lg cursor-pointer tracking-wider font-medium uppercase shadow-md shadow-rose-950/20"
          >
            <Send className="w-3 h-3 text-rose-200" />
            Kirim Doa Restu
          </button>
        </form>

        {/* Message List */}
        <div className="w-full max-w-[340px] max-h-[140px] sm:max-h-[170px] overflow-y-auto space-y-2 pr-1 text-left">
          {messages.map((item) => (
            <div
              key={item.id}
              className="border border-stone-200 bg-white rounded-lg p-2.5"
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
      </div>
    </section>
  );
};
