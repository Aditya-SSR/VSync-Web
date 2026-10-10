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
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    if (!root) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.vs-faq__item');

      // Open the first panel on mount without animating it. Height is owned
      // entirely by GSAP from here — React never writes `style.height`, or
      // the two fight over the same property.
      const first = root.querySelector('.vs-faq__item .vs-faq__body');
      if (first) {
        first.style.height = 'auto';
        first.style.visibility = 'visible';
      }

      if (reduced) return;

      gsap.from(items, {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 78%', toggleActions: 'play none none reverse' },
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
   * Height is animated on a wrapper that clips, then released back to
   * `auto` on open so the copy can reflow when the window resizes.
   */
  const toggle = (index) => {
    setOpenIndex((current) => {
      const next = current === index ? -1 : index;

      const panels = rootRef.current.querySelectorAll('.vs-faq__body');

      panels.forEach((panel, i) => {
        const inner = panel.firstElementChild;
        const isOpening = i === next;

        if (isOpening) {
          gsap.set(panel, { height: 0, visibility: 'visible' });
          gsap.to(panel, {
            height: inner.offsetHeight,
            duration: 0.5,
            ease: 'power3.inOut',
            onComplete: () => gsap.set(panel, { height: 'auto' }),
          });
        } else {
          gsap.to(panel, {
            height: 0,
            duration: 0.38,
            ease: 'power3.inOut',
            onComplete: () => gsap.set(panel, { visibility: 'hidden' }),
          });
        }
      });

      return next;
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
