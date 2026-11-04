import React, { useState, useEffect } from 'react';
import type { GuestMessage } from '../types';
import { Send, Heart, Loader2 } from 'lucide-react';
import { FloralCorners } from '../components/FloralCorners';
import { useInView } from '../hooks/useInView';
import { supabase } from '../lib/supabase';

const DUMMY_NAMES = [
  'dimas & keluarga',
  'nadia & sahabat',
  'dimas',
  'nadia',
  'test check',
];

const isDummyMessage = (msg: { id?: string; name?: string; message?: string }) => {
  if (!msg || !msg.name) return true;
  if (['1', '2'].includes(msg.id || '')) return true;
  const lowerName = msg.name.toLowerCase().trim();
  if (DUMMY_NAMES.includes(lowerName)) return true;
  if (
    msg.message &&
    (msg.message.includes('Barakallahu lakum') ||
      msg.message.includes('Selamat berbahagia untuk kedua mempelai') ||
      msg.message.includes('test connectivity'))
  ) {
    return true;
  }
  return false;
};

const formatTimeAgo = (dateStr?: string) => {
  if (!dateStr) return 'Baru saja';
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    if (isNaN(diff) || diff < 0) return 'Baru saja';
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} hari lalu`;
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  } catch {
    return 'Baru saja';
  }
};

interface GuestBookSectionProps {
  isActive?: boolean;
}

export const GuestBookSection: React.FC<GuestBookSectionProps> = ({ isActive = false }) => {
  const { ref, isInView } = useInView<HTMLElement>(0.2, isActive);
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch initial messages and listen to Supabase Realtime
  useEffect(() => {
    let isMounted = true;

    const fetchWishes = async () => {
      try {
        const { data, error } = await supabase
          .from('wishes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching wishes from Supabase:', error);
          return;
        }

        if (data && isMounted) {
          const formatted: GuestMessage[] = data
            .filter((row) => !isDummyMessage(row))
            .map((row) => ({
              id: row.id,
              name: row.name,
              attendance: row.attendance,
              message: row.message,
              createdAt: formatTimeAgo(row.created_at),
            }));
          setMessages(formatted);
        }
      } catch (err) {
        console.error('Unexpected error fetching wishes:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchWishes();

    // Setup Supabase Realtime channel
    const channel = supabase
      .channel('public:wishes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'wishes' },
        (payload) => {
          const newRow = payload.new as {
            id: string;
            name: string;
            attendance: 'hadir' | 'tidak_hadir' | 'ragu';
            message: string;
            created_at: string;
          };
          if (!isDummyMessage(newRow)) {
            const formattedItem: GuestMessage = {
              id: newRow.id,
              name: newRow.name,
              attendance: newRow.attendance,
              message: newRow.message,
              createdAt: formatTimeAgo(newRow.created_at),
            };
            setMessages((prev) => [formattedItem, ...prev.filter((p) => p.id !== formattedItem.id)]);
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    try {
      const { data, error } = await supabase
        .from('wishes')
        .insert([
          {
            name: trimmedName,
            attendance,
            message: trimmedMessage,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error inserting wish to Supabase:', error);
        alert('Gagal mengirim doa restu. Silakan coba kembali.');
      } else if (data) {
        const newMsg: GuestMessage = {
          id: data.id,
          name: data.name,
          attendance: data.attendance,
          message: data.message,
          createdAt: 'Baru saja',
        };
        setMessages((prev) => [newMsg, ...prev.filter((p) => p.id !== newMsg.id)]);
        setMessage('');
      }
    } catch (err) {
      console.error('Unexpected error submitting wish:', err);
    } finally {
      setIsSubmitting(false);
    }
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
            className="w-full inline-flex items-center justify-center gap-1.5 bg-[#721c24] hover:bg-[#58151c] active:scale-[0.98] disabled:opacity-70 transition-all text-white text-[11.5px] py-2 rounded-lg cursor-pointer tracking-wider font-medium uppercase shadow-xs"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3 h-3 text-rose-200 animate-spin" />
                Mengirimkan...
              </>
            ) : (
              <>
                <Send className="w-3 h-3 text-rose-200" />
                Kirim Doa Restu
              </>
            )}
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
                {isLoading
                  ? 'Memuat ucapan...'
                  : 'Belum ada ucapan. Jadilah yang pertama memberikan doa restu.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
