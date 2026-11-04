import React, { useState, useEffect } from 'react';
import type { WeddingConfig } from '../types';
import { Calendar, MapPin, Check } from 'lucide-react';
import { FloralCorners } from '../components/FloralCorners';
import { useInView } from '../hooks/useInView';

interface EventDetailsSectionProps {
  data: WeddingConfig;
  isActive?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({ data, isActive = false }) => {
  const { ref, isInView } = useInView<HTMLElement>(0.2, isActive);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [calendarAdded, setCalendarAdded] = useState(false);

  useEffect(() => {
    const target = new Date(data.targetDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [data.targetDate]);

  const handleAddToCalendar = () => {
    const startDate = '20261213T010000Z'; // 08:00 WIB = 01:00 UTC
    const endDate = '20261213T080000Z';   // 15:00 WIB = 08:00 UTC
    const title = encodeURIComponent('Pernikahan Arina & Aji');
    const details = encodeURIComponent(
      'Akad Nikah (08.00 WIB) & Resepsi (10.00 - 11.00 WIB) Arina & Aji di Aula HDWR Brajan Wonokromo'
    );
    const location = encodeURIComponent(data.map.address);

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;

    window.open(googleCalendarUrl, '_blank');
    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
  };

  const padZero = (n: number) => String(n).padStart(2, '0');

  return (
    <section
      ref={ref}
      className={`snap-section relative w-full h-dvh min-h-dvh max-h-dvh shrink-0 flex flex-col justify-center items-center text-center px-6 sm:px-8 py-8 sm:py-10 bg-[#fef9f5] overflow-hidden ${
        isInView ? 'is-visible' : ''
      }`}
    >
      <FloralCorners />

      <div className="w-full max-w-[360px] flex flex-col items-center my-auto relative z-10">
        {/* Title */}
        <p className="reveal delay-100 text-[11px] tracking-[0.3em] uppercase text-stone-500 mb-3 sm:mb-4 font-normal">
          Waktu &amp; Lokasi
        </p>

        {/* Countdown Timer Boxes */}
        <div className="reveal-scale delay-200 grid grid-cols-4 gap-2 w-full max-w-[300px] mx-auto mb-3">
          <div className="border border-stone-200 bg-stone-50/50 rounded-lg py-2 sm:py-2.5 px-1 flex flex-col items-center justify-center">
            <span className="font-display text-[18px] sm:text-[20px] font-normal text-stone-900 leading-none mb-1">
              {padZero(timeLeft.days)}
            </span>
            <span className="text-[9.5px] text-stone-500 uppercase tracking-wider">
              Hari
            </span>
          </div>

          <div className="border border-stone-200 bg-stone-50/50 rounded-lg py-2 sm:py-2.5 px-1 flex flex-col items-center justify-center">
            <span className="font-display text-[18px] sm:text-[20px] font-normal text-stone-900 leading-none mb-1">
              {padZero(timeLeft.hours)}
            </span>
            <span className="text-[9.5px] text-stone-500 uppercase tracking-wider">
              Jam
            </span>
          </div>

          <div className="border border-stone-200 bg-stone-50/50 rounded-lg py-2 sm:py-2.5 px-1 flex flex-col items-center justify-center">
            <span className="font-display text-[18px] sm:text-[20px] font-normal text-stone-900 leading-none mb-1">
              {padZero(timeLeft.minutes)}
            </span>
            <span className="text-[9.5px] text-stone-500 uppercase tracking-wider">
              Menit
            </span>
          </div>

          <div className="border border-stone-200 bg-stone-50/50 rounded-lg py-2 sm:py-2.5 px-1 flex flex-col items-center justify-center">
            <span className="font-display text-[18px] sm:text-[20px] font-normal text-stone-900 leading-none mb-1">
              {padZero(timeLeft.seconds)}
            </span>
            <span className="text-[9.5px] text-stone-500 uppercase tracking-wider">
              Detik
            </span>
          </div>
        </div>

        {/* Simpan ke Kalender Button */}
        <div className="reveal delay-300">
          <button
            onClick={handleAddToCalendar}
            className="inline-flex items-center gap-1.5 bg-[#721c24] hover:bg-[#58151c] active:scale-[0.98] transition-all duration-200 text-white text-[11px] sm:text-[11.5px] px-4 py-1.5 rounded-lg cursor-pointer tracking-wider mb-4 shadow-sm"
          >
            {calendarAdded ? (
              <>
                <Check className="w-3 h-3 text-white" />
                Tersimpan di Kalender
              </>
            ) : (
              <>
                <Calendar className="w-3 h-3 text-rose-200" />
                Simpan ke Google Calendar
              </>
            )}
          </button>
        </div>

        {/* Location Details Card */}
        <div className="reveal-scale delay-450 w-full max-w-[330px] border border-stone-200 bg-stone-50/50 rounded-xl p-4 sm:p-5 text-center">
          <span className="reveal delay-500 text-[9.5px] uppercase tracking-[0.25em] text-stone-400 font-medium block mb-1">
            Tempat Acara
          </span>
          <h3 className="reveal delay-550 font-display text-[16px] sm:text-[18px] font-normal text-stone-900 mb-1.5">
            {data.map.placeName}
          </h3>
          <p className="reveal delay-600 text-[11.5px] text-stone-500 leading-relaxed mb-4 max-w-[270px] mx-auto">
            {data.map.address}
          </p>

          <a
            href={data.map.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal delay-650 inline-flex items-center justify-center gap-1.5 bg-[#721c24] hover:bg-[#58151c] active:scale-[0.98] transition-all duration-200 text-white text-[11.5px] px-5 py-2 rounded-lg cursor-pointer tracking-wider uppercase font-medium shadow-md shadow-rose-950/20"
          >
            <MapPin className="w-3 h-3 text-rose-200" />
            Buka di Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};
