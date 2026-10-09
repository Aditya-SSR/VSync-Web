'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

const CLICKABLE = [
  '.vs-nav__menu',
  '.vs-nav__play',
  '.vs-hero__cta',
  '.vs-footer a',
  '.vs-marquee__item',
].join(', ');

export default function CursorBubble() {
  useEffect(() => {
    const bubble = document.querySelector('.cursor-bubble');
    if (!bubble) return;

    const xTo = gsap.quickTo(bubble, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = gsap.quickTo(bubble, 'y', { duration: 0.5, ease: 'power3' });

    let showing = false;
    gsap.set(bubble, { rotation: -30, scale: 0 });

    const onMove = (e) => {
      xTo(e.clientX + 13);
      yTo(e.clientY - 43);
    };

    const popIn = () => {
      gsap.killTweensOf(bubble, 'opacity,scale,rotation');
      gsap.to(bubble, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.7,
        delay: 0.1,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    const popOut = () => {
      gsap.killTweensOf(bubble, 'opacity,scale,rotation');
      gsap.to(bubble, {
        opacity: 1,
        scale: 0,
        rotation: -30,
        duration: 0.3,
        ease: 'sine.inOut',
      });
    };

    const onOver = (e) => {
      const found = e.target.closest(CLICKABLE);
      if (found && !showing) {
        showing = true;
        popIn();
      } else if (!found && showing) {
        showing = false;
        popOut();
      }
    };

    const onLeave = () => {
      if (!showing) return;
      showing = false;
      popOut();
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(bubble);
    };
  }, []);

  return <div className="cursor-bubble">click</div>;
}
