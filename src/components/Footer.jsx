import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="vs-footer">
      <div className="vs-footer__inner">
        <div className="vs-footer__brand">
          <span className="vs-footer__wordmark">
            vsync
            <span className="vs-footer__dot" aria-hidden="true" />
          </span>
          <span className="vs-footer__team">minimal labs</span>
        </div>

        <nav className="vs-footer__links" aria-label="Footer">
          <Link href="/privacypolicy">privacy policy</Link>
          <Link href="/terms">terms of use</Link>
          <a href="#">minimal labs</a>
        </nav>

        <p className="vs-footer__meta">
          student-built · independent · not affiliated with VIT-AP
        </p>
      </div>
    </footer>
  );
}
