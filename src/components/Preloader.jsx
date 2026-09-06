"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const MIN_COUNT = 2.2; // s — keep the count on screen at least this long
const MAX_WAIT = 6; // s — never hold the page hostage
const TICK = 0.14; // s between counter increments

/**
 * Black preloader curtain with a big white load counter.
 * Self-contained: it counts while the page actually loads (window load +
 * fonts ready), slides the number away at 100 and calls `onReveal()`
 * the moment its exit starts, so the page can play its reveal timeline.
 */
export default function Preloader({ onReveal }) {
  const rootRef = useRef(null);
  const numberRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          animate: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          // reduced motion: the CSS below hides the counter, nothing to do
          if (context.conditions.reduced) return;

          const number = numberRef.current;
          const startedAt = performance.now();
          let value = 0;
          let loaded = false;

          // wait for window load AND web fonts before allowing 100
          let pending = 2;
          const markLoaded = () => {
            pending -= 1;
            if (pending === 0) loaded = true;
          };
          if (document.readyState === "complete") markLoaded();
          else window.addEventListener("load", markLoaded, { once: true });
          (document.fonts ? document.fonts.ready : Promise.resolve()).then(
            markLoaded
          );

          const setProgress = gsap.quickTo(lineRef.current, "scaleX", {
            duration: 0.3,
            ease: "power1.out",
          });

          const finish = () => {
            gsap.to(number, {
              yPercent: -130,
              duration: 0.7,
              ease: "power3.inOut",
              onStart: () => onReveal?.(),
            });
            gsap.to(".preloader-meta", {
              autoAlpha: 0,
              duration: 0.35,
              ease: "power1.out",
            });
          };

          const tick = () => {
            const elapsed = (performance.now() - startedAt) / 1000;
            if (!loaded && elapsed > MAX_WAIT) loaded = true;
            // hold at 92 until the page is really ready (and MIN_COUNT has passed)
            const ceiling = loaded && elapsed >= MIN_COUNT ? 100 : 92;
            value = Math.min(
              value + Math.floor(gsap.utils.random(4, 14)),
              ceiling
            );
            number.textContent = String(value);
            setProgress(value / 100);
            if (value >= 100) {
              finish();
              return;
            }
            gsap.delayedCall(TICK, tick);
          };

          // counter slides up into view, then starts counting
          gsap.fromTo(
            number,
            { yPercent: 130 },
            {
              yPercent: 0,
              duration: 0.9,
              ease: "power3.out",
              delay: 0.35,
              onComplete: () => gsap.delayedCall(0.2, tick),
            }
          );
          gsap.fromTo(
            ".preloader-meta",
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.55 }
          );

          return () => {
            window.removeEventListener("load", markLoaded);
          };
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="home-counter pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center"
    >
      <div className="overflow-hidden">
        <p
          ref={numberRef}
          className="font-tohue text-[clamp(4.5rem,15vw,11rem)] leading-none text-white will-change-transform"
        >
          0
        </p>
      </div>
      <div className="preloader-meta mt-8 h-px w-40 overflow-hidden bg-white/20 md:w-48">
        <div
          ref={lineRef}
          className="h-full w-full origin-left scale-x-0 bg-white/90"
        />
      </div>
    </div>
  );
}
