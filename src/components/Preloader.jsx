'use client';

import { useEffect, useState } from 'react';

const LETTERS = ['v', 's', 'y', 'n', 'c', '.'];

/* Timing, in ms. Kept in one place so the CSS delays and the JS state
 * changes stay in step. */
const HOLD = 1500; // wordmark up, bar filled, then lift
const LIFT = 800; // slide-up duration
const HARD_STOP = 5000; // absolute ceiling, nothing can outlive this

export default function Preloader() {
  const [lifting, setLifting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Second visit this session — don't replay the intro. Deferred by a tick
    // so the first paint matches the server render (setState is not called
    // synchronously in the effect body).
    if (document.documentElement.dataset.vsReady === '1') {
      const id = window.setTimeout(() => setGone(true), 0);
      return () => window.clearTimeout(id);
    }

    const finish = () => {
      if (document.documentElement.dataset.vsReady === '1') return;
      document.documentElement.dataset.vsReady = '1';
      window.dispatchEvent(new Event('vs:ready'));
    };

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      finish();
      const id = window.setTimeout(() => setGone(true), 0);
      return () => window.clearTimeout(id);
    }

    // The lift is a CSS transition, not a GSAP tween: CSS keeps running on
    // the compositor even when the rAF ticker is throttled, so the loader
    // can never freeze half-off the screen and sit over the hero.
    const lift = window.setTimeout(() => {
      setLifting(true);
      finish();
    }, HOLD);

    const unmount = window.setTimeout(() => {
      finish();
      setGone(true);
    }, LIFT + 120);

    const hardStop = window.setTimeout(() => {
      finish();
      setGone(true);
    }, HARD_STOP);

    return () => {
      window.clearTimeout(lift);
      window.clearTimeout(unmount);
      window.clearTimeout(hardStop);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={'vs-preloader' + (lifting ? ' is-lifting' : '')}
      aria-hidden="true"
    >
      <div className="vs-preloader__stage">
        <div className="vs-preloader__word">
          {LETTERS.map((letter, i) => (
            <span className="vs-preloader__mask" key={letter + i}>
              <span
                className="vs-preloader__letter"
                style={{ '--i': i }}
              >
                {letter}
              </span>
            </span>
          ))}
        </div>

        <span className="vs-preloader__bar-track">
          <span className="vs-preloader__bar" />
        </span>
      </div>
    </div>
  );
}
