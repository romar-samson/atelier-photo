"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

const LayoutPreview = ({ title, type }: { title: string, type: '3V' | '4V' | '2x2' }) => {
  return (
    <motion.div 
      whileHover={{ y: -10, boxShadow: "0 24px 48px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.3 }}
      style={{ 
        width: 300, 
        padding: '2.5rem 2rem', 
        backgroundColor: '#FFFFFF', 
        borderRadius: 'var(--border-radius-lg)', 
        border: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        flexShrink: 0,
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div style={{
        width: '140px',
        height: type === '4V' ? '280px' : type === '3V' ? '220px' : '180px',
        backgroundColor: '#F9FAFB',
        padding: '12px',
        display: 'flex',
        flexDirection: type === '2x2' ? 'row' : 'column',
        flexWrap: type === '2x2' ? 'wrap' : 'nowrap',
        gap: '8px',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        border: '1px solid #F3F4F6'
      }}>
        {/* Generate boxes */}
        {[...Array(type === '3V' ? 3 : 4)].map((_, i) => (
          <div key={i} style={{
            backgroundColor: '#E5E5E5',
            width: type === '2x2' ? 'calc(50% - 4px)' : '100%',
            height: type === '2x2' ? 'calc(50% - 4px)' : '30%',
            flexGrow: 1
          }} />
        ))}
        {/* Placeholder text at the bottom */}
        <div style={{ width: '100%', height: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           <div style={{ width: '45%', height: '3px', backgroundColor: '#D1D5DB' }} />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.25rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>{title}</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {type === '3V' ? '3 vertical shots' : type === '4V' ? '4 vertical shots' : '4 shots in 2x2 grid'}
        </p>
      </div>
    </motion.div>
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
