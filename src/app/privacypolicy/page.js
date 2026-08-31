import Link from "next/link";

export const metadata = {
  title: "Privacy Policy · VSync",
  description:
    "How the VSync app handles your data: fetched locally from the VTOP portal, stored only on your device, never collected.",
};

/* TODO before publishing: replace the placeholder developer name and
   contact email in section 10 with your real details. */

export default function PrivacyPolicy() {
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
          <Link className="folio-link" href="/terms">
            terms
          </Link>
        </header>

        <section className="hero">
          <p className="label">legal · effective september 2026</p>
          <h1 className="display">
            privacy
            <br />
            policy
          </h1>
          <p className="lede">
            This Privacy Policy explains how your information is collected,
            used, and protected when you use the <strong>VSync</strong> mobile
            application (&ldquo;the App&rdquo;), developed for the students of
            VIT-AP University. By using the App, you agree to the terms
            described in this policy.
          </p>
          <p className="lede">
            VSync is a local client for the VTOP portal. It fetches your
            academic data on your device and displays it on your device. There
            is no server on the other end collecting anything — the App runs
            entirely on your phone.
          </p>
        </section>

        <section
          className="plate"
          role="note"
          aria-label="Data handling summary"
        >
          <p className="plate-head">nothing leaves your device</p>
          <ul className="plate-list">
            <li>no analytics</li>
            <li>no trackers</li>
            <li>no advertising</li>
            <li>no external servers</li>
          </ul>
        </section>

        <nav className="contents" aria-label="Contents">
          <p className="label">contents</p>
          <ol>
            <li>
              <a href="#s01">
                <span className="toc-no">01</span> information we collect
              </a>
            </li>
            <li>
              <a href="#s02">
                <span className="toc-no">02</span> data usage
              </a>
            </li>
            <li>
              <a href="#s03">
                <span className="toc-no">03</span> data storage &amp; security
              </a>
            </li>
            <li>
              <a href="#s04">
                <span className="toc-no">04</span> sharing of information
              </a>
            </li>
            <li>
              <a href="#s05">
                <span className="toc-no">05</span> user responsibility
              </a>
            </li>
            <li>
              <a href="#s06">
                <span className="toc-no">06</span> data retention
              </a>
            </li>
            <li>
              <a href="#s07">
                <span className="toc-no">07</span> legal disclaimer on data
                scraping
              </a>
            </li>
            <li>
              <a href="#s08">
                <span className="toc-no">08</span> changes to this policy
              </a>
            </li>
            <li>
              <a href="#s09">
                <span className="toc-no">09</span> governing law
              </a>
            </li>
            <li>
              <a href="#s10">
                <span className="toc-no">10</span> contact information
              </a>
            </li>
          </ol>
        </nav>

        <main>
          <section className="sec" id="s01">
            <span className="numeral" aria-hidden="true">
              01
            </span>
            <p className="label">section 01</p>
            <h2>information we collect</h2>
            <div className="prose">
              <p>
                The App collects <strong>no data of any kind</strong> on our
                side. There are no analytics SDKs, no advertising SDKs, no
                trackers, and no crash-reporting services built into the App.
                The developer operates no servers, databases, or cloud storage,
                so there is nowhere for your data to be collected even if the
                App wanted to.
              </p>
            </div>
            <dl className="facts">
              <div>
                <dt>VTOP credentials</dt>
                <dd>
                  Your VTOP username and password are used to fetch your
                  academic data from the VTOP portal. They are stored only on
                  your device, in encrypted form, and are never transmitted to
                  the developer or any third party.
                </dd>
              </div>
              <div>
                <dt>Everything else</dt>
                <dd>
                  Not collected. No usage statistics, no device identifiers, no
                  location, no personal information, no anonymized telemetry of
                  any kind.
                </dd>
              </div>
            </dl>
          </section>

          <section className="sec" id="s02">
            <span className="numeral" aria-hidden="true">
              02
            </span>
            <p className="label">section 02</p>
            <h2>data usage</h2>
            <div className="prose">
              <p>
                <strong>VTOP data fetching.</strong> The App signs in to the
                VTOP portal from your device and fetches your academic
                information — attendance, marks, timetables — to display it back
                to you. This data is used exclusively for displaying your
                academic information within the App.
              </p>
              <p>
                <strong>No other processing.</strong> The App performs no
                feature-engagement analysis, no usage-pattern analysis, no
                cohort or trend analysis, and no profiling. Since no usage data
                is collected, none exists to process.
              </p>
            </div>
          </section>

          <section className="sec" id="s03">
            <span className="numeral" aria-hidden="true">
              03
            </span>
            <p className="label">section 03</p>
            <h2>data storage &amp; security</h2>
            <div className="prose">
              <p>
                <strong>Local storage.</strong> All academic data fetched by the
                App is stored locally on your device. The App does not store or
                collect this data on any external server.
              </p>
              <p>
                <strong>Encryption.</strong> Your VTOP credentials are encrypted
                using AES. The AES secret key is further encrypted with RSA and
                stored in the Android KeyStore, so your credentials remain
                protected even if the App&rsquo;s local storage is accessed by
                another app on a rooted device.
              </p>
              <p>
                <strong>No external storage.</strong> There is no server-side
                copy of your data anywhere, because there is no server.
              </p>
            </div>
          </section>

          <section className="sec" id="s04">
            <span className="numeral" aria-hidden="true">
              04
            </span>
            <p className="label">section 04</p>
            <h2>sharing of information</h2>
            <div className="prose">
              <p>
                <strong>No third-party sharing.</strong> We do not share any
                personal information with third parties. There is no exception
                to this — the App includes no analytics providers, no
                advertising networks, and no third-party services that receive
                your data.
              </p>
              <p>
                <strong>No sub-processors.</strong> Because the App collects
                nothing and runs entirely on your device, there are no
                intermediaries processing your information at any point.
              </p>
            </div>
          </section>
          <section className="sec" id="s05">
            <span className="numeral" aria-hidden="true">
              05
            </span>
            <p className="label">section 05</p>
            <h2>user responsibility</h2>
            <div className="prose">
              <p>
                You are solely responsible for safeguarding your VTOP
                credentials. The App does not share or distribute these
                credentials. If you share your credentials with others and
                unauthorized access occurs, the App is not responsible for any
                misuse of your account.
              </p>
            </div>
          </section>

          <section className="sec" id="s06">
            <span className="numeral" aria-hidden="true">
              06
            </span>
            <p className="label">section 06</p>
            <h2>data retention</h2>
            <div className="prose">
              <p>
                <strong>VTOP data.</strong> Academic data is stored locally on
                your device and is not retained by the developer. If you delete
                the App, all locally stored data is removed with it.
              </p>
              <p>
                <strong>Analytics data.</strong> None exists. The App collects
                no usage or analytics data, so there is nothing to retain and
                nothing to delete on any retention schedule.
              </p>
            </div>
          </section>

          <section className="sec" id="s07">
            <span className="numeral" aria-hidden="true">
              07
            </span>
            <p className="label">section 07</p>
            <h2>legal disclaimer on data scraping</h2>
            <div className="prose">
              <p>
                The App fetches academic data from the VTOP portal using
                scraping methods, performed locally on your device. By using the
                App, you agree to have your data fetched from VTOP for your
                convenience. The responsibility for using this method lies
                solely with you, the user. Any issues regarding the legality of
                VTOP&rsquo;s data usage must be addressed with VIT-AP University
                administration.
              </p>
            </div>
          </section>

          <section className="sec" id="s08">
            <span className="numeral" aria-hidden="true">
              08
            </span>
            <p className="label">section 08</p>
            <h2>changes to this policy</h2>
            <div className="prose">
              <p>
                We reserve the right to make changes to this Privacy Policy at
                any time. Any updates will be communicated through in-app
                notifications or by updating this page. Continued use of the App
                following any modifications indicates your acceptance of the
                revised policy.
              </p>
            </div>
          </section>

          <section className="sec" id="s09">
            <span className="numeral" aria-hidden="true">
              09
            </span>
            <p className="label">section 09</p>
            <h2>governing law</h2>
            <div className="prose">
              <p>
                This Privacy Policy is governed by the laws of the Republic of
                India. Any disputes arising from the use of the App will be
                addressed in accordance with Indian law.
              </p>
            </div>
          </section>

          <section className="sec" id="s10">
            <span className="numeral" aria-hidden="true">
              10
            </span>
            <p className="label">section 10</p>
            <h2>contact information</h2>
            <div className="prose">
              <p>
                For any questions or concerns regarding this Privacy Policy,
                please contact the developer:
              </p>
              <p>
                <strong>Developer, VSync</strong>
                <br />

                <a href="mailto:minimallabs.dev@gmail.com">
                  minimallabs.dev@gmail.com
                </a>
              </p>
            </div>
          </section>
        </main>

        <footer className="footer">
          <span className="label">vsync · privacy policy</span>
          <span className="label">
            governed by the laws of the republic of india
          </span>
        </footer>
      </div>
    </div>
  );
}
