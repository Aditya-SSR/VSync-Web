'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Hold the page still until the preloader lifts, then hand over to Lenis.
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      document.body.classList.remove('vs-locked');
      lenis.start();
    };

    if (document.documentElement.dataset.vsReady === '1') {
      start();
    } else {
      lenis.stop();
      document.body.classList.add('vs-locked');
      window.addEventListener('vs:ready', start);
    }

    window.__lenis = lenis;

    return () => {
      window.removeEventListener('vs:ready', start);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
