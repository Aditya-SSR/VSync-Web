import Link from "next/link";

export const metadata = {
  title: "Terms of Use · VSync",
  description:
    "Terms of use for the VSync app: a local client for the VTOP portal. No servers, no tracking, everything happens on your device.",
};

export default function Terms() {
  return (
    <div className="page">
      <div className="sheet">
        <header className="folio">
          <span className="brand">
            <span className="wordmark">
              vsync
              <span className="period" aria-hidden="true" />
            </span>
            <span className="team">minimal labs</span>
          </span>
          <Link className="folio-link" href="/privacypolicy">
            privacy policy
          </Link>
        </header>

        <section className="hero">
          <p className="label">legal · effective september 2026</p>
          <h1 className="display">
            terms
            <br />
            of use
          </h1>
          <p className="lede">
            VSync is a local client for your college portal. We do not collect,
            store, or transmit any of your data to our servers —{" "}
            <strong>everything happens on your device.</strong>
          </p>
        </section>

        <section className="plate" role="note" aria-label="Summary">
          <p className="plate-head">everything happens on your device</p>
          <ul className="plate-list">
            <li>no ads</li>
            <li>no trackers</li>
            <li>no analytics</li>
            <li>no servers</li>
          </ul>
        </section>

        <nav className="contents" aria-label="Contents">
          <p className="label">contents</p>
          <ol>
            <li><a href="#t01"><span className="toc-no">01</span> the short version</a></li>
            <li><a href="#t02"><span className="toc-no">02</span> your VTOP credentials</a></li>
            <li><a href="#t03"><span className="toc-no">03</span> how data is fetched &amp; stored</a></li>
            <li><a href="#t04"><span className="toc-no">04</span> permissions</a></li>
            <li><a href="#t05"><span className="toc-no">05</span> no ads, no trackers</a></li>
            <li><a href="#t06"><span className="toc-no">06</span> disclaimer &amp; no affiliation</a></li>
            <li><a href="#t07"><span className="toc-no">07</span> data deletion</a></li>
          </ol>
        </nav>

        <main>
          <section className="sec" id="t01">
            <span className="numeral" aria-hidden="true">01</span>
            <p className="label">section 01</p>
            <h2>the short version</h2>
            <div className="prose">
              <p>
                VSync is a local client for your college portal. We do not
                collect, store, or transmit any of your data to our servers —
                everything happens on your device.
              </p>
              <p>
                VSync has <strong>no backend servers</strong>. We do not
                collect, transmit, sell, or share any personal information,
                analytics, or usage data of any kind.
              </p>
            </div>
          </section>

          <section className="sec" id="t02">
            <span className="numeral" aria-hidden="true">02</span>
            <p className="label">section 02</p>
            <h2>your VTOP credentials</h2>
            <div className="prose">
              <p>
                Your VTOP credentials (registration number and password) are
                entered by you, stay on your device, and are used solely to log
                in to the official VTOP portal. They are{" "}
                <strong>never sent anywhere else</strong>.
              </p>
            </div>
          </section>

          <section className="sec" id="t03">
            <span className="numeral" aria-hidden="true">03</span>
            <p className="label">section 03</p>
            <h2>how data is fetched &amp; stored</h2>
            <div className="prose">
              <p>
                All data shown in the app — timetable, attendance, marks, and
                more — is fetched by a scraper that runs{" "}
                <strong>entirely on your device</strong>. The app requests
                pages from the VTOP portal directly, on your behalf, exactly as
                your browser would.
              </p>
              <p>
                Fetched data is stored only in your device&rsquo;s local
                database and is never uploaded to us or any third party.
              </p>
            </div>
          </section>

          <section className="sec" id="t04">
            <span className="numeral" aria-hidden="true">04</span>
            <p className="label">section 04</p>
            <h2>permissions</h2>
            <dl className="facts">
              <div>
                <dt>Internet</dt>
                <dd>Required to reach the VTOP portal.</dd>
              </div>
              <div>
                <dt>Notifications</dt>
                <dd>
                  Used for local class reminders generated on your device.
                </dd>
              </div>
              <div>
                <dt>Storage</dt>
                <dd>
                  Used only when you explicitly export or share a file (e.g. a
                  timetable or document).
                </dd>
              </div>
            </dl>
          </section>
          <section className="sec" id="t05">
            <span className="numeral" aria-hidden="true">05</span>
            <p className="label">section 05</p>
            <h2>no ads, no trackers</h2>
            <div className="prose">
              <p>
                VSync contains <strong>no advertising SDKs, trackers, or
                third-party analytics</strong>. The only network traffic the
                app makes is to the VTOP portal itself.
              </p>
            </div>
          </section>

          <section className="sec" id="t06">
            <span className="numeral" aria-hidden="true">06</span>
            <p className="label">section 06</p>
            <h2>disclaimer &amp; no affiliation</h2>
            <div className="prose">
              <p>
                VSync is an <strong>independent, unofficial app</strong> and is
                not affiliated with, endorsed by, or connected to VIT or the
                VTOP portal in any way.
              </p>
              <p>
                The app is provided &ldquo;as is&rdquo;, without warranties of
                any kind. You are responsible for using it in accordance with
                your institution&rsquo;s policies and for keeping your
                credentials safe.
              </p>
            </div>
          </section>

          <section className="sec" id="t07">
            <span className="numeral" aria-hidden="true">07</span>
            <p className="label">section 07</p>
            <h2>data deletion</h2>
            <div className="prose">
              <p>
                Since all data lives on your device, uninstalling the app (or
                using its sign-out / clear-data options){" "}
                <strong>permanently removes everything</strong>. There is
                nothing to request a deletion of on our side.
              </p>
            </div>
          </section>
        </main>

        <footer className="footer">
          <span className="label">vsync · terms of use</span>
          <span className="label">minimal labs</span>
        </footer>
      </div>
    </div>
  );
}
