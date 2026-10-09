'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LETTERS = ['v', 's', 'y', 'n', 'c'];

export default function Preloader() {
  const rootRef = useRef(null);
  const lettersRef = useRef([]);
  const lineRef = useRef(null);
  const barRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const finish = () => {
      if (document.documentElement.dataset.vsReady === '1') return;
      document.documentElement.dataset.vsReady = '1';
      window.dispatchEvent(new Event('vs:ready'));
    };

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.set(root, { autoAlpha: 0 });
      finish();
      return;
    }

    const letters = lettersRef.current.filter(Boolean);
    const counter = { value: 0 };
    let done = false;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        done = true;
        finish();
      },
    });

    tl.set(root, { yPercent: 0 })
      .from(letters, {
        yPercent: 120,
        opacity: 0,
        duration: 0.75,
        stagger: 0.07,
      })
      .fromTo(
        lineRef.current,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' },
        '-=0.35'
      )
      .to(
        counter,
        {
          value: 100,
          duration: 1.1,
          ease: 'power1.inOut',
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = String(
                Math.round(counter.value)
              ).padStart(2, '0');
            }
            if (barRef.current) {
              gsap.set(barRef.current, {
                scaleX: Math.max(counter.value / 100, 0.02),
              });
            }
          },
        },
        '-=0.6'
      )
      .to(letters, {
        yPercent: -130,
        opacity: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: 'power3.in',
      })
      .to(
        root,
        { yPercent: -100, duration: 0.85, ease: 'expo.inOut' },
        '-=0.15'
      )
      .set(root, { autoAlpha: 0 });

    // Safety net: never trap the page behind the loader.
    const guard = window.setTimeout(() => {
      if (!done) {
        gsap.set(root, { autoAlpha: 0 });
        finish();
      }
    }, 6000);

    return () => {
      window.clearTimeout(guard);
      tl.kill();
    };
  }, []);

  return (
    <div className="vs-preloader" ref={rootRef} aria-hidden="true">
      <div className="vs-preloader__stage">
        <div className="vs-preloader__word">
          {LETTERS.map((letter, i) => (
            <span
              key={letter + i}
              className="vs-preloader__mask"
            >
              <span
                className="vs-preloader__letter"
                ref={(el) => {
                  lettersRef.current[i] = el;
                }}
              >
                {letter}
              </span>
            </span>
          ))}
        </div>

        <svg
          className="vs-preloader__line"
          viewBox="0 0 220 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            ref={lineRef}
            d="M4 9.5C38 4.5 74 3 112 3.2C150 3.4 186 5 216 8.4"
            stroke="var(--vs-blue)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
          />
        </svg>

        <div className="vs-preloader__meter">
          <span className="vs-preloader__bar-track">
            <span className="vs-preloader__bar" ref={barRef} />
          </span>
          <span className="vs-preloader__count">
            <span ref={countRef}>00</span>%
          </span>
        </div>
      </div>
    </div>
  );
}
