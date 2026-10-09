'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ITEMS = ['attendance', 'marks', 'timetable', 'courses', 'mess', 'vtop'];

export default function Marquee() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) return;

    // The track holds the list twice, so a -50% shift loops seamlessly.
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 22,
      ease: 'none',
      repeat: -1,
    });

    // Nudge speed with scroll direction, like the reference's marquee feel.
    const st = ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 2500, 2.2);
        tween.timeScale(boost);
      },
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, []);

  return (
    <section className="vs-marquee" ref={rootRef} aria-label="What VSync shows">
      <div className="vs-marquee__track" ref={trackRef}>
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span className="vs-marquee__item" key={item + i}>
            <svg viewBox="0 0 13 16" width="12" height="15" aria-hidden="true">
              <path
                d="M12.28 7.04v.01c-.03.09-.18.2-.26.27-.48.42-.99.82-1.4 1.32-.3.37-.6.74-.87 1.12-.09.12-.2.22-.28.34-.08.13-.13.27-.2.4-.09.14-.15.29-.22.44-.09.18-.23.33-.31.52-.1.25-.17.51-.29.75-.15.43-.34.85-.48 1.29-.08.33-.06.67-.16 1-.09.3-.1.6-.1.92-.01.11.02.29-.06.35-.03 0-.07-.03-.1-.09-.11-.2-.15-.43-.26-.63-.16-.32-.42-.57-.61-.87-.11-.16-.2-.33-.32-.48-.1-.13-.23-.25-.35-.38-.1-.12-.2-.26-.31-.39C5.14 12.33 4.57 11.74 3.92 11.26c-.13-.09-.27-.12-.41-.18-.21-.09-.41-.23-.63-.3-.48-.17-.94-.42-1.44-.52-.23-.04-.47-.05-.7-.05-.18 0-.72.03-.31-.23.22-.14.44-.3.66-.46.2-.14.42-.27.61-.43.53-.47 1.05-.94 1.51-1.48.55-.67 1-1.43 1.35-2.24.17-.38.38-.74.51-1.14.11-.39.28-.77.38-1.16.16-.72.26-1.45.37-2.18.01-.08.03-.13.05-.14.02 0 .04.03.06.08.05.16.1.32.16.48.19.6.42 1.2.68 1.77.29.67.61 1.32 1.08 1.88.25.28.47.59.71.88.34.36.74.68 1.17.89.23.12.48.21.73.25.17.03.33.09.5.1.36.04.71-.05 1.07-.09.11-.01.24-.03.25.04Z"
                fill="currentColor"
              />
            </svg>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
