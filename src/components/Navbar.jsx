'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const MENU_LINKS = [
  { label: 'privacy policy', href: '/privacypolicy' },
  { label: 'terms of use', href: '/terms' },
  { label: 'minimal labs', href: '#' },
  { label: 'lynx', href: '#' },
  { label: 'DGK', href: '#' },
];

export default function Navbar() {
  const [open, setOpen] = useState(null); // 'menu' | 'play' | null
  const [onLight, setOnLight] = useState(false);

  // Light text while the nav sits over the dark hero panel, dark text after.
  useEffect(() => {
    let ticking = false;

    const update = () => {
      const hero = document.querySelector('.vs-hero');
      const panelHeight = hero ? hero.getBoundingClientRect().height : 0;
      setOnLight(panelHeight > 0 && window.scrollY > panelHeight * 0.72);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    const raf = window.requestAnimationFrame(update);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
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

  const toggle = (which) => setOpen((current) => (current === which ? null : which));

  return (
    <>
      <div
        className={'vs-nav__backdrop' + (open ? ' is-open' : '')}
        onClick={() => setOpen(null)}
        aria-hidden="true"
      />

      <nav className={'vs-nav' + (onLight ? ' vs-nav--on-light' : '')}>
        <div className="vs-nav__side vs-nav__side--left">
          <div className="vs-nav__trigger-wrap">
            <button
              type="button"
              className="vs-nav__menu"
              aria-expanded={open === 'menu'}
              aria-controls="vs-menu-card"
              onClick={() => toggle('menu')}
            >
              menu
            </button>

            <div
              id="vs-menu-card"
              className={'vs-nav__card vs-nav__card--menu' + (open === 'menu' ? ' is-open' : '')}
            >
              <p className="vs-nav__card-label">vsync</p>
              <ul className="vs-nav__card-list">
                {MENU_LINKS.map((item) =>
                  item.href.startsWith('/') ? (
                    <li key={item.label}>
                      <Link href={item.href} onClick={() => setOpen(null)}>
                        {item.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="vs-nav__side vs-nav__side--right">
          <div className="vs-nav__trigger-wrap">
            <button
              type="button"
              className="vs-nav__play"
              aria-expanded={open === 'play'}
              aria-controls="vs-play-card"
              onClick={() => toggle('play')}
            >
              <span className="vs-nav__play-text">get vsync</span>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path
                  d="M4 3.5v17l14-8.5-14-8.5Z"
                  fill="currentColor"
                  opacity="0.9"
                />
              </svg>
            </button>

            <div
              id="vs-play-card"
              className={'vs-nav__card vs-nav__card--play' + (open === 'play' ? ' is-open' : '')}
            >
              <p className="vs-nav__card-title">get vsync</p>
              <p className="vs-nav__card-desc">
                Android build for VIT-AP students. Free, open-source, no accounts
                beyond your own VTOP login.
              </p>
              {/* TODO: point at the real Play Store listing once it exists.
                  No placeholder listing URL is invented here. */}
              <a
                href="#"
                className="vs-nav__card-link"
                onClick={(e) => e.preventDefault()}
              >
                <span>Play Store listing coming soon</span>
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
