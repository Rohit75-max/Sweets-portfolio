import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Star, Mail, MapPin, Phone, Instagram, Facebook, Twitter, Menu, X, Send, CheckCircle, ChevronDown, Activity, Globe, Clock, Box } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RollingText = ({ text, className, style }) => {
  const letters = text.split("");

  return (
    <motion.span
      style={{
        display: "inline-flex",
        whiteSpace: "nowrap",
        letterSpacing: "-0.04em",
        ...style
      }}
      className={className}
    >
      {letters.map((letter, index) => (
        <div key={index} style={{
          position: "relative",
          overflow: "hidden",
          display: "inline-block",
          verticalAlign: "top",
          padding: "0.2em 0",
          marginTop: "-0.2em",
          marginRight: index === letters.length - 1 ? 0 : "-0.02em"
        }}>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 0.8,
              ease: [0.19, 1, 0.22, 1]
            }}
            whileHover={{ x: "-100%" }}
            style={{ position: "relative", display: "flex" }}
          >
            <span style={{ display: "block" }}>{letter === " " ? "\u00A0" : letter}</span>
            <span style={{ display: "block", color: "var(--studio-accent)", position: "absolute", left: "100%", top: 0 }}>
              {letter === " " ? "\u00A0" : letter}
            </span>
          </motion.div>
        </div>
      ))}
    </motion.span>
  );
};

const InfiniteMarquee = ({ text }) => {
  return (
    <div style={{
      overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex',
      padding: '0rem 0', background: 'var(--studio-text)',
      borderTop: '1px solid var(--studio-border)',
      borderBottom: '1px solid var(--studio-border)'
    }}>
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ display: 'flex' }}
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} style={{
            fontSize: 'clamp(4rem, 15vw, 15rem)',
            fontWeight: '900',
            marginRight: '4rem',
            color: 'var(--studio-bg)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em'
          }}>
            {text} •
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { addInquiry } = useAuth();
  const [formStatus, setFormStatus] = useState('idle');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const sweets = [
    { id: 'PROJ-001', title: 'ICE CREAM STUDIO', category: 'SIGNATURE_LAB', price: '₹100', batch: 'B-72', ingredients: 'ALMOND_MILK, ORGANIC_FRUIT', image: '/ice-cream-studio.png' },
    { id: 'PROJ-002', title: 'GOLDEN MACARONS', category: 'FRANCE_CORE', price: '₹200', batch: 'B-91', ingredients: '24K_GOLD, MADAGASCAR_VANILLA', image: '/macarons.png' },
    { id: 'PROJ-003', title: 'VELVET TRUFFLES', category: 'BITTERSWEET', price: '₹150', batch: 'B-12', ingredients: '70%_COCOA, SEA_SALT, DARK_CHOCOLATE', image: '/truffles.png' },
    { id: 'PROJ-004', title: 'ROYAL ECLAIRS', category: 'BOUTIQUE', price: '₹250', batch: 'B-45', ingredients: 'CHOUX_PASTRY, SILK_CREAM', image: '/eclairs.png' },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setTimeout(() => {
      addInquiry(data);
      setFormStatus('success');
      e.target.reset();
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="landing-container" style={{ position: 'relative' }}>
      <div className="grid-overlay" />

      {/* HUD HEADER */}
      <motion.nav className="hud-bar" style={{ padding: '0.75rem var(--hud-padding)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <h1 style={{ fontSize: '1.25rem', margin: 0, letterSpacing: '2px' }}>ROXANNE©</h1>
          <div className="desktop-menu" style={{ display: 'flex', gap: '1.5rem', borderLeft: '1px solid var(--studio-border)', paddingLeft: '1.5rem' }}>
            <span className="hud-label">STATUS: <span style={{ color: 'var(--studio-accent)' }}>ONLINE</span></span>
            <span className="hud-label">LAB: STUDIO_A</span>
          </div>
        </div>

        <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['GALLERY', 'ABOUT', 'CONTACT'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hud-label" style={{ fontWeight: '700', transition: '0.2s' }}>
              [{item}]
            </a>
          ))}
          <div style={{ padding: '0.4rem 1rem', border: '1px solid var(--studio-text)', fontSize: '0.7rem', fontWeight: '900' }}>
            ENQUIRE_NOW
          </div>
        </div>

        <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none' }}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* HERO SECTION */}
      <section style={{
        minHeight: 'calc(100vh - var(--hud-height))',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 var(--hud-padding)',
        position: 'relative'
      }}>
        <div style={{ zIndex: 10 }}>
          <h2 style={{ fontSize: 'clamp(3rem, 15vw, 12rem)', maxWidth: '1400px', marginBottom: '2rem', display: 'flex', flexDirection: 'column' }}>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>THE ART OF</motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{ color: 'transparent', WebkitTextStroke: '2px var(--studio-text)' }}
            >
              EXQUISITE
            </motion.span>
            <RollingText text="SWEETNESS" />
          </h2>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            <button className="button-lab">EXPLORE_INDEX</button>
            <p style={{ maxWidth: '400px', fontSize: '0.9rem', color: 'var(--studio-muted)' }}>
              Crafting timeless sweets for life's most precious moments. Artisan quality, royal taste, and an obsession with perfection.
            </p>
          </div>
        </div>
      </section>

      <section id="about" style={{ padding: 'var(--section-gap) var(--hud-padding)', borderTop: '1px solid var(--studio-border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >

            <h3 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '3rem' }}>
              WHERE TRADITION MEETS <br /> DIGITAL_PRECISION
            </h3>
            <p style={{ fontSize: '1.2rem', maxWidth: '500px', marginBottom: '4rem' }}>
              Roxanne was born from a vision to treat every confection as a piece of sculpture. Our kitchen is a laboratory of taste.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ padding: '2rem', border: '1px solid var(--studio-border)' }}>
                <p className="hud-label">CAPACITY</p>
                <p style={{ fontSize: '2rem' }}>12+ CHEFS</p>
              </div>
              <div style={{ padding: '2rem', border: '1px solid var(--studio-border)' }}>
                <p className="hud-label">QUALITY_LOCK</p>
                <p style={{ fontSize: '2rem' }}>100% ARTISAN</p>
              </div>
            </div>
          </motion.div>
          <div style={{ position: 'relative' }}>
            <img src="/about-image.png" style={{ width: '100%', height: 'auto', filter: 'grayscale(1)' }} alt="Lab" />
            <div style={{ position: 'absolute', top: '2rem', right: '2rem' }} className="accent-pill">CERTIFIED_B_CORP</div>
          </div>
        </div>
      </section>

      {/* GALLERY - PROJECTS */}
      <section id="gallery" style={{ padding: 'var(--section-gap) var(--hud-padding)', borderTop: '1px solid var(--studio-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <h3 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>TOP_PRODUCTS</h3>
          </div>
          <p className="hud-label">TOTAL_BATCHES: 4</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1px', background: 'var(--studio-border)', border: '1px solid var(--studio-border)' }}>
          {sweets.map((sweet) => (
            <motion.div
              key={sweet.id}
              className="lab-card"
              style={{ padding: '2rem' }}
            >
              <div className="hud-label" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>ID: {sweet.id}</span>
                <span style={{ color: 'var(--studio-accent)' }}>{sweet.category}</span>
              </div>
              <div style={{ height: '400px', background: '#e0e0e0', marginBottom: '2rem', overflow: 'hidden' }}>
                <img src={sweet.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={sweet.title} />
              </div>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{sweet.title}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <p className="hud-label">BATCH: {sweet.batch}</p>
                <p className="hud-label">VAL: {sweet.price}</p>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--studio-muted)', marginBottom: '2rem' }}>COMPOSITION: {sweet.ingredients}</p>
              <button className="button-lab" style={{ width: '100%' }}>ADD_TO_COLLECTION</button>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" style={{ padding: 'var(--section-gap) var(--hud-padding)', background: 'var(--studio-text)', color: 'var(--studio-bg)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '4rem' }}>
          <div>
            <h3 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '3rem', color: 'var(--studio-bg)' }}>INITIATE <br /> CONNECTION</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <p className="hud-label" style={{ color: 'var(--studio-accent)' }}>LOCATION</p>
                <p style={{ fontSize: '1.2rem' }}>123 NEW DELHI, INDIA</p>
              </div>
              <div>
                <p className="hud-label" style={{ color: 'var(--studio-accent)' }}>DATA_LINE</p>
                <p style={{ fontSize: '1.2rem' }}>+91 9876543210</p>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--studio-bg)', padding: '3rem', color: 'var(--studio-text)' }}>
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
                  <CheckCircle size={64} color="var(--studio-accent)" style={{ margin: '0 auto 2rem' }} />
                  <h4>SENT</h4>
                  <p className="hud-label" style={{ marginTop: '1rem' }}>EXPECT_RESPONSE_WITHIN_24H</p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="hud-label">NAME</label>
                    <input name="name" required style={{ width: '100%', padding: '1rem', background: 'none', border: '1px solid var(--studio-border)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="hud-label">EMAIL</label>
                    <input name="email" type="email" required style={{ width: '100%', padding: '1rem', background: 'none', border: '1px solid var(--studio-border)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label className="hud-label">MESSAGE_</label>
                    <textarea name="message" rows="4" required style={{ width: '100%', padding: '1rem', background: 'none', border: '1px solid var(--studio-border)', resize: 'none' }} />
                  </div>
                  <button className="button-lab" disabled={formStatus === 'sending'}>
                    {formStatus === 'sending' ? 'TRANSMITTING...' : 'SEND_INQUIRY'}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <InfiniteMarquee text="LET'S TALK" />

      <footer className="hud-bar" style={{ padding: '2rem var(--hud-padding)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="hud-label">© 2026 ROXANNE_LAB_INC // ALL_RIGHTS_RESERVED</p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="/login" className="hud-label">ADMIN_LINE</a>
          <span className="hud-label">VERSION_01.0.4</span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 1025px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>

      {/* MOBILE MENU - HIGH-FIDELITY HUD */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.96)', zIndex: 2000,
              backdropFilter: 'blur(15px)', display: 'flex', flexDirection: 'column',
              padding: 'var(--hud-padding)', color: 'var(--studio-bg)'
            }}
          >
            {/* Contextual Grid for Menu */}
            <div className="grid-overlay" style={{ opacity: 0.08, zIndex: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)' }} />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* TOP HUD BAR - COMPACT */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="hud-label" style={{ opacity: 0.6 }}>LOCAL_TIME: {currentTime}</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem', color: 'inherit', cursor: 'pointer' }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* NAV LINKS - CONSOLIDATED */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
                {['GALLERY', 'ABOUT', 'CONTACT', 'ADMIN'].map((item, i) => (
                  <motion.a
                    key={item}
                    href={item === 'ADMIN' ? '/login' : `#${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ 
                      fontSize: 'clamp(2.5rem, 12vw, 5rem)', 
                      fontWeight: '900', 
                      color: item === 'ADMIN' ? 'var(--studio-accent)' : 'inherit', 
                      textDecoration: 'none',
                      letterSpacing: '-0.04em'
                    }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>

              {/* BOTTOM HUD BAR - CLEAN */}
              <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span className="hud-label" style={{ opacity: 0.4 }}>LOCATION</span>
                  <span className="hud-label">SWEET_CITY // IN</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                  <span className="hud-label" style={{ opacity: 0.4 }}>BRAND</span>
                  <span className="hud-label" style={{ fontWeight: '900', letterSpacing: '2px' }}>ROXANNE©</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
