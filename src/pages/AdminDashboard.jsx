import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, MessageSquare, Package, Settings, LogOut, Search, Filter, Mail, Trash2, Check, User, Activity, Shield, Hash, Zap, Clock, Menu as Hamburger, X, Lock, Fingerprint, Globe, Terminal } from 'lucide-react';

const MonitoringPod = ({ label, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'var(--studio-accent)' }}
    transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.08)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer'
    }}
  >
    <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.5rem' }}>
      <Activity size={12} className="flicker" style={{ color: 'var(--studio-accent)', opacity: 0.4 }} />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ color }}>{Icon}</div>
      <span className="hud-label" style={{ fontSize: '0.7rem', opacity: 0.5 }}>{label}</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
      <h3 style={{ fontSize: '2.5rem', fontWeight: '900', margin: 0 }}>{value}</h3>
      <span className="hud-label" style={{ fontSize: '0.6rem', color: 'var(--studio-accent)' }}>LIVE_FEED</span>
    </div>
  </motion.div>
);

const SecurityCard = ({ label, value, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ x: 5, backgroundColor: 'rgba(193, 255, 0, 0.05)', borderColor: 'rgba(193, 255, 0, 0.3)' }}
    transition={{ delay, duration: 0.5 }}
    style={{
      background: 'rgba(255,255,255,0.015)',
      border: '1px solid rgba(255,255,255,0.06)',
      padding: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      cursor: 'pointer'
    }}
  >
    <div style={{ color: 'var(--studio-accent)', opacity: 0.8 }}>{Icon}</div>
    <div>
      <p className="hud-label" style={{ fontSize: '0.6rem', opacity: 0.4, marginBottom: '0.25rem' }}>{label}</p>
      <p className="hud-label" style={{ fontSize: '0.85rem', fontWeight: '900' }}>{value}</p>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const { inquiries, logout, updateInquiryStatus, user } = useAuth();
  const [activeTab, setActiveTab] = useState('inquiries');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'TOTAL_INDEX_INQUIRIES', value: inquiries.length, icon: <MessageSquare size={20} />, color: 'var(--studio-accent)' },
    { label: 'NEW_TRANSMISSIONS', value: inquiries.filter(i => i.status === 'new').length, icon: <Mail size={20} />, color: '#FF4444' },
    { label: 'ACTIVE_PRODUCT_BATCHES', value: '12', icon: <Package size={20} />, color: '#00D1FF' },
  ];

  return (
    <div className="dashboard-root" style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: 'var(--studio-text)', 
      color: 'var(--studio-bg)', 
      fontFamily: 'Inter, sans-serif' 
    }}>
      <div className="grid-overlay" style={{ opacity: 0.05 }} />

      {/* SIDEBAR HUD - SYSTEM PANE */}
      <aside 
        className={`system-pane ${isSidebarOpen ? 'active' : ''}`}
        style={{ 
          width: '300px', 
          background: '#0a0a0a', 
          borderRight: '1px solid rgba(255,255,255,0.08)', 
          padding: '2.5rem', 
          display: 'flex', 
          flexDirection: 'column',
          height: '100vh',
          zIndex: 100,
        }}
      >
        <div style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Shield size={18} style={{ color: 'var(--studio-accent)' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: '900', margin: 0, letterSpacing: '2px' }}>ROXANNE©</h2>
          </div>
          <button 
            className="mobile-only close-btn" 
            onClick={() => setIsSidebarOpen(false)} 
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { id: 'dashboard', label: 'DASHBOARD', icon: <LayoutDashboard size={18} /> },
            { id: 'inquiries', label: 'INQUIRIES', icon: <MessageSquare size={18} /> },
            { id: 'products', label: 'INVENTORY', icon: <Package size={18} /> },
            { id: 'profile', label: 'OPERATOR_ID', icon: <User size={18} /> },
            { id: 'settings', label: 'SYSTEM_CONFIG', icon: <Settings size={18} /> },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
              style={{ 
                padding: '1rem 1.5rem', 
                background: activeTab === item.id ? 'rgba(193, 255, 0, 0.1)' : 'transparent', 
                color: activeTab === item.id ? 'var(--studio-accent)' : 'rgba(255,255,255,0.4)', 
                border: activeTab === item.id ? '1px solid rgba(193, 255, 0, 0.2)' : '1px solid transparent',
                borderRadius: '0', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.25rem', 
                textAlign: 'left', 
                fontWeight: '700',
                fontSize: '0.75rem',
                fontFamily: 'Space Mono',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              {activeTab === item.id && (
                <motion.div layoutId="nav-acc" style={{ position: 'absolute', left: 0, top: 0, width: '2px', height: '100%', background: 'var(--studio-accent)' }} />
              )}
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button 
            onClick={logout} 
            className="terminate-btn"
            style={{ 
              width: '100%', 
              padding: '1rem', 
              background: 'rgba(255,68,68,0.05)', 
              color: '#FF4444', 
              border: '1px solid rgba(255,68,68,0.2)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '1rem',
              fontWeight: '900',
              fontSize: '0.7rem',
              fontFamily: 'Space Mono',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <LogOut size={16} /> TERMINATE_SESSION
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      <div 
        onClick={() => setIsSidebarOpen(false)} 
        className={`mobile-only sidebar-backdrop ${isSidebarOpen ? 'active' : ''}`}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 90, backdropFilter: 'blur(5px)', display: 'none' }} 
      />

      {/* MAIN COMMAND INTERFACE */}
      <main className="main-interface" style={{ 
        flex: 1, 
        padding: 'clamp(1.5rem, 5vw, 4rem)', 
        overflowY: 'auto', 
        position: 'relative', 
        zIndex: 10 
      }}>
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          marginBottom: '5rem',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <button 
              className="mobile-only hamburger-btn" 
              onClick={() => setIsSidebarOpen(true)} 
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', padding: '0.75rem', color: 'inherit', display: 'none', alignItems: 'center', cursor: 'pointer' }}
            >
              <Hamburger size={20} />
            </button>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '8px', height: '8px', background: 'var(--studio-accent)', borderRadius: '50%' }} className="pulse" />
                <p className="hud-label" style={{ opacity: 0.5 }}>SESSION_ACTIVE // OPERATOR: ADMIN_ROXANNE</p>
              </div>
              <h1 style={{ fontSize: 'clamp(1.5rem, 6vw, 3.5rem)', fontWeight: '900', letterSpacing: '-0.02em', margin: 0 }}>COMMAND_INTERFACE</h1>
            </div>
          </div>
          <div style={{ textAlign: 'right' }} className="header-meta">
            <p className="hud-label" style={{ opacity: 0.4, marginBottom: '0.5rem' }}>UTC_DATETIME</p>
            <p className="hud-label" style={{ fontSize: '1.2rem', fontWeight: '900', fontFamily: 'Space Mono' }}>{currentTime}</p>
          </div>
        </header>

        {/* DYNAMIC TAB RENDERING */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
               key="dashboard"
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.98 }}
            >
              <div className="monitoring-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', 
                gap: '2rem', 
                marginBottom: '5rem' 
              }}>
                {stats.map((stat, i) => (
                  <MonitoringPod key={i} {...stat} delay={0.2 + i * 0.1} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'inquiries' && (
            <motion.div 
              key="inquiries"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: '900' }}>INQUIRY_LOG</h3>
                  <span className="hud-label" style={{ padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                    RECORDS: {inquiries.length}
                  </span>
                </div>
                <div className="log-controls" style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '300px' }}>
                  <div style={{ position: 'relative', width: '100%' }}>
                    <Search size={14} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                    <input 
                      style={{ 
                        width: '100%',
                        padding: '0.8rem 1rem 0.8rem 2.5rem', 
                        background: 'rgba(255,255,255,0.02)', 
                        border: '1px solid rgba(255,255,255,0.08)', 
                        color: 'var(--studio-bg)',
                        fontSize: '0.8rem',
                        fontFamily: 'Space Mono',
                        outline: 'none'
                      }} 
                      placeholder="SEARCH_BY_ID..." 
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowX: 'auto' }} className="log-container">
                {inquiries.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '10rem', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)' }}>
                    <p className="hud-label" style={{ opacity: 0.4 }}>NO_DATA_STREAMS_DETECTED</p>
                  </div>
                ) : (
                  <div style={{ minWidth: '900px' }}>
                    {inquiries.map((inquiry, i) => (
                      <motion.div 
                        key={inquiry.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        style={{ 
                          padding: '1.5rem 2rem', 
                          background: inquiry.status === 'new' ? 'rgba(193, 255, 0, 0.03)' : 'rgba(255,255,255,0.02)', 
                          border: `1px solid ${inquiry.status === 'new' ? 'rgba(193, 255, 0, 0.15)' : 'rgba(255,255,255,0.08)'}`,
                          display: 'grid',
                          gridTemplateColumns: 'minmax(200px, 1fr) 2fr 1.5fr 1fr 100px',
                          gap: '2rem',
                          alignItems: 'center',
                          marginBottom: '0.5rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                        className="data-log-row"
                      >
                        <div>
                          <p className="hud-label" style={{ fontSize: '0.6rem', opacity: 0.4, marginBottom: '0.5rem' }}>SENDER_ACCESS_ID</p>
                          <p style={{ fontWeight: '700', fontSize: '0.9rem', margin: 0 }}>{inquiry.name}</p>
                          <p style={{ fontSize: '0.75rem', opacity: 0.4, margin: '0.2rem 0 0' }}>{inquiry.email}</p>
                        </div>
                        <div>
                          <p className="hud-label" style={{ fontSize: '0.6rem', opacity: 0.4, marginBottom: '0.5rem' }}>DATA_PAYLOAD</p>
                          <p style={{ fontSize: '0.85rem', margin: 0, maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{inquiry.message}</p>
                        </div>
                        <div>
                          <p className="hud-label" style={{ fontSize: '0.6rem', opacity: 0.4, marginBottom: '0.5rem' }}>TIMESTAMP</p>
                          <p className="hud-label" style={{ fontSize: '0.8rem' }}>{inquiry.date}</p>
                        </div>
                        <div>
                          <p className="hud-label" style={{ fontSize: '0.6rem', opacity: 0.4, marginBottom: '0.5rem' }}>STATUS</p>
                          <span style={{ 
                            fontSize: '0.65rem', 
                            fontWeight: '900', 
                            fontFamily: 'Space Mono',
                            padding: '0.3rem 0.6rem',
                            background: inquiry.status === 'new' ? 'rgba(193, 255, 0, 0.1)' : 'rgba(255,255,255,0.05)',
                            color: inquiry.status === 'new' ? 'var(--studio-accent)' : 'rgba(255,255,255,0.5)',
                            border: `1px solid ${inquiry.status === 'new' ? 'rgba(193, 255, 0, 0.2)' : 'rgba(255,255,255,0.1)'}`
                          }}>
                            {inquiry.status.toUpperCase()}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                          {inquiry.status === 'new' && (
                            <button 
                              onClick={() => updateInquiryStatus(inquiry.id, 'responded')}
                              style={{ background: 'none', border: 'none', color: 'var(--studio-accent)', cursor: 'pointer', transition: 'transform 0.2s ease' }}
                              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                              <Check size={18} />
                            </button>
                          )}
                          <button 
                             style={{ background: 'none', border: 'none', color: '#FF4444', cursor: 'pointer', transition: 'transform 0.2s ease' }}
                             onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
             <motion.div
               key="profile"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
             >
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px, 45vw, 400px), 1fr))', gap: '3rem' }}>
                  {/* OPERATOR CARD */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', padding: 'clamp(2rem, 5vw, 4rem)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '2rem', height: '2rem', borderTop: '2px solid var(--studio-accent)', borderLeft: '2px solid var(--studio-accent)' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(193, 255, 0, 0.1)', border: '2px solid rgba(193, 255, 0, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                        <User size={64} style={{ color: 'var(--studio-accent)' }} />
                      </div>
                      <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: '900', margin: 0 }}>OPERATOR_ADMIN</h2>
                      <p className="hud-label" style={{ opacity: 0.4, marginTop: '0.5rem' }}>{user?.email || 'admin@roxanne_lab.com'}</p>
                      
                      <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '3rem', paddingTop: '2rem', paddingBottom: '2rem' }}>
                         <p className="hud-label" style={{ fontSize: '0.65rem', color: 'var(--studio-accent)', marginBottom: '1rem' }}>── AUTHENTICATION_PROFILE</p>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span className="hud-label" style={{ opacity: 0.3 }}>UID</span>
                            <span className="hud-label">#RX_001_LAB</span>
                         </div>
                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="hud-label" style={{ opacity: 0.3 }}>CLEARANCE</span>
                            <span className="hud-label" style={{ color: 'var(--studio-accent)' }}>LEVEL_01_COMMAND</span>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* SECURITY PROTOCOLS */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h4 className="hud-label" style={{ marginBottom: '1rem', letterSpacing: '2px' }}>[SECURITY_DIAGNOSTICS]</h4>
                    <SecurityCard label="ENCRYPTION_PROTOCOL" value="AES_256_GCM" icon={<Lock size={20} />} delay={0.2} />
                    <SecurityCard label="IDENTITY_VERIFICATION" value="BIO_FINGERPRINT_OK" icon={<Fingerprint size={20} />} delay={0.3} />
                    <SecurityCard label="ACCESS_LOCATION" value="SWEET_CITY // NODE_01" icon={<Globe size={20} />} delay={0.4} />
                    <SecurityCard label="TERMINAL_TYPE" value="SECURE_LAB_COMMAND" icon={<Terminal size={20} />} delay={0.5} />
                    
                    <motion.div 
                      key="safety-status"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      style={{ marginTop: 'auto', padding: '2rem', background: 'rgba(193, 255, 0, 0.05)', border: '1px solid rgba(193, 255, 0, 0.1)' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <Shield size={16} style={{ color: 'var(--studio-accent)' }} />
                        <span className="hud-label" style={{ fontWeight: '900' }}>SYSTEM_HEALTH: STABLE</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', opacity: 0.6, margin: 0 }}>All security modules operational. No unauthorized access attempts detected in current cycle.</p>
                    </motion.div>
                  </div>
               </div>
             </motion.div>
          )}

          {(activeTab !== 'inquiries' && activeTab !== 'dashboard' && activeTab !== 'profile') && (
            <motion.div 
              key="construction"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', padding: '10rem', background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.05)' }}
            >
              <Zap size={48} style={{ color: 'var(--studio-accent)', marginBottom: '2rem' }} className="pulse" />
              <h3 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>SECTION_UNDER_CONSTRUCTION</h3>
              <p className="hud-label" style={{ opacity: 0.4 }}>REFINING_PRODUCT_MANAGEMENT_PROTOCOL_v0.9.1</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style>{`
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        .flicker { animation: flicker 3s infinite; }
        @keyframes flicker {
          0%, 100% { opacity: 0.4; }
          45% { opacity: 0.3; }
          47% { opacity: 1; }
          49% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        .data-log-row:hover {
          background: rgba(193, 255, 0, 0.04) !important;
          border-color: rgba(193, 255, 0, 0.3) !important;
          transform: translateX(4px);
        }
        .nav-btn:hover {
          color: var(--studio-accent) !important;
          background: rgba(255,255,255,0.03) !important;
        }
        .terminate-btn:hover {
          background: rgba(255,68,68,0.1) !important;
          border-color: rgba(255,68,68,0.4) !important;
          transform: translateY(-2px);
        }
        
        /* THE ULTIMATE RESPONSIVE FIX */
        .system-pane {
           position: sticky !important;
           top: 0;
           display: flex !important;
           flex-direction: column;
        }
        .hamburger-btn { display: none !important; }
        .close-btn { display: none !important; }
        .sidebar-backdrop { display: none !important; }
        
        @media (max-width: 1024px) {
          .system-pane { 
            position: fixed !important; 
            left: -320px;
            width: 320px !important; 
            max-width: 320px !important; 
            transition: left 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 20px 0 50px rgba(0,0,0,0.5);
            display: flex !important;
          }
          .system-pane.active {
            left: 0 !important;
          }
          .hamburger-btn { display: flex !important; }
          .close-btn { display: flex !important; }
          .sidebar-backdrop.active { display: block !important; }
          .header-meta { text-align: left !important; width: 100%; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 1rem; }
        }
          }
          .hamburger-btn { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
