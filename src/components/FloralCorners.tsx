import React from 'react';

interface FloralCornersProps {
  showTopLeft?: boolean;
  showBottomRight?: boolean;
  className?: string;
}

export const FloralCorners: React.FC<FloralCornersProps> = ({
  showTopLeft = true,
  showBottomRight = true,
  className = '',
}) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden z-0 select-none ${className}`}>
      {showTopLeft && (
        <img
          src="/assets/floral_top_left_transparent.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-[24%] max-w-[125px] sm:max-w-[145px] object-contain drop-shadow-[0_2px_10px_rgba(123,24,50,0.06)] opacity-90 animate-breathe-tl"
        />
      )}
      {showBottomRight && (
        <img
          src="/assets/floral_bottom_right_transparent.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-[24%] max-w-[125px] sm:max-w-[145px] object-contain drop-shadow-[0_2px_10px_rgba(123,24,50,0.06)] opacity-90 animate-breathe-br"
        />
      )}
    </div>
  );
};
