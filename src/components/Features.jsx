'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

const CARDS = [
  {
    number: '01',
    title: 'Mess Menu',
    accent: '#29725f',
    text: "Upload your college's Excel menu sheet and browse daily meals right from your phone.",
  },
  {
    number: '02',
    title: 'Countdowns',
    accent: '#4b69f0',
    text: 'Set countdowns for CATs, quizzes, assignments and other important academic deadlines.',
  },
  {
    number: '03',
    title: 'Minimal UI',
    accent: '#f5693c',
    text: 'No clutter, no unnecessary features. Just the academic information you need, presented cleanly.',
  },
  {
    number: '04',
    title: 'Customization',
    accent: '#a0325a',
    text: 'Personalize your app icon, choose your pages and make VSync feel like your own.',
  },
];

/**
 * Throw a card (or label) in the direction the pointer was leaving in, then
 * let InertiaPlugin settle it back to where it started. Same mechanic as the
 * reference site.
 */
function attachInertia(els, { throwX, throwY, spin }) {
  els.forEach((el) => {
    let lastX = 0;
    let lastY = 0;
    let velX = 0;
    let velY = 0;

    const homeX = gsap.getProperty(el, 'x');
    const homeY = gsap.getProperty(el, 'y');
    const homeRotation = gsap.getProperty(el, 'rotation');

    el.addEventListener('mousemove', (e) => {
      velX = e.clientX - lastX;
      velY = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
    });

    el.addEventListener('mouseenter', (e) => {
      velX = 0;
      velY = 0;
      lastX = e.clientX;
      lastY = e.clientY;
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        inertia: {
          x: { velocity: velX * throwX, end: homeX },
          y: { velocity: velY * throwY, end: homeY },
          rotation: { velocity: velX * spin, end: homeRotation },
        },
      });
    });
  });
}

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.vs-features__card');
      const labels = gsap.utils.toArray('.vs-features__label');

      if (!reduced) {
        attachInertia(cards, { throwX: 20, throwY: 20, spin: 1.5 });
        attachInertia(labels, { throwX: 25, throwY: 25, spin: 2 });
      }

      // Cards fan out of the blob as the section arrives.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      });

      const sticker = section.querySelector('.vs-features__sticker img');
      if (sticker) {
        gsap.set(sticker, { scale: 0, opacity: 0, rotation: -30 });
        tl.to(
          sticker,
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1.7,
            ease: 'elastic.out(1, 0.4)',
          },
          0
        );
      }

      const path = section.querySelector('.vs-features__underline path');
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(path, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out' }, 0.2);
      }

      if (!reduced) {
        gsap.from(cards, {
          y: 90,
          rotation: (i) => gsap.getProperty(cards[i], 'rotation') + 12,
          opacity: 0,
          duration: 1.1,
          stagger: 0.09,
          ease: 'expo.out',
        });
        gsap.from(labels, {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'back.out(1.8)',
          delay: 0.45,
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="vs-features" ref={sectionRef}>
      <div className="vs-features__heading">
        <h2 className="vs-features__title">everything you</h2>
        <p className="vs-features__subtitle">actually need.</p>

        <svg
          className="vs-features__underline"
          viewBox="0 0 634 28"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* sits in the section's top-right corner, not against the headline —
          the title is centred and grows with the viewport, so anything hung
          off it eventually lands on the words */}
      <span className="vs-features__sticker">
        <img src="/assets/deco/sticker-phone.svg" alt="" aria-hidden="true" />
      </span>

      <div className="vs-features__stage">
        <div className="vs-features__blob" aria-hidden="true">
          <img src="/assets/deco/blob.svg" alt="" />
        </div>

        <ul className="vs-features__cards">
          {CARDS.map((card, i) => (
            <li
              key={card.number}
              className={`vs-features__card vs-features__card--${i + 1}`}
              style={{ '--card-bg': card.accent }}
            >
              <span className="vs-features__card-num">{card.number}</span>
              <span className="vs-features__card-body">
                <span className="vs-features__card-title">{card.title}</span>
                <span className="vs-features__card-text">{card.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* sits in the section's top-right corner, not against the headline —
          the title is centred and grows with the viewport, so anything hung
          off it eventually lands on the words */}
      <span className="vs-features__sticker">
        <img src="/assets/deco/sticker-phone.svg" alt="" aria-hidden="true" />
      </span>

      <p className="vs-features__desc">
        From attendance and grades to academic calendars, outings, digital
        assignment uploads, faculty information and the VTOP web view — VSync
        brings your academic essentials together in one place. No unnecessary
        layers. Just the tools you need, with the freedom to make them your
        own.
      </p>
    </section>
  );
}
