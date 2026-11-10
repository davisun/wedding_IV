import { useEffect, useState, useCallback } from 'react'
import config from './config.js'

const c = config
const names = `${c.partner1} & ${c.partner2}`

/* ── Reveal-on-scroll wrapper ─────────────────────────── */
function Reveal({ children, className = '', as: Tag = 'div' }) {
  const [el, setEl] = useState(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [el])
  return (
    <Tag ref={setEl} className={`reveal ${shown ? 'in' : ''} ${className}`}>
      {children}
    </Tag>
  )
}

/* ── Nav ───────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const links = ['Story', 'Details', 'Gallery', 'RSVP']
  return (
    <nav className={`nav ${scrolled ? 'solid' : ''} ${open ? 'open' : ''}`}>
      <a href="#top" className="nav-logo">
        {c.partner1[0]}&nbsp;&amp;&nbsp;{c.partner2[0]}
      </a>
      <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen(!open)}>
        <span /><span />
      </button>
      <ul>
        {links.map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* ── Hero ──────────────────────────────────────────────── */
function Hero() {
  return (
    <header id="top" className="hero" style={{ backgroundImage: `url(${c.heroImage})` }}>
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow">Together with their families</p>
        <h1>
          {c.partner1}
          <span className="amp">&amp;</span>
          {c.partner2}
        </h1>
        <p className="hero-sub">invite you to celebrate their wedding</p>
        <div className="hero-date">
          <span>{c.dateText}</span>
          <i />
          <span>{c.location}</span>
        </div>
        <a href="#rsvp" className="btn btn-light">RSVP</a>
      </div>
      <a href="#countdown" className="scroll-cue" aria-label="Scroll down" />
    </header>
  )
}

/* ── Countdown ─────────────────────────────────────────── */
function Countdown() {
  const target = new Date(c.date).getTime()
  const calc = () => Math.max(0, target - Date.now())
  const [ms, setMs] = useState(calc)
  useEffect(() => {
    const t = setInterval(() => setMs(calc()), 1000)
    return () => clearInterval(t)
  }, [])
  const units = [
    ['Days', Math.floor(ms / 864e5)],
    ['Hours', Math.floor(ms / 36e5) % 24],
    ['Minutes', Math.floor(ms / 6e4) % 60],
    ['Seconds', Math.floor(ms / 1e3) % 60],
  ]
  return (
    <section id="countdown" className="countdown">
      <Reveal>
        <p className="eyebrow">{ms > 0 ? 'Counting down to forever' : 'We’re married!'}</p>
        <div className="count-grid">
          {units.map(([label, v]) => (
            <div key={label} className="count-cell">
              <span className="count-num">{String(v).padStart(2, '0')}</span>
              <span className="count-label">{label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/* ── Story ─────────────────────────────────────────────── */
function Story() {
  return (
    <section id="story" className="section story">
      <Reveal className="story-images">
        {c.story.images.map((src, i) => (
          <img key={src} src={src} alt="" loading="lazy" className={`story-img s${i}`} />
        ))}
      </Reveal>
      <Reveal className="story-text">
        <p className="eyebrow">How it began</p>
        <h2>{c.story.title}</h2>
        {c.story.text.map((p, i) => <p key={i}>{p}</p>)}
        <p className="signature">— {names}</p>
      </Reveal>
    </section>
  )
}

/* ── Details ───────────────────────────────────────────── */
function Details() {
  return (
    <section id="details" className="section details">
      <Reveal className="section-head">
        <p className="eyebrow">{c.dateText}</p>
        <h2>The Celebration</h2>
      </Reveal>
      <div className="event-grid">
        {c.events.map((e) => (
          <Reveal key={e.title} className="event-card">
            <h3>{e.title}</h3>
            <p className="event-time">{e.time}</p>
            <div className="divider" />
            <p className="event-venue">{e.venue}</p>
            <p className="event-addr">{e.address}</p>
            {e.mapUrl && (
              <a className="link" href={e.mapUrl} target="_blank" rel="noreferrer">
                View map →
              </a>
            )}
          </Reveal>
        ))}
      </div>
      {c.dressCode && (
        <Reveal className="dress">
          <span className="eyebrow">Dress code</span>
          <p>{c.dressCode}</p>
        </Reveal>
      )}
    </section>
  )
}

/* ── Gallery + Lightbox ────────────────────────────────── */
function Gallery() {
  const [idx, setIdx] = useState(null)
  const n = c.gallery.length
  const close = () => setIdx(null)
  const step = useCallback((d) => setIdx((i) => (i + d + n) % n), [n])

  useEffect(() => {
    if (idx === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [idx, step])

  return (
    <section id="gallery" className="section gallery">
      <Reveal className="section-head">
        <p className="eyebrow">Moments</p>
        <h2>Our Gallery</h2>
      </Reveal>
      <div className="masonry">
        {c.gallery.map((img, i) => (
          <Reveal key={img.src + i} className="tile">
            <button onClick={() => setIdx(i)} aria-label={img.caption || `Open photo ${i + 1}`}>
              <img src={img.src} alt={img.caption || ''} loading="lazy" />
              {img.caption && <span className="tile-cap">{img.caption}</span>}
            </button>
          </Reveal>
        ))}
      </div>

      {idx !== null && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lb-close" onClick={close} aria-label="Close">×</button>
          <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous">‹</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={c.gallery[idx].src} alt={c.gallery[idx].caption || ''} />
            <figcaption>
              {c.gallery[idx].caption && <span>{c.gallery[idx].caption}</span>}
              <span className="lb-count">{idx + 1} / {n}</span>
            </figcaption>
          </figure>
          <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next">›</button>
        </div>
      )}
    </section>
  )
}

/* ── RSVP ──────────────────────────────────────────────── */
function RSVP() {
  const [form, setForm] = useState({ name: '', attending: 'yes', guests: '1', message: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const body = [
      `Name: ${form.name}`,
      `Attending: ${form.attending === 'yes' ? 'Joyfully accepts' : 'Regretfully declines'}`,
      form.attending === 'yes' ? `Guests: ${form.guests}` : '',
      form.message ? `\nMessage: ${form.message}` : '',
    ].filter(Boolean).join('\n')
    window.location.href = `mailto:${c.rsvp.email}?subject=${encodeURIComponent(
      `RSVP — ${form.name}`
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="rsvp" className="section rsvp">
      <Reveal className="rsvp-card">
        <p className="eyebrow">Kindly reply by {c.rsvp.deadline}</p>
        <h2>RSVP</h2>
        {sent ? (
          <div className="thanks">
            <p>Thank you, {form.name.split(' ')[0]}!</p>
            <span>
              {form.attending === 'yes'
                ? 'We can’t wait to celebrate with you.'
                : 'You’ll be missed — thank you for letting us know.'}
            </span>
          </div>
        ) : (
          <form onSubmit={submit}>
            <label>
              Full name
              <input required value={form.name} onChange={set('name')} placeholder="Your name" />
            </label>
            <div className="choice">
              {[['yes', 'Joyfully accepts'], ['no', 'Regretfully declines']].map(([v, l]) => (
                <label key={v} className={form.attending === v ? 'active' : ''}>
                  <input type="radio" name="attending" value={v} checked={form.attending === v} onChange={set('attending')} />
                  {l}
                </label>
              ))}
            </div>
            {form.attending === 'yes' && (
              <label>
                Number of guests
                <select value={form.guests} onChange={set('guests')}>
                  {[1, 2, 3, 4].map((g) => <option key={g}>{g}</option>)}
                </select>
              </label>
            )}
            <label>
              A note for the couple <em>(optional)</em>
              <textarea rows="3" value={form.message} onChange={set('message')} placeholder="Wishes, song requests, dietary needs…" />
            </label>
            <button className="btn btn-dark" type="submit">Send RSVP</button>
          </form>
        )}
      </Reveal>
    </section>
  )
}

/* ── App ───────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <Countdown />
        <Story />
        <Details />
        <Gallery />
        <RSVP />
      </main>
      <footer className="footer">
        <p className="footer-names">{names}</p>
        <p>{c.dateText} · {c.location}</p>
        {c.hashtag && <p className="hashtag">{c.hashtag}</p>}
      </footer>
    </>
  )
}
