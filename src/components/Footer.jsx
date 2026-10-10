'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const GITHUB = 'https://github.com/dgk1503/V-Sync';
const EMAIL = 'minimallabs.dev@gmail.com';

export default function Footer() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.from('.vs-footer__col', {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 88%' },
      });

      // The wordmark rules itself up from the baseline.
      gsap.from('.vs-footer__mark', {
        yPercent: 18,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: root, start: 'top 88%' },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="vs-footer" ref={rootRef}>
      <div className="vs-footer__inner">
        <div className="vs-footer__top">
          <div className="vs-footer__col">
            <span className="vs-footer__badge">open source</span>
            <a
              className="vs-footer__headline"
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the source
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </a>
            <span className="vs-footer__sub">dgk1503 / V-Sync</span>
          </div>

          <div className="vs-footer__col">
            <span className="vs-footer__badge">contact</span>
            <span className="vs-footer__headline vs-footer__headline--plain">
              Say hello
            </span>
            <a className="vs-footer__sub vs-footer__sub--mail" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="vs-footer__marks">
          <nav className="vs-footer__links" aria-label="Footer">
            <Link href="/privacypolicy">privacy policy</Link>
            <Link href="/terms">terms of use</Link>
          </nav>
          <span className="vs-footer__crew">minimal labs</span>
        </div>

        {/* textLength pins the wordmark to the full viewBox width, so it
            spans edge to edge at any container size without distorting. */}
        <div className="vs-footer__mark" aria-hidden="true">
          <svg viewBox="0 0 1000 390" width="100%" role="presentation">
            <text
              x="0"
              y="300"
              textLength="1000"
              lengthAdjust="spacing"
              fill="currentColor"
            >
              vsync
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}
