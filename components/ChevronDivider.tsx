import React from 'react';

export function ChevronDivider() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute w-full h-12 bottom-0 left-0 text-white fill-current md:w-16 md:h-full md:right-0 md:left-auto md:top-0 translate-y-[99%] md:translate-y-0 md:translate-x-[99%] z-10"
    >
      <polygon points="0,0 100,0 50,100" className="md:hidden" />
      <polygon points="0,0 0,100 100,50" className="hidden md:block" />
    </svg>
  );
}
