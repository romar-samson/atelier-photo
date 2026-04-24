import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="nav-wrapper" style={{ 
      position: 'sticky', 
      top: '1.5rem', 
      zIndex: 100, 
      display: 'flex', 
      justifyContent: 'center', 
      width: '100%', 
      pointerEvents: 'none',
      padding: '0 1rem'
    }}>
      <header className="nav-pill" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.6rem 0.6rem 0.6rem 1.5rem',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        borderRadius: '100px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0,0,0,0.02)',
        width: '100%',
        maxWidth: '1000px',
        pointerEvents: 'auto',
      }}>
        {/* Left side: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            position: 'relative'
          }}>
            <Image src="/logo.png" alt="Wink Logo" fill style={{ objectFit: 'cover' }} />
          </div>
          <Link href="/" style={{ fontFamily: 'Playfair Display', fontSize: '1.35rem', fontWeight: 600, letterSpacing: '-0.02em', paddingRight: '1rem', whiteSpace: 'nowrap' }}>
            Wink
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="desktop-only" style={{ 
          display: 'flex', 
          gap: '2.5rem', 
          alignItems: 'center', 
          fontFamily: 'Inter', 
          fontSize: '0.875rem'
        }}>
          <Link href="/gallery" className="nav-link">
            Gallery
          </Link>
          <Link href="/studio" className="nav-link">
            Studio
          </Link>
        </nav>

        {/* Right side: Actions */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/studio" className="btn-enter" style={{ 
            backgroundColor: 'var(--text-primary)', 
            color: 'var(--surface)',
            padding: '0.75rem 1.5rem',
            borderRadius: '100px',
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'var(--transition-smooth)',
            whiteSpace: 'nowrap'
          }}>
            Enter Booth
          </Link>
        </div>
      </header>
    </div>
  );
}
