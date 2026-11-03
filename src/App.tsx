import { useState, useRef, useEffect, useCallback } from 'react';
import { weddingData } from './config/weddingData';
import { AudioPlayer } from './components/AudioPlayer';
import { FallingPetals } from './components/FallingPetals';
import { BookOpen } from 'lucide-react';
import {
  CoverSection,
  CoupleSection,
  VerseSection,
  AgendaSection,
  EventDetailsSection,
  GiftSection,
  ClosingSection,
  GuestBookSection,
  FooterSection,
} from './sections';

const SECTION_COUNT = 8;

export function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const isScrollingRef = useRef(false);

  const [guestName] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      if (to && to.trim().length > 0) {
        return decodeURIComponent(to.trim());
      }
    } catch {
      // ignore
    }
    return 'Tamu Undangan';
  });

  const scrollToSection = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const sections = container.querySelectorAll<HTMLElement>('.snap-section');
    const target = sections[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index);
    }
  }, []);

  const handleOpenInvitation = () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);
    setPlayMusic(true);

    // 3D smooth cinematic zoom portal duration is 1900ms
    setTimeout(() => {
      setIsOpened(true);
      setIsOpening(false);
      setActiveSection(0);
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }, 1900);
  };

  const handleReopenCover = () => {
    setIsOpened(false);
    setIsOpening(false);
    setActiveSection(0);
  };

  // Track active section on scroll
  const handleScroll = useCallback(() => {
    if (!isOpened) return;
    const container = containerRef.current;
    if (!container) return;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    if (clientHeight > 0) {
      const index = Math.round(scrollTop / clientHeight);
      setActiveSection(Math.min(SECTION_COUNT - 1, Math.max(0, index)));
    }
  }, [isOpened]);

  // Desktop wheel handler: 1 wheel gesture = exactly 1 section
  useEffect(() => {
    if (!isOpened) return;
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Allow internal scrolling inside comment boxes or textareas
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.overflow-y-auto') && target.closest('.overflow-y-auto') !== container) {
        return;
      }

      if (Math.abs(e.deltaY) < 15) return;
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      isScrollingRef.current = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      const sections = container.querySelectorAll<HTMLElement>('.snap-section');
      const scrollTop = container.scrollTop;
      const sectionHeight = container.clientHeight;
      const currentIndex = Math.round(scrollTop / sectionHeight);
      const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));

      sections[nextIndex]?.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(nextIndex);

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 650);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isOpened]);

  // Keyboard navigation (ArrowDown / ArrowUp)
  useEffect(() => {
    if (!isOpened) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        scrollToSection(Math.min(SECTION_COUNT - 1, activeSection + 1));
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        scrollToSection(Math.max(0, activeSection - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpened, activeSection, scrollToSection]);

  return (
    <div className="h-dvh w-full bg-stone-100 flex justify-center items-center overflow-hidden antialiased selection:bg-stone-900 selection:text-white relative">
      {/* Floating Falling Petals Overlay - hanya aktif setelah undangan dibuka */}
      {isOpened && (
        <div className="pointer-events-none fixed sm:absolute inset-0 sm:inset-y-0 sm:left-1/2 sm:-translate-x-1/2 w-full max-w-[460px] h-dvh z-30 overflow-hidden sm:rounded-2xl transition-opacity duration-700 animate-fadeIn">
          <FallingPetals />
        </div>
      )}

      {/* Main Wedding Invitation Frame Container */}
      <div className="w-full max-w-[460px] h-dvh relative overflow-hidden sm:border sm:border-stone-200/80 sm:shadow-2xl sm:rounded-2xl bg-[#fef9f5]">
        {/* 1. Interactive 3D Cover / Buka Undangan Portal */}
        {(!isOpened || isOpening) && (
          <div
            className={`absolute inset-0 w-full h-full z-50 transition-opacity duration-300 ${
              isOpening ? 'pointer-events-none' : ''
            }`}
          >
            <CoverSection
              data={weddingData}
              guestName={guestName}
              onOpen={handleOpenInvitation}
              isOpening={isOpening}
            />
          </div>
        )}

        {/* Content Sections Snap Container */}
        <main
          ref={containerRef}
          onScroll={handleScroll}
          className={`w-full h-full no-scrollbar flex flex-col relative ${
            isOpened
              ? 'overflow-y-scroll snap-container touch-pan-y opacity-100'
              : isOpening
              ? 'overflow-hidden pointer-events-none opacity-100 animate-section-reveal'
              : 'hidden opacity-0'
          }`}
        >
          {/* Navigation Indicator Dots & Sampul Button */}
          {isOpened && (
            <nav
              aria-label="Section navigation"
              className="fixed right-3 sm:absolute sm:right-3.5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1.5 p-1.5 rounded-full bg-[#fef9f5]/85 backdrop-blur-xs border border-stone-200/70 shadow-sm pointer-events-auto transition-opacity duration-500 animate-fadeIn"
            >
              {/* Tombol kembali ke Sampul 3D */}
              <button
                type="button"
                onClick={handleReopenCover}
                title="Lihat Sampul Undangan"
                aria-label="Lihat Sampul Undangan"
                className="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-[#721c24] transition-colors mb-1 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
              </button>

              {Array.from({ length: SECTION_COUNT }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToSection(i)}
                  aria-label={`Pindah ke section ${i + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeSection === i
                      ? 'h-3.5 w-1 bg-[#721c24]'
                      : 'h-1 w-1 bg-stone-300 hover:bg-[#721c24]/50'
                  }`}
                />
              ))}
            </nav>
          )}

          {/* 1. Salam Pembuka & Profil Mempelai */}
          <CoupleSection data={weddingData} />

          {/* 2. Ayat Suci */}
          <VerseSection data={weddingData} />

          {/* 3. Agenda Acara (Akad & Resepsi) */}
          <AgendaSection data={weddingData} />

          {/* 4. Waktu Acara (Timer & Lokasi Maps) */}
          <EventDetailsSection data={weddingData} />

          {/* 5. Tanda Kasih / Rekening */}
          <GiftSection data={weddingData} />

          {/* 6. Penutup */}
          <ClosingSection data={weddingData} />

          {/* 7. Buku Tamu / Ucapan */}
          <GuestBookSection />

          {/* 8. Footer / Selesai */}
          <FooterSection data={weddingData} />
        </main>
      </div>

      {/* Background Audio Player */}
      <AudioPlayer src={weddingData.musicUrl} autoPlayTrigger={playMusic} />
    </div>
  );
}

export default App;
