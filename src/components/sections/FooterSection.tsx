import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  footerExploreLinks,
  footerSocialLinks,
  siteConfig,
} from "@/data/site";

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <div className="footer-endcap">
      <div className="footer-endcap__atmosphere pointer-events-none absolute inset-0" aria-hidden>
        <div className="footer-endcap__mesh absolute inset-0" />
        <div className="footer-endcap__glow absolute inset-0" />
      </div>

      <div className="footer-endcap__divider" aria-hidden />

      <footer className="footer-site relative z-[1]">
        <Container className="footer-site__container">
          <div className="footer-site__top">
            <div className="footer-site__brand">
              <Link href="/" className="footer-site__logo focus-ring">
                {siteConfig.name}
              </Link>
              <p className="footer-site__tagline">{siteConfig.tagline}</p>
              <p className="footer-site__blurb">{siteConfig.description}</p>
              <div className="footer-site__signal" aria-hidden>
                <span className="footer-site__signal-dot" />
                <span>Channel open · Spring &apos;26 drop live</span>
              </div>
            </div>

            <nav className="footer-site__nav" aria-label="Explore">
              <p className="footer-site__nav-label">Explore</p>
              <ul className="footer-site__nav-list">
                {footerExploreLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-site__nav-link focus-ring">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="footer-site__connect">
              <p className="footer-site__nav-label">Connect</p>
              <ul className="footer-site__nav-list">
                {footerSocialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="footer-site__nav-link focus-ring"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#shop" className="footer-site__cta focus-ring">
                Shop all sneakers
                <span className="footer-site__cta-arrow" aria-hidden>
                  →
                </span>
              </a>
            </div>
          </div>

          <div className="footer-site__bar">
            <p className="footer-site__copy">
              © {year} {siteConfig.name}. Built for the street.
            </p>
            <p className="footer-site__meta">
              <span>48hr ship</span>
              <span aria-hidden>·</span>
              <span>2yr warranty</span>
            </p>
            <a href="#hero" className="footer-site__toplink focus-ring">
              Back to top
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M7 11V3M4 6l3-3 3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </Container>
      </footer>
    </div>
  );
}
