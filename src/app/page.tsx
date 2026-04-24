"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

const LayoutPreview = ({ title, type }: { title: string, type: '3V' | '4V' | '2x2' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: 280, flexShrink: 0, paddingTop: '50px' }}>
      {/* Outer Container for the iOS-style menu */}
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        style={{ 
          position: 'relative',
          width: '100%',
        }}
      >
        {/* Top Floating Reaction Pill */}
        <div style={{
          position: 'absolute',
          top: '-45px',
          left: '10px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '8px 14px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          zIndex: 10,
          border: '1px solid rgba(0,0,0,0.02)'
        }}>
          <span style={{ fontSize: '0.5rem', color: '#9CA3AF', fontFamily: 'Inter', fontWeight: 500, letterSpacing: '0.02em' }}>Tap and hold to super react</span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '1.1rem' }}>
            <span>🤍</span>
            <span>🫧</span>
            <span>🎀</span>
            <span>💿</span>
            <span>🌿</span>
            <span style={{ fontSize: '1.1rem', color: '#9CA3AF', marginLeft: '2px', fontWeight: 300, lineHeight: 1 }}>+</span>
          </div>
        </div>

        {/* Main Bubble Container */}
        <div style={{
          backgroundColor: '#FFFFFF', 
          borderRadius: '24px',
          padding: '12px',
          boxShadow: '0 12px 48px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(0,0,0,0.03)'
        }}>
          
          {/* Photo Strip Area */}
          <div style={{
            display: 'flex',
            flexDirection: type === '2x2' ? 'row' : 'column',
            flexWrap: type === '2x2' ? 'wrap' : 'nowrap',
            gap: '8px',
            width: '100%',
            height: '340px', // Fixed height for consistency
          }}>
            {[...Array(type === '3V' ? 3 : type === '4V' ? 4 : 4)].map((_, i) => (
              <div key={i} style={{
                width: type === '2x2' ? 'calc(50% - 4px)' : '100%',
                height: type === '2x2' ? 'calc(50% - 4px)' : type === '3V' ? 'calc(33.33% - 5.33px)' : 'calc(25% - 6px)',
                backgroundColor: '#93C5FD', // light blue sky
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                 {/* Landscape elements */}
                 <div style={{
                   position: 'absolute',
                   bottom: 0,
                   left: '-10%',
                   right: '-10%',
                   height: '50%',
                   backgroundColor: '#A3E635', // lime green
                   borderTopLeftRadius: '50% 100%',
                   borderTopRightRadius: '50% 30%',
                 }} />
                 <div style={{
                   position: 'absolute',
                   bottom: 0,
                   left: '-10%',
                   right: '-10%',
                   height: '30%',
                   backgroundColor: '#65A30D', // darker green
                   borderTopLeftRadius: '30% 50%',
                   borderTopRightRadius: '50% 100%',
                 }} />
                 {/* Cloud */}
                 <div style={{
                   position: 'absolute',
                   top: '25%',
                   left: '35%',
                   width: '36px',
                   height: '16px',
                   backgroundColor: '#FFFFFF',
                   borderRadius: '20px',
                   opacity: 0.95
                 }}>
                   <div style={{ position: 'absolute', top: '-8px', left: '8px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
                   <div style={{ position: 'absolute', top: '-4px', left: '18px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
                 </div>
                 {/* Sun/moon element on the side */}
                 {i === 0 && (
                   <div style={{
                     position: 'absolute',
                     top: '20%',
                     left: '-10px',
                     width: '28px',
                     height: '28px',
                     backgroundColor: '#FFFFFF',
                     borderRadius: '50%',
                     opacity: 0.9
                   }} />
                 )}
              </div>
            ))}
          </div>

          {/* iOS Menu Actions */}
          <div style={{ 
            marginTop: '12px', 
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ textAlign: 'center', fontSize: '0.65rem', color: '#9CA3AF', marginBottom: '8px', fontFamily: 'Inter', fontWeight: 500 }}>
              1:22 AM
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.8rem', fontFamily: 'Inter', color: '#374151', backgroundColor: '#F9FAFB', borderRadius: '16px', border: '1px solid #F3F4F6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid #F3F4F6' }}>
                <span>Reply</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid #F3F4F6' }}>
                <span>Save</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid #F3F4F6' }}>
                <span>Forward</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13"/></svg>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', color: '#EF4444' }}>
                <span>Unsend</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
              </div>
            </div>
          </div>
          
        </div>
      </motion.div>
      
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.25rem', fontWeight: 600, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>{title}</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {type === '3V' ? '3 vertical shots' : type === '4V' ? '4 vertical shots' : '4 shots in 2x2 grid'}
        </p>
      </div>
    </div>
  );
};

const StepItem = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6 }}
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', maxWidth: '250px' }}
  >
    <div style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', fontWeight: 600, color: 'var(--text-secondary)', opacity: 0.5 }}>
      {number}
    </div>
    <h3 style={{ fontFamily: 'Inter', fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>
      {title}
    </h3>
    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
      {desc}
    </p>
  </motion.div>
);

export default function LandingPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - 73px)', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' }}>
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        style={{ textAlign: 'center', maxWidth: '800px', marginTop: '6rem', marginBottom: '6rem', padding: '0 2rem' }}
      >
        <h1 className="title-xl" style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Capture the Moment<br/>in Absolute Elegance.</h1>
        <p className="subtitle" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          Step into our digital studio. Choose a minimalist layout, curate your aesthetic, and craft timeless photo strips directly from your browser.
        </p>
        
        <div className="flex gap-4 justify-center" style={{ marginTop: '2rem' }}>
          <Link href="/studio" className="btn-primary" style={{ padding: '1.125rem 3rem', fontSize: '0.875rem' }}>
            Enter Studio
          </Link>
          <a href="#layouts" className="btn-outline" style={{ padding: '1.125rem 3rem', fontSize: '0.875rem' }}>
            View Layouts
          </a>
        </div>
      </motion.div>

      {/* Divider */}
      <div style={{ width: '1px', height: '80px', backgroundColor: 'var(--border-light)', marginBottom: '5rem' }} />

      {/* Layout Carousel */}
      <motion.div 
        id="layouts"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '6rem' }}
      >
        <p style={{ fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Design Options
        </p>
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '4rem' }}>
          Our Curated Frames
        </h2>
        
        <div style={{ 
          display: 'flex', 
          width: '100%', 
          overflowX: 'hidden', 
          padding: '1rem',
          justifyContent: 'center',
        }}>
          {/* Framer motion wrapper for carousel dragging */}
          <motion.div 
            drag="x"
            dragConstraints={{ right: 0, left: -200 }}
            whileTap={{ cursor: "grabbing" }}
            style={{ display: 'flex', gap: '3rem', cursor: 'grab' }}
          >
            <LayoutPreview title="Classic Trio" type="3V" />
            <LayoutPreview title="Modern Quad" type="4V" />
            <LayoutPreview title="Grid Edition" type="2x2" />
          </motion.div>
        </div>
        
        <p style={{ marginTop: '3rem', fontSize: '0.875rem', color: '#9CA3AF' }}>Drag to explore layouts</p>
      </motion.div>

      {/* Divider */}
      <div style={{ width: '1px', height: '80px', backgroundColor: 'var(--border-light)', marginBottom: '5rem' }} />

      {/* How it Works Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '8rem' }}
      >
        <p style={{ fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          The Process
        </p>
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '5rem' }}>
          How It Works
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', width: '100%' }}>
          <StepItem number="01" title="Get Ready" desc="Allow camera access and perfect your lighting before stepping into the spotlight." />
          <StepItem number="02" title="Strike a Pose" desc="A responsive 3-second countdown automatically captures your best moments." />
          <StepItem number="03" title="Curate" desc="Select your preferred frame layout and toggle aesthetic background colors." />
          <StepItem number="04" title="Download" desc="Instantly render and save your high-resolution photo strip directly to your device." />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ marginTop: '6rem', textAlign: 'center' }}
        >
          <h3 style={{ fontFamily: 'Playfair Display', fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Ready to capture your moment?</h3>
          <Link href="/studio" className="btn-primary" style={{ padding: '1.25rem 3.5rem', fontSize: '1rem' }}>
            Open Studio
          </Link>
        </motion.div>
      </motion.section>

    </div>
  );
}
