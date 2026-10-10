import Link from 'next/link';
import './lab.css';

const EMAIL = 'minimallabs.dev@gmail.com';

const DISCIPLINES = [
  {
    number: '01',
    title: 'Premium websites',
    text: 'Marketing sites, launches and redesigns that carry a brand instead of just rendering it.',
  },
  {
    number: '02',
    title: 'Cross-platform apps',
    text: 'Native-feeling products built once and shipped everywhere your users actually are.',
  },
  {
    number: '03',
    title: 'AI-powered automations',
    text: 'Workflows that take the repetitive work off people who have better things to do.',
  },
];

export const metadata = {
  title: 'Minimal Labs — a creative technology studio',
  description:
    'Minimal Labs is a creative technology studio building premium websites, cross-platform apps, and AI-powered automations for businesses.',
};

export default function MinimalLabs() {
  return (
    <>
      <header className="lab-bar">
        <Link href="/" className="lab-bar__back">
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path
              d="M19 12H6m0 0 5.2-5.2M6 12l5.2 5.2"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span>vsync</span>
        </Link>

        <a className="lab-bar__hello" href={`mailto:${EMAIL}`}>
          <span className="lab-bar__label">let&rsquo;s collaborate</span>
          <span className="lab-bar__email">{EMAIL}</span>
        </a>
      </header>

      <main className="lab">
        <section className="lab-hero">
          <img
            className="lab-sticker lab-sticker--star"
            src="/assets/deco/pink-star.svg"
            alt=""
            aria-hidden="true"
          />
          <img
            className="lab-sticker lab-sticker--smiley"
            src="/assets/deco/smiley-face.svg"
            alt=""
            aria-hidden="true"
          />
          <img
            className="lab-sticker lab-sticker--phone"
            src="/assets/deco/sticker-phone.svg"
            alt=""
            aria-hidden="true"
          />

          <p className="lab-eyebrow">minimal labs</p>

          <h1 className="lab-hero__title">
            a creative
            <br />
            technology studio.
          </h1>

          <p className="lab-hero__lede">
            We build premium websites, cross-platform apps, and AI-powered
            automations for businesses. We combine thoughtful design with modern
            engineering to create digital experiences that look exceptional,
            work seamlessly, and solve real problems.
          </p>
        </section>

        <section className="lab-work">
          <h2 className="lab-label">what we do</h2>

          <ul className="lab-work__list">
            {DISCIPLINES.map((item) => (
              <li className="lab-work__item" key={item.number}>
                <span className="lab-work__num">{item.number}</span>
                <h3 className="lab-work__title">{item.title}</h3>
                <p className="lab-work__text">{item.text}</p>
              </li>
            ))}
          </ul>

          <img
            className="lab-sticker lab-sticker--heart"
            src="/assets/deco/sticker-heart.svg"
            alt=""
            aria-hidden="true"
          />
        </section>

        <section className="lab-contact">
          <p className="lab-label">say hello</p>

          <h2 className="lab-contact__title">
            let&rsquo;s
            <br />
            collaborate.
          </h2>

          <a className="lab-contact__mail" href={`mailto:${EMAIL}`}>
            <span>{EMAIL}</span>
            <svg viewBox="0 0 169 10" aria-hidden="true">
              <path
                d="M1 6.56C56.4 3.06 112.2 1.2 168 1"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M32.1 8.63C68.2 6.93 104.5 6.13 140.7 6.25"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </a>
        </section>
      </main>
    </>
  );
}