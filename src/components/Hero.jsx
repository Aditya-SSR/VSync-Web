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
      gsap.set([lines, '.vs-hero__cta'], { yPercent: 0, opacity: 1 });
      // Rows are clipping masks for the reveal only — never clip the stickers.
      gsap.set('.vs-hero__row', { overflow: 'visible' });
      return;
    }

    gsap.set(lines, { yPercent: 115, opacity: 0 });
    gsap.set('.vs-hero__cta', { y: 18, opacity: 0 });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      gsap.to(lines, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.09,
        ease: 'expo.out',
        // Once the lines have risen, release the clip so the stickers that
        // overhang a line can show (the star above "vit-ap", the smiley).
        onComplete: () => gsap.set('.vs-hero__row', { overflow: 'visible' }),
      });
      gsap.to('.vs-hero__cta', {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: 0.45,
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

                  if (word === 'open-source') {
                    return (
                      <span className="vs-hero__word" key={word}>
                        {word}
                        <img
                          className="vs-hero__sticker vs-hero__sticker--smiley"
                          src="/assets/deco/smiley-face.svg"
                          alt=""
                          aria-hidden="true"
                        />
                      </span>
                    );
                  }

                  if (word === 'VIT-AP') {
                    return (
                      <span className="vs-hero__word" key={word}>
                        {word}
                        <img
                          className="vs-hero__sticker vs-hero__sticker--star"
                          src="/assets/deco/pink-star.svg"
                          alt=""
                          aria-hidden="true"
                        />
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

        <div className="vs-hero__cta">
          {/* TODO: point at the real Play Store listing when it exists. */}
          <a
            href="#"
            className="vs-hero__btn"
            onClick={(e) => e.preventDefault()}
          >
            <span className="vs-hero__btn-text">get it on google play</span>
          </a>
          <span className="vs-hero__note">
            free · no ads · no trackers · runs on your device
          </span>
        </div>
      </div>

      <div className="vs-hero__fade" aria-hidden="true" />
    </section>
  );
}
