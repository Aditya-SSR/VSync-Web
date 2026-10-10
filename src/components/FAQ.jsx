'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FAQS = [
  {
    number: '01',
    q: 'Is VSync an official VIT-AP app?',
    a: 'No. VSync is an independent, student-built open-source project and is not affiliated with, endorsed by, or operated by VIT-AP.',
  },
  {
    number: '02',
    q: 'How does automatic OTP fetching work?',
    a: "VSync's Play Store version does not include automatic OTP detection. We originally wanted to automate the entire VTOP login process, but Android's NotificationListenerService introduces restrictions that prevent us from shipping that functionality through the Play Store.\n\nFor users who want automatic OTP handling, we maintain a separate experimental build called VSync-Nightly. It uses Android's Notification Listener functionality to look specifically for OTP notifications from Mail SDK VIT-AP and automate the login flow. It is distributed separately through our GitHub releases.",
    cta: { text: 'get vsync-nightly', href: 'https://github.com/dgk1503/V-Sync' },
  },
  {
    number: '03',
    q: 'Is VSync a fork?',
    a: 'It started as one. VSync originally began as a fork of the VIT-AP Student App, but the project has since evolved well beyond its original codebase and direction. Today it is developed independently, with its own features and its own architecture, rather than depending on the original project.',
  },
  {
    number: '04',
    q: 'Why VSync, when other apps already exist?',
    a: 'Because we wanted something different. There are already projects solving this same problem, but VSync is built around a different philosophy: minimal, lightweight, and unopinionated. We wanted to give students the information they actually need without adding another layer of clutter, unnecessary features, or complicated workflows.',
  },
  {
    number: '05',
    q: 'What happens to my VTOP credentials?',
    a: 'They stay on your device. Credentials are used only to sign in to the official VTOP portal, stored locally in encrypted form, and never transmitted to us or to anyone else. There is no server on the other end — VSync fetches pages from VTOP directly, the same way your browser would.',
  },
];

export default function FAQ() {
  const rootRef = useRef(null);
  // -1 = everything collapsed. Nothing is open on first paint.
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    if (!root) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.from('.vs-faq__item', {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });

      const sticker = root.querySelector('.vs-faq__sticker img');
      if (sticker) {
        gsap.set(sticker, { scale: 0, rotation: -40 });
        gsap.to(sticker, {
          scale: 1,
          rotation: 0,
          duration: 1.6,
          ease: 'elastic.out(1, 0.45)',
          scrollTrigger: { trigger: root, start: 'top 78%' },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  /* ── Accordion ──────────────────────────────────────────────────────────
   * One open at a time. Height is tweened on a clipping wrapper and released
   * back to `auto` on open so long answers reflow when the window resizes;
   * the copy inside lifts and fades on its own, slightly behind the height.
   * React never writes style.height here — it and GSAP would fight.
   */
  const toggle = (index) => {
    const next = openIndex === index ? -1 : index;
    setOpenIndex(next);

    const panels = rootRef.current.querySelectorAll('.vs-faq__body');

    panels.forEach((panel, i) => {
      const inner = panel.firstElementChild;
      const opening = i === next;

      gsap.killTweensOf(panel);
      gsap.killTweensOf(inner.children);

      if (opening) {
        gsap.set(panel, { height: 0, visibility: 'visible' });
        gsap.to(panel, {
          height: inner.offsetHeight,
          duration: 0.55,
          ease: 'power3.inOut',
          onComplete: () => gsap.set(panel, { height: 'auto' }),
        });
        gsap.fromTo(
          inner.children,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power3.out',
            delay: 0.12,
          }
        );
      } else {
        gsap.to(inner.children, {
          y: -10,
          opacity: 0,
          duration: 0.22,
          stagger: 0.03,
          ease: 'power2.in',
        });
        gsap.to(panel, {
          height: 0,
          duration: 0.42,
          ease: 'power3.inOut',
          onComplete: () => gsap.set(panel, { visibility: 'hidden' }),
        });
      }
    });
  };

  return (
    <section className="vs-faq" ref={rootRef}>
      <div className="vs-faq__panel">
        <header className="vs-faq__head">
          <p className="vs-faq__eyebrow">faq</p>
          <h2 className="vs-faq__title">
            questions,
            <br />
            answered.
            <span className="vs-faq__sticker">
              <img src="/assets/deco/pink-star.svg" alt="" aria-hidden="true" />
            </span>
          </h2>
        </header>

        <ul className="vs-faq__list">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <li
                key={faq.number}
                className={'vs-faq__item' + (isOpen ? ' is-open' : '')}
              >
                <h3 className="vs-faq__heading">
                  <button
                    type="button"
                    id={`faq-q-${faq.number}`}
                    className="vs-faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${faq.number}`}
                    onClick={() => toggle(i)}
                  >
                    <span className="vs-faq__num">{faq.number}</span>
                    <span className="vs-faq__q">{faq.q}</span>
                    <span className="vs-faq__sign" aria-hidden="true">
                      <i className="vs-faq__sign-bar vs-faq__sign-bar--h" />
                      <i className="vs-faq__sign-bar vs-faq__sign-bar--v" />
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-a-${faq.number}`}
                  role="region"
                  aria-labelledby={`faq-q-${faq.number}`}
                  className="vs-faq__body"
                >
                  <div className="vs-faq__answer">
                    {faq.a.split('\n\n').map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}

                    {faq.cta && (
                      <a
                        href={faq.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="vs-faq__cta"
                      >
                        <span>{faq.cta.text}</span>
                        <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
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
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
