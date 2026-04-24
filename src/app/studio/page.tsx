/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { toPng } from "html-to-image";

type LayoutType = "3-vertical" | "4-vertical" | "2x2-grid";

export default function StudioPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const [streamActive, setStreamActive] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  
  const [layout, setLayout] = useState<LayoutType>("3-vertical");
  const [bgColor, setBgColor] = useState("#FFFFFF");

  const expectedPhotos = layout === "3-vertical" ? 3 : 4;

  const startCamera = async () => {
    try {
      const ms = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = ms;
        setStreamActive(true);
      }
    } catch (e) {
      console.error("Camera access denied or error", e);
      alert("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((trk) => trk.stop());
      setStreamActive(false);
    }
  }, []);

  useEffect(() => {
     
    startCamera();
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const snapPhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.translate(canvas.width, 0); // mirror horizontally to match view
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/jpeg", 0.9);
      }
    }
    return null;
  };

  const startSequence = async () => {
    if (photos.length >= expectedPhotos) {
      setPhotos([]); // reset if full
    }
    setCapturing(true);

    const takeShots = async (remaining: number) => {
      if (remaining === 0) {
        setCapturing(false);
        setCountdown(null);
        return;
      }

      // Countdown
      for (let i = 3; i > 0; i--) {
        setCountdown(i);
        await new Promise((res) => setTimeout(res, 1000));
      }
      setCountdown(null);

      // Flash & Snap
      const photo = snapPhoto();
      if (photo) {
        setPhotos((prev) => [...prev, photo]);
      }
      
      // Delay before next shot
      await new Promise((res) => setTimeout(res, 800));
      await takeShots(remaining - 1);
    };

    const shotsNeeded = photos.length >= expectedPhotos ? expectedPhotos : expectedPhotos - photos.length;
    await takeShots(shotsNeeded);
  };

  const handleDownload = async () => {
    if (photos.length === 0 || !stripRef.current) return;

    try {
      // Export the exact DOM element including the floating pill
      const dataUrl = await toPng(stripRef.current, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `atelier-strip-${Date.now()}.png`;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 69px)", display: "flex", flexDirection: "column" }}>

      <div className="studio-layout" style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left pane: Camera & Controls */}
        <div className="studio-pane" style={{ flex: 1, padding: "2rem", display: "flex", flexDirection: "column", borderRight: "1px solid var(--border-light)", overflowY: "auto" }}>
          
          <div style={{ 
            position: "relative", 
            width: "100%", 
            maxWidth: "800px", 
            aspectRatio: "16/9", 
            margin: "0 auto", 
            backgroundColor: "#E5E5E5", 
            borderRadius: "var(--border-radius-md)", 
            overflow: "hidden" 
          }}>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)", display: streamActive ? 'block' : 'none' }} 
            />
            {!streamActive && (
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#E5E5E5" }}>
                Waiting for Camera...
              </div>
            )}
            
            {countdown !== null && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.2)", color: "white", fontSize: "8rem", fontFamily: "Playfair Display", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
                {countdown}
              </div>
            )}
            
            {/* hidden canvas for snapshotting */}
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>

          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button 
              className="btn-primary" 
              style={{ fontSize: "1.25rem", padding: "1rem 4rem" }}
              onClick={startSequence}
              disabled={capturing}
            >
              {capturing ? "Capturing..." : photos.length === expectedPhotos ? "Retake Photos" : `Snap ${expectedPhotos} Photos`}
            </button>
            <p style={{ marginTop: "1rem", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
              {photos.length} / {expectedPhotos} captured
            </p>
          </div>

          <div style={{ marginTop: "2rem", padding: "1.5rem", border: "1px solid var(--border-light)", borderRadius: "var(--border-radius-md)" }}>
            <h3 style={{ marginBottom: "1rem", fontFamily: "Inter" }}>Booth Settings</h3>
            
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: 500 }}>Choose Layout</label>
              <div className="flex gap-2">
                {(["3-vertical", "4-vertical", "2x2-grid"] as LayoutType[]).map((l) => (
                  <button 
                    key={l}
                    onClick={() => { setLayout(l); setPhotos([]); }}
                    style={{
                      padding: "0.5rem 1rem",
                      border: "1px solid",
                      borderColor: layout === l ? "var(--text-primary)" : "var(--border-light)",
                      backgroundColor: layout === l ? "var(--text-primary)" : "transparent",
                      color: layout === l ? "var(--surface)" : "var(--text-primary)",
                      borderRadius: "100px",
                      fontSize: "0.875rem"
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: 500 }}>Strip Background</label>
              <div className="flex gap-2">
                {[
                  { name: "White", val: "#FFFFFF", border: "#E5E5E5" },
                  { name: "Off-White", val: "#FDFBF5", border: "#E5E5E5" },
                  { name: "Black", val: "#000000", border: "#000000" },
                  { name: "Sage", val: "#E6EDE8", border: "#D1DED5" },
                  { name: "Blush", val: "#F8F1F1", border: "#EADBEB" }
                ].map((bg) => (
                  <button 
                    key={bg.val}
                    onClick={() => setBgColor(bg.val)}
                    style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      backgroundColor: bg.val,
                      border: "2px solid " + (bgColor === bg.val ? 'var(--text-primary)' : bg.border)
                    }}
                    title={bg.name}
                  />
                ))}
              </div>
            </div>
            
          </div>
        </div>

        {/* Right pane: Strip Preview */}
        <div className="studio-pane" style={{ width: "450px", backgroundColor: "#F3F4F6", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto", flexShrink: 0 }}>
          
          <div 
            ref={stripRef}
            style={{
            position: 'relative',
            width: '100%',
            maxWidth: layout === "2x2-grid" ? "380px" : "300px",
            paddingTop: '50px',
            paddingBottom: '20px',
            paddingLeft: '10px',
            paddingRight: '10px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Top Floating Reaction Pill */}
            <div style={{
              position: 'absolute',
              top: '5px',
              left: '20px',
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
              backgroundColor: bgColor, 
              borderRadius: '24px',
              padding: '12px',
              boxShadow: '0 12px 48px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(0,0,0,0.03)',
              transition: "background-color 0.3s",
            }}>
              
              {/* Photo Strip Area */}
              <div style={{
                display: 'flex',
                flexDirection: layout === "2x2-grid" ? "row" : "column",
                flexWrap: layout === "2x2-grid" ? "wrap" : "nowrap",
                gap: '8px',
                width: '100%',
              }}>
                {[...Array(expectedPhotos)].map((_, i) => (
                  <div key={i} style={{ 
                    backgroundColor: "rgba(0,0,0,0.05)", 
                    aspectRatio: layout === "2x2-grid" ? "1/1" : "4/3",
                    width: layout === "2x2-grid" ? "calc(50% - 4px)" : "100%",
                    borderRadius: "8px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: photos[i] ? "url(" + photos[i] + ")" : "none",
                    overflow: "hidden"
                  }} />
                ))}
              </div>

              {/* iOS Menu Actions */}
              <div style={{ 
                marginTop: '12px', 
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{ textAlign: 'center', fontSize: '0.65rem', color: bgColor === '#000000' ? '#D1D5DB' : '#9CA3AF', marginBottom: '8px', fontFamily: 'Inter', fontWeight: 500 }}>
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

              <div style={{ textAlign: "center", fontFamily: "Playfair Display", fontStyle: "italic", fontSize: "1rem", color: bgColor === "#000000" ? "#FFF" : "#171717", marginTop: "16px" }}>
                Wink
              </div>
            </div>
          </div>

          <div style={{ marginTop: "2rem", width: "100%", maxWidth: layout === "2x2-grid" ? "380px" : "300px" }}>
            <button 
              className="btn-primary" 
              style={{ width: "100%", opacity: photos.length === expectedPhotos ? 1 : 0.5, cursor: photos.length === expectedPhotos ? "pointer" : "not-allowed" }}
              onClick={handleDownload}
              disabled={photos.length < expectedPhotos}
            >
              Download Strip
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
