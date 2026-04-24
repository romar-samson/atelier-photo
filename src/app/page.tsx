"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const LayoutPreview = ({ title, type }: { title: string, type: '3V' | '4V' | '2x2' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: 280, flexShrink: 0, paddingTop: '20px' }}>
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        style={{ 
          backgroundColor: '#FFFFFF', 
          padding: '12px',
          boxShadow: '0 12px 48px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.04)',
          width: '100%',
          display: 'flex',
          flexDirection: type === '2x2' ? 'row' : 'column',
          flexWrap: type === '2x2' ? 'wrap' : 'nowrap',
          gap: '8px',
          height: '340px'
        }}
      >
        {[...Array(type === '3V' ? 3 : 4)].map((_, i) => (
          <div key={i} style={{
            width: type === '2x2' ? 'calc(50% - 4px)' : '100%',
            height: type === '2x2' ? 'calc(50% - 4px)' : type === '3V' ? 'calc(33.33% - 5.33px)' : 'calc(25% - 6px)',
            backgroundColor: '#F3F4F6', // Simple gray placeholder
            borderRadius: '4px'
          }} />
        ))}
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
  const frameOptions = [
    { id: '3V', title: '3 Vertical' },
    { id: '4V', title: '4 Vertical' },
    { id: '2x2', title: '2x2 Grid' },
  ];

  const designThemes = [
    { id: '1', title: 'iPhone Gallery Strip' },
    { id: '2', title: '1999 Strip' },
    { id: '3', title: 'Theater Strip' },
    { id: '4', title: 'Cute Sticker Strip' },
    { id: '5', title: 'Cute Cat Strip' },
    { id: '6', title: 'Minimalist Strip' },
  ];
  
  const [activeFrameId, setActiveFrameId] = useState<'3V' | '4V' | '2x2'>('3V');
  const [activeDesignId, setActiveDesignId] = useState('1');
  
  const activeDesign = designThemes.find(o => o.id === activeDesignId) || designThemes[0];

  return (
    <div style={{ minHeight: 'calc(100vh - 73px)', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'hidden' }}>
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        style={{ textAlign: 'center', maxWidth: '800px', marginTop: '10rem', marginBottom: '6rem', padding: '0 2rem' }}
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
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '4rem', maxWidth: '800px', width: '100%', padding: '0 1rem' }}>
          
          {/* Frame Selection */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>1. Choose Layout Frame</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              {frameOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveFrameId(option.id as '3V' | '4V' | '2x2')}
                  style={{
                    padding: '0.6rem 1.5rem',
                    borderRadius: '8px',
                    border: activeFrameId === option.id ? '1px solid var(--text-primary)' : '1px solid var(--border-light)',
                    backgroundColor: activeFrameId === option.id ? 'rgba(0,0,0,0.03)' : 'transparent',
                    color: activeFrameId === option.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {option.title}
                </button>
              ))}
            </div>
          </div>

          {/* Design Selection */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>2. Choose Design Theme</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              {designThemes.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveDesignId(option.id)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '100px',
                    border: activeDesignId === option.id ? '1px solid var(--text-primary)' : '1px solid var(--border-light)',
                    backgroundColor: activeDesignId === option.id ? 'var(--text-primary)' : 'transparent',
                    color: activeDesignId === option.id ? 'var(--surface)' : 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {option.title}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          width: '100%', 
          justifyContent: 'center',
          minHeight: '450px' 
        }}>
          <motion.div
            key={`${activeDesign.id}-${activeFrameId}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LayoutPreview title={activeDesign.title} type={activeFrameId} />
          </motion.div>
        </div>
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
      </motion.section>

      {/* Footer / CTA Section */}
      <footer style={{ 
        width: '100%', 
        backgroundColor: '#F9FAFB', 
        borderTop: '1px solid var(--border-light)', 
        padding: '3rem 2rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        marginTop: 'auto'
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '1200px', 
          display: 'flex', 
          flexDirection: 'row',
          justifyContent: 'space-between', 
          alignItems: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.875rem'
        }}>
          <p>© {new Date().getFullYear()} Atelier. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="#" style={{ transition: 'color 0.2s' }}>Privacy</Link>
            <Link href="#" style={{ transition: 'color 0.2s' }}>Terms</Link>
            <Link href="#" style={{ transition: 'color 0.2s' }}>Instagram</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
