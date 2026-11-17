import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const links = [
  ["About", "#about"],
  ["Event", "#event"],
  ["Games", "#games"],
  ["Prizes", "#prizes"],
  ["Rules", "#rules"],
  ["Supporters", "/supporters"],
  ["FAQs", "#faq"],
  ["Policies", "#policies"],
  ["Contact", "#contact"],
] as const;

export default function SiteHeader({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const resolveHref = (href: string) => href.startsWith("/") || window.location.pathname === "/" ? href : `/${href}`;

  return (
    <header className={`site-header ${compact ? "site-header--compact" : ""}`}>
      <div className="header-inner">
        <Link href="/" className="brand-lockup" onClick={close} aria-label="Gaming Battle Arena home">
          <span className="brand-mark" aria-hidden="true"><span>G</span><span>B</span><span>A</span></span>
          <span className="brand-name"><strong>Gaming Battle</strong><em>Arena</em></span>
        </Link>
        <nav className={`desktop-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
          {links.map(([label, href], index) => resolveHref(href).startsWith("/") && !resolveHref(href).startsWith("/#") ? (
            <Link key={label} href={href} onClick={close}><span>{String(index + 1).padStart(2, "0")}</span>{label}</Link>
          ) : (
            <a key={label} href={resolveHref(href)} onClick={close}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="text-link" href="mailto:lyroweb.solution@gmail.com?subject=GBA%20Event%20Updates">Get updates <span>↗</span></a>
          <button className="menu-toggle" type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <div id="mobile-nav" className={`mobile-nav ${open ? "open" : ""}`}>
        {links.map(([label, href], index) => resolveHref(href).startsWith("/") && !resolveHref(href).startsWith("/#") ? (
          <Link key={label} href={href} onClick={close}><span>{String(index + 1).padStart(2, "0")}</span>{label}</Link>
        ) : (
          <a key={label} href={resolveHref(href)} onClick={close}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>
        ))}
        <a className="button button--lime mobile-cta" href="mailto:lyroweb.solution@gmail.com?subject=GBA%20Event%20Updates" onClick={close}>Get event updates <span>↗</span></a>
      </div>
    </header>
  );
}
