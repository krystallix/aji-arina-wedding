import { useEffect, useRef, useState } from 'react';

/**
 * useInView hook.
 * Reliably tracks section visibility in scroll container.
 * When isActive prop is true, it marks the section visible.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  threshold = 0.2,
  isActive = false
) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isActive) return;

    const el = ref.current;
    if (!el) return;

    const root = el.closest('main') || null;

    const checkVisibility = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const parentRect = root
        ? root.getBoundingClientRect()
        : { top: 0, bottom: window.innerHeight, height: window.innerHeight };

      const visibleTop = Math.max(rect.top, parentRect.top);
      const visibleBottom = Math.min(rect.bottom, parentRect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const ratio = rect.height > 0 ? visibleHeight / rect.height : 0;

      if (ratio >= threshold) {
        setIsInView(true);
      } else if (ratio < 0.05) {
        setIsInView(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            setIsInView(true);
          } else if (!entry.isIntersecting) {
            setIsInView(false);
          }
        });
      },
      {
        root,
        threshold: [0, threshold, 0.5],
      }
    );

    observer.observe(el);

    if (root) {
      root.addEventListener('scroll', checkVisibility, { passive: true });
    }

    checkVisibility();

    return () => {
      observer.disconnect();
      if (root) {
        root.removeEventListener('scroll', checkVisibility);
      }
    };
  }, [threshold, isActive]);

  return { ref, isInView: isInView || isActive };
}
