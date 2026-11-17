import { ArrowUpRight, Check, ChevronRight, Gamepad2, Mail, ShieldCheck, Trophy, Users, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import Countdown from "@/components/Countdown";
import AccordionItem from "@/components/AccordionItem";
import SectionHeading from "@/components/SectionHeading";
import SiteHeader from "@/components/SiteHeader";

const paymentGateway = "https://payments.cashfree.com/forms/campusbattlearena";
const organiserEmail = "lyroweb.solution@gmail.com";

const games = [
  { number: "01", title: "BGMI", subtitle: "Battlegrounds Mobile India", icon: "▣", tone: "cyan" },
  { number: "02", title: "Free Fire / Free Fire MAX", subtitle: "Garena", icon: "✦", tone: "orange" },
  { number: "03", title: "Formula racing", subtitle: "Racing title to be announced", icon: "◒", tone: "lime" },
];

const updates = [
  { label: "Notice 1", date: "11/11/2026", text: "This battle happen only if our previous CBA event succeed." },
  { label: "Notice 2", date: "11/11/2026", text: "This battle happen on somewhere in March 2027" },
];

const rules = [
  { title: "General rules", content: <>Complete the official registration and give accurate information.<br />Follow the published schedule and instructions from administrators.<br />Cheating, unfair gameplay, match manipulation and deliberate disruption are prohibited.<br />Be respectful to players and organisers. Violations can lead to warnings, disqualification or other proportionate action.</> },
  { title: "Registration", content: <>Format, schedule, venue (if any), registration, entry fees and participation guidelines will be announced on official GBA channels.</> },
  { title: "Fair play", content: <>Play fairly, follow administrator instructions, and respect every competitor. Any form of cheating, unfair gameplay, match manipulation or deliberate disruption is prohibited.</> },
  { title: "Match rules and disqualification", content: <>Violations can lead to warnings, disqualification or other proportionate action. The final list of games depends on participant interest, tournament arrangements and publisher policies.</> },
];

const faqs = [
  ["What is Gaming Battle Arena?", "Gaming Battle Arena is an independent competition platform for gaming enthusiasts, technology learners and competitive players. We run organised online and offline events, from tech contests to esports tournaments."],
  ["Which games are included?", "BGMI, Free Fire and Formula racing may feature in March 2027. The final list depends on participant interest, tournament arrangements and publisher policies."],
  ["Is it online or offline?", "The format is not final. It may be online, offline or hybrid."],
  ["How do I register?", "Details will be published here when registration opens. Any fee will be shown before you pay."],
  ["Will there be prizes? Cash?", "We reward top performances with non-cash rewards including Amazon, Flipkart and PVR INOX vouchers, gaming accessories and special recognition awards."],
  ["How do winners get rewards?", "First, second, third and special prizes will be announced separately for each tournament."],
  ["Can I play with friends?", "Team formats and participation guidelines will be announced on official GBA channels."],
  ["What if an event is cancelled?", "The Refund & Cancellation Policy applies."],
];

function RegistrationDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    try { localStorage.setItem("gba-registration-draft", JSON.stringify({ ...data, consentAt: new Date().toISOString() })); } catch { /* storage is optional */ }
    setMessage("Details saved. Redirecting you to the secure payment page…");
    window.setTimeout(() => { window.location.href = paymentGateway; }, 850);
  };
  if (!open) return null;
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="registration-dialog" role="dialog" aria-modal="true" aria-labelledby="register-title">
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Close registration dialog"><X size={20} /></button>
        <p className="eyebrow">ENTER THE ARENA</p>
        <h2 id="register-title">Register for Gaming Battle Arena</h2>
        <p className="dialog-copy">Save your details before continuing to the secure payment page.</p>
        <form onSubmit={submit} noValidate>
          <label htmlFor="registration-name">Full name</label>
          <input id="registration-name" name="name" required autoComplete="name" />
          <div className="form-grid">
            <div><label htmlFor="registration-email">Email</label><input id="registration-email" name="email" type="email" required autoComplete="email" /></div>
            <div><label htmlFor="registration-phone">Phone</label><input id="registration-phone" name="phone" type="tel" required autoComplete="tel" /></div>
          </div>
          <label htmlFor="registration-college">College</label>
          <input id="registration-college" name="college" required />
          <label className="consent"><input name="consent" type="checkbox" required /><span>I am 18 or older and agree to the <a href="#policies" onClick={onClose}>Terms</a>, <a href="#policies" onClick={onClose}>Privacy Policy</a> and <a href="#policies" onClick={onClose}>Refund Policy</a>. My data is used only to run this event and is never sold.</span></label>
          {message && <div className="form-message" role="status">{message}</div>}
          <div className="dialog-actions"><button className="button button--lime" type="submit">Continue to payment <ArrowUpRight size={16} /></button><button className="button button--ghost" type="button" onClick={onClose}>Cancel</button></div>
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState("");

  useEffect(() => {
    const reveal = () => document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.88) element.classList.add("is-visible");
    });
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(form).entries());
    setContactStatus("Thanks — your message is ready to send.");
    const body = `Full name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
    window.setTimeout(() => { window.location.href = `mailto:${organiserEmail}?subject=${encodeURIComponent(String(data.subject))}&body=${encodeURIComponent(body)}`; }, 450);
  };

  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="hero section-grid" id="top">
          <div className="hero-copy reveal is-visible">
            <p className="eyebrow hero-kicker"><span className="pulse-dot" /> Gaming Battle Arena · 2027 edition</p>
            <h1>Gaming<br /><span>Championship</span><br />2027</h1>
            <p className="hero-lede">BGMI, Free Fire and more. Compete with other players, show your skills and win shopping and movie vouchers. Proposed for March 2027.</p>
            <div className="hero-actions"><a className="button button--lime" href={`mailto:${organiserEmail}?subject=GBA%20Event%20Updates`}>Get event updates <ArrowUpRight size={16} /></a><button className="button button--outline" type="button" onClick={() => setRegistrationOpen(true)}>Register now <ChevronRight size={16} /></button></div>
            <div className="hero-note"><span className="note-line" /> <span>Open registration details before payment</span></div>
          </div>
          <div className="hero-visual reveal is-visible">
            <div className="arena-orbit orbit-one" /><div className="arena-orbit orbit-two" />
            <div className="hero-emblem"><Gamepad2 size={60} strokeWidth={1.2} /><span>GBA</span><small>PLAY / COMPETE / REPEAT</small></div>
            <div className="hero-stat-card"><span>DAYS UNTIL MARCH 2027</span><Countdown /><div className="stat-row"><span>Format</span><strong>Online or hybrid</strong></div><div className="stat-row"><span>Rewards</span><strong>Vouchers & gear</strong></div><div className="stat-row"><span>Edition</span><strong>March 2027</strong></div></div>
            <div className="hero-corner hero-corner--top">GBA // 001</div><div className="hero-corner hero-corner--bottom">SKILL IS THE DIFFERENCE</div>
          </div>
        </section>

        <div className="ticker" aria-label="Event highlights"><div className="ticker-track"><span>BGMI</span><i>✦</i><span>FREE FIRE</span><i>✦</i><span>FORMULA RACING</span><i>✦</i><span>VOUCHERS &amp; REWARDS</span><i>✦</i><span>MARCH 2027</span><i>✦</i><span>BGMI</span><i>✦</i><span>FREE FIRE</span><i>✦</i><span>FORMULA RACING</span></div></div>

        <section className="content-section section-grid" id="about"><SectionHeading number="01" eyebrow="THE ARENA" title="About GBA" copy="A clear place to compete, learn and earn recognition." /><div className="about-grid reveal"><article className="story-card story-card--accent"><span className="card-label">Who we are</span><h3>Gaming Battle Arena is an independent competition platform for gaming enthusiasts, technology learners and competitive players.</h3><p>We run organised online and offline events, from tech contests to esports tournaments.</p><span className="card-mark">GBA / 2027</span></article><article className="story-card"><span className="card-label">Our mission</span><h3>An accessible, transparent and competitive place where participants show their skills, compete with others and earn recognition and rewards.</h3><div className="mission-bar"><span /><span /><span /><span /><span /></div></article></div></section>

        <section className="content-section section-grid section-event" id="event"><SectionHeading number="02" eyebrow="THE EVENT" title="Gaming Championship 2027" copy="The details are proposed now and will be announced on official GBA channels." /><div className="event-board reveal"><div className="event-date"><span className="board-label">DATE</span><strong>March<br />2027</strong><small>proposed</small></div><div className="event-details"><div><span>Format</span><strong>Online or hybrid. To be announced.</strong></div><div><span>Registration</span><strong>To be announced. Any fee will be shown before you pay.</strong></div><div><span>Official notice</span><strong>Format, schedule, venue (if any), registration, entry fees and participation guidelines will be announced on official GBA channels.</strong></div></div><div className="event-stamp"><span>READY</span><strong>?</strong><small>YOUR MOVE</small></div></div></section>

        <section className="content-section section-grid" id="games"><SectionHeading number="03" eyebrow="THE LINEUP" title="Choose your game" copy="The final list depends on participant interest, tournament arrangements and publisher policies." /><div className="card-grid games-grid reveal">{games.map((game) => <article className={`game-card game-card--${game.tone}`} key={game.title}><div className="card-topline"><span>{game.number}</span><span>{game.icon}</span></div><div className="game-icon">{game.icon}</div><h3>{game.title}</h3><p>{game.subtitle}</p><a href="#event" className="card-link">View event details <ArrowUpRight size={15} /></a></article>)}</div></section>

        <section className="content-section section-grid" id="prizes"><SectionHeading number="04" eyebrow="RECOGNITION" title="Prizes & rewards" copy="We reward top performances with non-cash rewards." /><div className="prize-layout reveal"><div className="prize-intro"><Trophy size={32} /><h3>Show up. Stand out.<br />Get recognised.</h3><p>First, second, third and special prizes will be announced separately for each tournament.</p></div><div className="prize-list"><div><span>01</span><strong>Vouchers</strong><p>Amazon, Flipkart and PVR INOX vouchers</p></div><div><span>02</span><strong>Gear</strong><p>Gaming accessories</p></div><div><span>03</span><strong>Recognition</strong><p>Special recognition awards</p></div></div></div></section>

        <section className="content-section section-grid" id="rules"><SectionHeading number="05" eyebrow="PLAY FAIR" title="Rules & guidelines" copy="Know the format, follow the instructions, and respect the arena." /><div className="accordion-list reveal">{rules.map((rule, index) => <AccordionItem key={rule.title} title={`${String(index + 1).padStart(2, "0")} / ${rule.title}`} defaultOpen={index === 0}>{rule.content}</AccordionItem>)}</div></section>

        <section className="content-section section-grid" id="supporters"><SectionHeading number="06" eyebrow="BACK THE ARENA" title="Supporters & partners" copy="Organisations, brands and individuals can support GBA through sponsorship, prizes, vouchers, technology, media or community partnerships." /><div className="supporter-banner reveal"><div><span className="card-label">GBA partnership desk</span><h3>Help build the next matchday.</h3><p>Logos appear only after permission and confirmation.</p></div><a className="button button--outline" href="/supporters">Meet the people behind GBA <ArrowUpRight size={16} /></a></div><div className="supporter-strip reveal"><span>LyroWeb Solution</span><span>ACAT</span><span>MENTORS</span><span>JUDGES</span><span>PRIZE PARTNERS</span></div></section>

        <section className="content-section section-grid" id="faq"><SectionHeading number="07" eyebrow="HELP CENTRE" title="FAQs" copy="For more detailed questions and alerts mail us at lyroweb.solution@gmail.com." /><div className="faq-layout reveal"><div className="faq-aside"><Mail size={22} /><p>Can't find your answer?</p><a href={`mailto:${organiserEmail}`}>Write to us <ArrowUpRight size={15} /></a></div><div className="accordion-list">{faqs.map(([question, answer], index) => <AccordionItem key={question} title={`${String(index + 1).padStart(2, "0")} / ${question}`}>{answer}</AccordionItem>)}</div></div></section>

        <section className="content-section section-grid" id="policies"><SectionHeading number="08" eyebrow="READ BEFORE YOU PLAY" title="Policies" copy="Last updated: 11/11/2026. By using this site or registering, you agree to the applicable terms." /><div className="policy-grid reveal"><AccordionItem title="Terms & Conditions" defaultOpen><p>Participation is subject to the published rules, official schedule, eligibility requirements and applicable laws.</p></AccordionItem><AccordionItem title="Privacy Policy"><p>We collect details needed to run the event and communicate with participants. We never collect card numbers, UPI PINs, passwords or banking credentials through registration forms.</p></AccordionItem><AccordionItem title="Refund & Cancellation Policy"><p>Payments go through a payment provider. Any refund or cancellation terms will be announced with the registration details.</p></AccordionItem><AccordionItem title="Delivery Policy"><p>Rewards are mainly digital vouchers, sent to your registered email or another verified channel announced by GBA.</p></AccordionItem><AccordionItem title="Code of Conduct"><ul><li>Respect players and administrators.</li><li>No abusive or discriminatory language, harassment or intimidation.</li><li>Play fair and follow official instructions.</li><li>Do not share another participant’s private information.</li><li>Raise disputes respectfully.</li></ul></AccordionItem><AccordionItem title="Disclaimer"><p>GBA is an independent event initiative. It is not affiliated with, endorsed by or sponsored by Krafton, Garena, Amazon, Flipkart, PVR INOX or other mentioned companies unless an official partnership is announced. All game names and trademarks belong to their owners. Participation is subject to applicable laws, publisher policies and event eligibility requirements.</p></AccordionItem></div></section>

        <section className="content-section section-grid" id="updates"><SectionHeading number="09" eyebrow="UPDATES & NOTICES" title="Stay in the loop" copy="Here you get notified about this event. For more detailed questions and alerts mail us." /><div className="updates-grid reveal">{updates.map((update) => <article className="update-card" key={update.label}><div><span>{update.label}</span><small>{update.date}</small></div><p>{update.text}</p><Check size={18} /></article>)}</div><a className="button button--lime updates-cta" href={`mailto:${organiserEmail}?subject=GBA%20Event%20Updates`}>Get Notified <ArrowUpRight size={16} /></a></section>

        <section className="content-section section-grid contact-section" id="contact"><SectionHeading number="10" eyebrow="CONTACT" title="Write to the organisers" copy="For registration, event information, partnerships or support, write to lyroweb.solution@gmail.com or use the form." /><div className="contact-grid reveal"><div className="contact-card"><span className="card-label">Direct line</span><a className="contact-email" href={`mailto:${organiserEmail}`}>{organiserEmail}</a><p>We reply with the latest official information about registration, event format, partnerships and support.</p><div className="contact-meta"><span><ShieldCheck size={15} />Secure payment handoff</span><span><Users size={15} />Community-first event</span></div></div><form className="contact-form" onSubmit={submitContact}><div className="form-grid"><div><label htmlFor="contact-name">Full name</label><input id="contact-name" name="name" type="text" required /></div><div><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" required /></div></div><label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" type="text" required /><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows={5} required /><button className="button button--lime" type="submit">Submit message <ArrowUpRight size={16} /></button>{contactStatus && <div className="form-message" role="status">{contactStatus}</div>}</form></div></section>
      </main>
      <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><span className="brand-mark" aria-hidden="true"><span>G</span><span>B</span><span>A</span></span><div><strong>Gaming Battle Arena</strong><p>An independent event initiative.<br />Game names and trademarks belong to their owners.</p></div></div><a className="button button--outline" href={`mailto:${organiserEmail}?subject=Supporting%20Gaming%20Battle%20Arena`}>Become a supporter <ArrowUpRight size={16} /></a></div><div className="footer-bottom"><span>© 2027 Gaming Battle Arena (GBA). Organised by LyroWeb Solutions.</span><nav><a href="#policies">Terms</a><a href="#policies">Privacy</a><a href="#policies">Refund</a><a href="#policies">Delivery</a><a href="#contact">Contact</a><a href="/supporters">Supporters</a><a href={`mailto:${organiserEmail}`}>Mail Us</a></nav></div></footer>
      <RegistrationDialog open={registrationOpen} onClose={() => setRegistrationOpen(false)} />
    </div>
  );
}
