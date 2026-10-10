'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

const MENU_LINKS = [
  { label: 'privacy policy', href: '/privacypolicy' },
  { label: 'terms of use', href: '/terms' },
  { label: 'minimal labs', href: '#' },
  { label: 'lynx', href: '#' },
  { label: 'DGK', href: '#' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [open, setOpen] = useState(null); // 'menu' | 'play' | null
  const [stuck, setStuck] = useState(false);
  const [onLight, setOnLight] = useState(false);

  const toggle = useCallback((which) => {
    setOpen((current) => (current === which ? null : which));
  }, []);

  /* ── Colour + stickiness ────────────────────────────────────────────────
   * The nav sits in normal flow over the dark hero. Once the panel has
   * scrolled clear of the viewport it flips to ink and pins to the top.
   *
   * NOTE: `getBoundingClientRect().bottom` is in *viewport* coordinates, so
   * it must not be compared against `window.scrollY` (document coordinates).
   * Comparing the two mixes frames and pins the nav halfway down the hero.
   */
  useEffect(() => {
    const update = () => {
      const panel = document.querySelector('.vs-hero__panel');
      if (!panel) return;

      const past = panel.getBoundingClientRect().bottom <= 0;

      setStuck(past);
      setOnLight(past);
    };

    // No rAF throttle here on purpose: the work is one rect read, and a
    // rAF-guarded flag latches permanently if rAF is throttled (background
    // tab), which silently freezes the nav.
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Close any open card on Escape.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ── Popout grow-out ──────────────────────────────────────────────────
   * The card scales out of the trigger icon's own centre, the way the
   * reference navbar does it.
   */
  useEffect(() => {
    const card = navRef.current?.querySelector(`#vs-card-${open}`);
    if (!card) return;

    const icon = card.parentElement.querySelector('[data-vs-origin]');

    // The closed state is `scale(0)`, which collapses the measured rect to a
    // point — restore it to 1 for one frame so the origin maths is real.
    gsap.set(card, { scale: 1 });

    const box = card.getBoundingClientRect();
    const iconBox = icon ? icon.getBoundingClientRect() : box;
    const originX = iconBox.left + iconBox.width / 2 - box.left;
    const originY = iconBox.top + iconBox.height / 2 - box.top;

    const items = card.querySelectorAll('.vs-nav__card-item');

    const tl = gsap.timeline();
    tl.set(card, {
      visibility: 'visible',
      transformOrigin: `${originX}px ${originY}px`,
    })
      .fromTo(
        card,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'expo.out' }
      )
      .fromTo(
        items,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' },
        0.16
      );

    return () => {
      tl.kill();
      gsap.set(card, { clearProps: 'all' });
    };
  }, [open]);

  const classes = [
    'vs-nav',
    stuck ? 'vs-nav--stuck' : '',
    onLight ? 'vs-nav--on-light' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div
        className={'vs-nav__backdrop' + (open ? ' is-open' : '')}
        onClick={() => setOpen(null)}
        aria-hidden="true"
      />

      <nav ref={navRef} className={classes}>
        <div className="vs-nav__side vs-nav__side--left">
          <div className="vs-nav__trigger-wrap">
            <button
              type="button"
              className={
                'vs-nav__menu' + (open === 'menu' ? ' is-open' : '')
              }
              data-vs-origin
              aria-expanded={open === 'menu'}
              aria-controls="vs-card-menu"
              onClick={() => toggle('menu')}
            >
              menu
            </button>

            <div
              id="vs-card-menu"
              aria-hidden={open !== 'menu'}
              className={
                'vs-nav__card vs-nav__card--menu' +
                (open === 'menu' ? ' is-open' : '')
              }
            >
              <p className="vs-nav__card-label">vsync</p>
              <ul className="vs-nav__card-list">
                {MENU_LINKS.map((item) =>
                  item.href.startsWith('/') ? (
                    <li key={item.label} className="vs-nav__card-item">
                      <Link href={item.href} onClick={() => setOpen(null)}>
                        {item.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={item.label} className="vs-nav__card-item">
                      <a href={item.href} onClick={() => setOpen(null)}>
                        {item.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="vs-nav__center">
          <Link href="/" className="vs-nav__logo">
            vsync<span className="vs-nav__logo-dot" aria-hidden="true" />
          </Link>
        </div>

        <div className="vs-nav__side vs-nav__side--right">
          <div className="vs-nav__trigger-wrap">
            <button
              type="button"
              className="vs-nav__play"
              aria-expanded={open === 'play'}
              aria-controls="vs-card-play"
              onClick={() => toggle('play')}
            >
              <span className="vs-nav__icon" data-vs-origin>
                <svg viewBox="0 0 466 512" width="26" height="28" aria-hidden="true">
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
              <span className="vs-sr-only">get vsync on google play</span>
            </button>

            <div
              id="vs-card-play"
              aria-hidden={open !== 'play'}
              className={
                'vs-nav__card vs-nav__card--play' +
                (open === 'play' ? ' is-open' : '')
              }
            >
              <img
                className="vs-nav__qr vs-nav__card-item"
                src="/assets/deco/wa_qr_code.png"
                width="200"
                height="200"
                alt="Scan to open VSync on the Play Store"
              />
              <h2 className="vs-nav__card-title vs-nav__card-item">
                get it on play
              </h2>
              <p className="vs-nav__card-desc vs-nav__card-item">
                Scan the QR code with your phone camera to pull VSync straight
                from the Play Store.
              </p>
              {/* TODO: point at the real Play Store listing once it exists.
                  No placeholder listing URL is invented here. */}
              <a
                href="#"
                className="vs-nav__card-link vs-nav__card-item"
                onClick={(e) => e.preventDefault()}
              >
                <span>open the listing</span>
                <svg viewBox="0 0 169 10" width="100%" height="9" aria-hidden="true">
                  <path
                    d="M1 6.56C56.4 3.06 112.2 1.2 168 1"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M32.1 8.63C68.2 6.93 104.5 6.13 140.7 6.25"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
