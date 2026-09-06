"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import Preloader from "../components/Preloader";

gsap.registerPlugin(CustomEase, useGSAP);

CustomEase.create(
  "hop",
  "M0,0 C0.29,0 0.348,0.05 0.422,0.134 0.494,0.217 0.484,0.355 0.5,0.5 0.518,0.662 0.515,0.793 0.596,0.876 0.701,0.983 0.72,0.987 1,1"
);

const TITLE = "VSync";

const HERO_CLIP_OPEN = "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)";
const OVERLAY_CLIP_GONE = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";

const NAV_LINKS = [
  { label: "Minimal Labs", href: "#" },
  { label: "Privacy Policy", href: "/privacypolicy" },
  { label: "Terms", href: "/terms" },
  { label: "DGK", href: "#" },
  { label: "Lynx", href: "#" },
  { label: "Source Code", href: "#" },
];

const navLinkClasses =
  "home-nav-link relative inline-block will-change-transform after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100";

export default function Home() {
  const mainRef = useRef(null);
  const revealRef = useRef(null);

  useGSAP(
    () => {
      const root = mainRef.current;
      const chars = Array.from(root.querySelectorAll(".home-title-char"));
      const navLinks = Array.from(root.querySelectorAll(".home-nav-link"));

      const mm = gsap.matchMedia();

      mm.add(
        {
          animate: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          // users who prefer reduced motion land straight on the final page
          // (the Preloader hides itself under reduced motion)
          if (context.conditions.reduced) {
            gsap.set(".home-hero", { clipPath: HERO_CLIP_OPEN });
            gsap.set(".home-overlay", {
              clipPath: OVERLAY_CLIP_GONE,
              autoAlpha: 0,
            });
            gsap.set(".home-stage", { scale: 1 });
            gsap.set(chars, { yPercent: 0 });
            gsap.set(navLinks, { yPercent: 0 });
            gsap.set(".home-tagline", { autoAlpha: 1, y: 0 });
            return;
          }

          /* ---- initial states ------------------------------------------ */

          gsap.set(".home-stage", { scale: 1.06 });
          // wordmark starts beneath its per-letter overflow masks
          gsap.set(chars, { yPercent: 140 });
          gsap.set(navLinks, { yPercent: -120 });
          gsap.set(".home-tagline", { autoAlpha: 0, y: 24 });

          /* ---- the reveal, played when the Preloader hands over --------- */

          const reveal = gsap
            .timeline({ paused: true })
            // grey sheet wipes open from the bottom edge
            .to(
              ".home-hero",
              { clipPath: HERO_CLIP_OPEN, duration: 2, ease: "hop" },
              0
            )
            // the whole composition settles from a slight push-in
            .to(
              ".home-stage",
              { scale: 1, duration: 2.25, ease: "power3.inOut" },
              0.25
            )
            // grey curtain lifts away, unveiling the page…
            .to(
              ".home-overlay",
              { clipPath: OVERLAY_CLIP_GONE, duration: 2, ease: "hop" },
              0.5
            )
            // …while the wordmark rises out of its masks, staggered per letter
            .to(
              chars,
              {
                yPercent: 0,
                duration: 1.5,
                ease: "power4.inOut",
                stagger: 0.08,
              },
              0.6
            )
            // nav links drop into their row
            .to(
              navLinks,
              { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.06 },
              0.85
            )
            .to(
              ".home-tagline",
              { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" },
              1.05
            );

          // hand the paused timeline to the Preloader via a ref, so its
          // onFinish callback (fired later, outside this context) can play it
          revealRef.current = () => reveal.play();
        }
      );
    },
    { scope: mainRef }
  );

  return (
    <main
      ref={mainRef}
      className="relative h-svh w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* revealed landing page — wiped open from the bottom edge by GSAP */}
      <section className="home-hero absolute inset-0 z-10 bg-[#ebebeb] text-[#1a1a1a]">
        <div className="home-stage absolute inset-0 will-change-transform">
          
          {/* corner registration ticks — a quiet frame, like a readout viewfinder */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-6 top-6 h-4 w-4 border-l border-t border-[#1a1a1a]/20 sm:left-8 sm:top-8"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-6 h-4 w-4 border-r border-t border-[#1a1a1a]/20 sm:right-8 sm:top-8"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-6 h-4 w-4 border-b border-l border-[#1a1a1a]/20 sm:bottom-8 sm:left-8"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 right-6 h-4 w-4 border-b border-r border-[#1a1a1a]/20 sm:bottom-8 sm:right-8"
          />

          {/* wordmark + tagline, centered on the page */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-[6vh]">
            <h1
              aria-label={TITLE}
              className="home-title select-none text-center font-tohue text-[clamp(4.25rem,27vw,24rem)] leading-none tracking-[-0.03em]"
            >
              {TITLE.split("").map((char, i) => (
                <span
                  key={`${char}-${i}`}
                  className="inline-block overflow-hidden pt-[0.1em] pb-[0.2em] mt-[-0.1em] mb-[-0.2em]"
                >
                  <span
                    aria-hidden="true"
                    className="home-title-char inline-block will-change-transform"
                  >
                    {char}
                  </span>
                </span>
              ))}
            </h1>
            <p className="home-tagline mt-8 font-tohue text-[10px] uppercase tracking-[0.28em] text-[#1a1a1a]/50 md:mt-10 md:text-xs">
              A minimalistic way to browse VTOP
            </p>
          </div>

          {/* top nav — one row, Tohue font */}
          <nav className="absolute inset-x-0 top-0 z-20 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5 px-5 py-5 font-tohue text-[10px] uppercase tracking-[0.14em] sm:px-8 sm:text-[11px] md:px-10 md:py-7">
            {NAV_LINKS.map(({ label, href }) => (
              <span key={label} className="overflow-hidden">
                <Link href={href} className={navLinkClasses}>
                  {label}
                </Link>
              </span>
            ))}
          </nav>
        </div>

        {/* grey sheet that lifts away to unveil the page */}
        <div className="home-overlay pointer-events-none absolute inset-0 z-30 bg-[#333333]" />
      </section>

      {/* black preloader curtain with the white load counter */}
      <Preloader onReveal={() => revealRef.current?.()} />
    </main>
  );
}