'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LINES = [
  ['a', 'minimalistic,'],
  ['lightweight,', 'unopinionated,'],
  ['open-source', 'academic'],
  ['companion', 'for', 'VIT-AP', 'students'],
];

export default function Hero() {
  const rootRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lines = linesRef.current.filter(Boolean);
    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.set(lines, { yPercent: 0, opacity: 1 });
      gsap.set('.vs-hero__cta', { y: 0, opacity: 1 });
      gsap.set('.vs-hero__row', { overflow: 'visible' });
      return;
    }

    gsap.set(lines, { yPercent: 118, opacity: 0 });
    gsap.set('.vs-hero__cta', { y: 20, opacity: 0 });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      gsap.to(lines, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.08,
        ease: 'expo.out',
        // Rows are clipping masks for the reveal only — once the lines have
        // risen the clip is released so overhanging stickers can show.
        onComplete: () => gsap.set('.vs-hero__row', { overflow: 'visible' }),
      });
      gsap.to('.vs-hero__cta', {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: 0.4,
        ease: 'power3.out',
      });
    };

    if (document.documentElement.dataset.vsReady === '1') {
      window.requestAnimationFrame(play);
    } else {
      window.addEventListener('vs:ready', play);
    }

    return () => window.removeEventListener('vs:ready', play);
  }, []);

  return (
    <section className="vs-hero" ref={rootRef}>
      <div className="vs-hero__panel">
        <div className="vs-hero__fade" aria-hidden="true" />

        <div className="vs-hero__content">
          <h1 className="vs-hero__title">
            {LINES.map((line, i) => (
              <span className="vs-hero__row" key={line.join('-')}>
                <span
                  className="vs-hero__row-inner"
                  ref={(el) => {
                    linesRef.current[i] = el;
                  }}
                >
                  {line.map((word) => {
                    if (word === 'lightweight,') {
                      return (
                        <span className="vs-hero__word" key={word}>
                          <span className="vs-hero__mark">{word}</span>
                          <svg
                            className="vs-hero__scribble"
                            viewBox="0 0 300 84"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M148 6C86 8 26 22 12 42c-12 17 30 32 116 34 86 2 152-8 162-26 9-16-30-33-108-35"
                              stroke="var(--vs-pink-solid)"
                              strokeWidth="5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      );
                    }

                    return (
                      <span className="vs-hero__word" key={word}>
                        {word}
                      </span>
                    );
                  })}
                </span>
              </span>
            ))}
          </h1>

          {/* Doodles hang off the centred block rather than individual words,
              so they stay put at every width instead of drifting with the
              ragged right edge of each line. */}
          <img
            className="vs-hero__sticker vs-hero__sticker--smiley"
            src="/assets/deco/smiley-face.svg"
            alt=""
            aria-hidden="true"
          />
          <img
            className="vs-hero__sticker vs-hero__sticker--star"
            src="/assets/deco/pink-star.svg"
            alt=""
            aria-hidden="true"
          />

          <div className="vs-hero__cta">
            <a
              href="https://play.google.com/store/apps/details?id=com.minimallabs.vsync"
              className="vs-hero__btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="vs-hero__btn-glyph" aria-hidden="true">
                <svg viewBox="0 0 466 512" width="20" height="22">
                  <path
                    d="M1.4 41.86C6.98 18.14 30.7 0 57.2 0L329.27 145.1 217 256 1.4 41.86Z"
                    fill="#34A853"
                  />
                  <path
                    d="M0 57.2v397.64c0 5.57 0 9.76 1.4 15.34L217 256 1.4 41.86 0 57.2Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M1.4 470.14 217 256l113.6 110.9-242.7 136.73C68.36 511.98 30.7 511.98 1.4 470.14Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M329.27 145.1 217 256l113.6 110.9L434 288.4c22.9-12.4 22.9-52.4 0-64.8L329.27 145.1Z"
                    fill="#FBBC04"
                  />
                </svg>
              </span>

              <span className="vs-hero__btn-copy">
                <span className="vs-hero__btn-kicker">get it on</span>
                <span className="vs-hero__btn-store">google play</span>
              </span>

              <svg
                className="vs-hero__btn-arrow"
                viewBox="0 0 24 24"
                width="15"
                height="15"
                aria-hidden="true"
              >
                <path
                  d="M5 12h13m0 0-5.2-5.2M18 12l-5.2 5.2"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
