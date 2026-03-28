import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck, Activity, Plus } from 'lucide-react';

const FloatingParticle = ({ delay, duration, startX, endX, size, shape, color, blur }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: startX, y: '120vh' }}
      animate={{ 
        opacity: [0, 1, 1, 0], 
        y: '-20vh',
        x: endX,
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        position: 'absolute',
        zIndex: 1,
        pointerEvents: 'none',
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: blur ? `blur(${blur}px)` : 'none'
      }}
    >
      {shape === 'circle' && (
        <div style={{ width: size, height: size, borderRadius: '50%', background: 'currentColor', boxShadow: `0 0 ${size}px currentColor` }} />
      )}
      {shape === 'square' && (
        <div style={{ width: size, height: size, border: '2px solid currentColor', transform: 'rotate(45deg)', boxShadow: `0 0 ${size/2}px currentColor` }} />
      )}
      {shape === 'plus' && (
        <Plus size={size} style={{ filter: `drop-shadow(0 0 8px currentColor)` }} />
      )}
    </motion.div>
  );
};

const CharacterReveal = ({ text }) => {
  const letters = text.split("");
  return (
    <div style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
};

const HUDField = ({ label, icon: Icon, type, value, onChange, placeholder, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.6 }}
    style={{ marginBottom: '2rem' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
      <label className="hud-label" style={{ opacity: 0.6 }}>{label}</label>
      <span className="hud-label" style={{ color: 'var(--studio-accent)', fontSize: '0.6rem' }}>[INPUT_ACTIVE]</span>
    </div>
    <div style={{ position: 'relative' }}>
      <Icon size={16} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
      <input 
        type={type} 
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        style={{ 
          width: '100%', 
          padding: '1.25rem 1.25rem 1.25rem 3.5rem', 
          background: 'rgba(255,255,255,0.03)', 
          border: '1px solid rgba(255,255,255,0.1)', 
          color: 'var(--studio-bg)',
          outline: 'none',
          fontSize: '0.9rem',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          zIndex: 2
        }} 
        className="login-input"
      />
      <div className="input-focus-line" style={{ position: 'absolute', bottom: 0, left: 0, width: '0%', height: '1px', background: 'var(--studio-accent)', transition: 'width 0.3s ease', zIndex: 3 }} />
    </div>
  </motion.div>
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/admin');
    } else {
      setError('CREDENTIALS_MISMATCHED // ACCESS_DENIED');
      setTimeout(() => setError(''), 3000);
    }
  };

  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 12 + Math.random() * 25,
      startX: `${Math.random() * 100}vw`,
      endX: `${(Math.random() - 0.5) * 40 + Math.random() * 100}vw`,
      size: 15 + Math.random() * 50,
      shape: ['circle', 'square', 'plus'][Math.floor(Math.random() * 3)],
      color: Math.random() > 0.8 ? 'rgba(193, 255, 0, 0.6)' : 'rgba(255,255,255,0.15)',
      blur: Math.random() > 0.5 ? Math.random() * 6 : 0
    }));
  }, []);

  return (
    <div className="login-container" style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--studio-text)', 
      color: 'var(--studio-bg)', 
      position: 'relative', 
      overflow: 'hidden',
      padding: '2rem'
    }}>
      <div className="grid-overlay" style={{ opacity: 0.08, zIndex: 0 }} />

      {/* BACKGROUND ATMOSPHERE */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} {...p} />
      ))}

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          width: '100%', 
          maxWidth: '460px', 
          padding: 'clamp(2rem, 8vw, 4rem)', 
          background: 'rgba(255,255,255,0.02)', 
          border: '1px solid rgba(255,255,255,0.1)', 
          position: 'relative', 
          zIndex: 10,
          backdropFilter: 'blur(15px)'
        }}
      >
        {/* CORNER DECORATIONS */}
        <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '2rem', height: '2rem', borderTop: '2px solid var(--studio-accent)', borderLeft: '2px solid var(--studio-accent)' }} />
        <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '2rem', height: '2rem', borderBottom: '2px solid var(--studio-accent)', borderRight: '2px solid var(--studio-accent)' }} />

        {/* HUD DECOR */}
        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Activity size={14} className="flicker" style={{ color: 'var(--studio-accent)' }} />
          <span className="hud-label" style={{ fontSize: '0.65rem', opacity: 0.5 }}>PROTOCOL: AES_256V2</span>
        </div>

        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '900', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            <CharacterReveal text="ADMIN LOGIN" />
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--studio-accent)' }} className="pulse" />
            <p className="hud-label" style={{ opacity: 0.5 }}>SECURE_AUTHENTICATION_GATEWAY</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ 
                padding: '1.25rem', 
                background: 'rgba(255, 68, 68, 0.1)', 
                border: '1px solid rgba(255, 68, 68, 0.3)', 
                color: '#FF4444', 
                marginBottom: '2rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.8rem', 
                fontSize: '0.75rem',
                fontFamily: 'Space Mono'
              }}
            >
              <AlertCircle size={16} /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleLogin}>
          <HUDField 
            label="01 // OPERATOR_ID" 
            icon={Mail} 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@roxanne_lab.com"
            delay={0.4}
          />
          
          <HUDField 
            label="02 // ACCESS_KEY" 
            icon={Lock} 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            delay={0.5}
          />

          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="button-lab" 
            style={{ width: '100%', padding: '1.5rem', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}
          >
            INITIALIZE_SESSION <ArrowRight size={18} />
          </motion.button>
        </form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <a href="/" className="hud-label" style={{ color: 'var(--studio-bg)', textDecoration: 'none' }}>── RETURN_TO_WEBSITE</a>
        </motion.div>
      </motion.div>

      <style>{`
        .login-input:focus ~ .input-focus-line {
          width: 100% !important;
        }
        .login-input:focus {
          border-color: rgba(193, 255, 0, 0.3) !important;
          background: rgba(255,255,255,0.06) !important;
        }
        .pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
        .flicker {
          animation: flicker 4s infinite;
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          40% { opacity: 0.8; }
          42% { opacity: 0.4; }
          43% { opacity: 0.8; }
          45% { opacity: 0.2; }
          46% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
