import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  wobble: number;
  wobbleSpeed: number;
  rotation: number;
  rotationSpeed: number;
  flutter: number;
  flutterSpeed: number;
  color: string;
  colorDarker: string;
}

const PETAL_COLORS = [
  { main: 'rgba(235, 168, 160, ', dark: 'rgba(217, 130, 130, ' }, // Dusty blush
  { main: 'rgba(242, 184, 178, ', dark: 'rgba(224, 140, 134, ' }, // Soft rose
  { main: 'rgba(245, 203, 196, ', dark: 'rgba(232, 160, 149, ' }, // Light peach-pink
  { main: 'rgba(229, 149, 142, ', dark: 'rgba(204, 115, 115, ' }, // Watercolor petal
  { main: 'rgba(240, 178, 170, ', dark: 'rgba(219, 145, 138, ' }, // Warm blush
];

export const FallingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width || window.innerWidth;
      height = rect?.height || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const createPetal = (initialY?: number): Petal => {
      const colorScheme = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
      // Opacity lebih rendah dan halus (0.12 - 0.26)
      const baseAlpha = 0.12 + Math.random() * 0.14;
      // Ukuran kelopak lebih kecil (5.5px - 12px)
      const size = 5.5 + Math.random() * 6.5;

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : -15 - Math.random() * 40,
        size,
        speedY: 0.45 + Math.random() * 0.55, // Melayang lebih lembut
        speedX: (Math.random() - 0.5) * 0.35,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.015 + Math.random() * 0.02,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        flutter: Math.random() * Math.PI * 2,
        flutterSpeed: 0.02 + Math.random() * 0.03,
        color: `${colorScheme.main}${baseAlpha.toFixed(2)})`,
        colorDarker: `${colorScheme.dark}${(baseAlpha * 1.15).toFixed(2)})`,
      };
    };

    // 24 petals for a calm, non-distracting ambiance
    const PETAL_COUNT = 24;
    const petals: Petal[] = Array.from({ length: PETAL_COUNT }, () =>
      createPetal(Math.random() * height)
    );

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        p.wobble += p.wobbleSpeed;
        p.flutter += p.flutterSpeed;
        p.rotation += p.rotationSpeed;

        p.y += p.speedY;
        p.x += Math.sin(p.wobble) * 0.7 + p.speedX;

        // Reset petal when it drifts off the bottom or sides
        if (p.y > height + 20) {
          petals[i] = createPetal(-20);
        } else if (p.x < -30) {
          p.x = width + 20;
        } else if (p.x > width + 30) {
          p.x = -20;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // 3D flipping motion
        const scaleX = Math.cos(p.flutter);
        ctx.scale(scaleX, 1);

        // Draw petal shape using smooth organic bezier curves
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.75);
        ctx.bezierCurveTo(
          p.size * 0.65,
          -p.size * 0.5,
          p.size * 0.75,
          p.size * 0.55,
          0,
          p.size * 0.95
        );
        ctx.bezierCurveTo(
          -p.size * 0.75,
          p.size * 0.55,
          -p.size * 0.65,
          -p.size * 0.5,
          0,
          -p.size * 0.75
        );
        ctx.closePath();

        // Delicate gradient
        const gradient = ctx.createLinearGradient(0, -p.size * 0.75, 0, p.size * 0.95);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, p.colorDarker);

        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full z-20 select-none"
    />
  );
};
