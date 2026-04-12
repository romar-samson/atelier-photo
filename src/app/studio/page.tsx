/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

type LayoutType = "3-vertical" | "4-vertical" | "2x2-grid";

export default function StudioPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const handleDownload = () => {
    if (photos.length === 0) return;

    // Create offscreen canvas to compose strip
    const offCanvas = document.createElement("canvas");
    const ctx = offCanvas.getContext("2d");
    if (!ctx) return;

    const imgPadding = 20;
    const outerPadding = 40;
    const bottomSpace = 120; // space for branding

    // Load images asynchronously
    Promise.all(
      photos.map(
        (data) =>
          new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.src = data;
            img.onload = () => resolve(img);
          })
      )
    ).then((imgs) => {
      if (imgs.length === 0) return;
      
      const aspect = imgs[0].width / imgs[0].height;
      const imgWidth = 600;
      const imgHeight = imgWidth / aspect;

      if (layout === "2x2-grid") {
        offCanvas.width = outerPadding * 2 + imgWidth * 2 + imgPadding;
        offCanvas.height = outerPadding * 2 + imgHeight * 2 + imgPadding + bottomSpace;
        
        // draw bg
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, offCanvas.width, offCanvas.height);
        
        imgs.forEach((img, idx) => {
          const col = idx % 2;
          const row = Math.floor(idx / 2);
          const x = outerPadding + col * (imgWidth + imgPadding);
          const y = outerPadding + row * (imgHeight + imgPadding);
          ctx.drawImage(img, x, y, imgWidth, imgHeight);
        });

      } else {
        // Vertical layout
        const count = layout === "3-vertical" ? 3 : 4;
        offCanvas.width = outerPadding * 2 + imgWidth;
        offCanvas.height = outerPadding * 2 + (imgHeight * count) + (imgPadding * (count - 1)) + bottomSpace;

        // draw bg
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, offCanvas.width, offCanvas.height);

        imgs.forEach((img, idx) => {
          if (idx >= count) return;
          const x = outerPadding;
          const y = outerPadding + idx * (imgHeight + imgPadding);
          ctx.drawImage(img, x, y, imgWidth, imgHeight);
        });
      }

      // Add branding text
      ctx.fillStyle = bgColor === "#000000" ? "#ffffff" : "#171717";
      ctx.font = "italic 40px 'Playfair Display', serif";
      ctx.textAlign = "center";
      ctx.fillText("Atelier Booth", offCanvas.width / 2, offCanvas.height - 40);

      // Trigger download
      const dataUri = offCanvas.toDataURL("image/jpeg", 0.9);
      const link = document.createElement("a");
      link.href = dataUri;
      link.download = `atelier-strip-${Date.now()}.jpg`;
      link.click();
    });
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
            {streamActive ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }} 
              />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
          
          <div style={{
            backgroundColor: bgColor,
            padding: "20px 20px 80px 20px",
            boxShadow: "var(--shadow-lg)",
            transition: "background-color 0.3s",
            width: "100%",
            maxWidth: layout === "2x2-grid" ? "380px" : "300px",
            display: "flex",
            flexDirection: layout === "2x2-grid" ? "row" : "column",
            flexWrap: layout === "2x2-grid" ? "wrap" : "nowrap",
            gap: "10px",
            position: "relative"
          }}>
            {[...Array(expectedPhotos)].map((_, i) => (
              <div key={i} style={{ 
                backgroundColor: "rgba(0,0,0,0.05)", 
                aspectRatio: "4/3",
                width: layout === "2x2-grid" ? "calc(50% - 5px)" : "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: photos[i] ? "url(" + photos[i] + ")" : "none"
              }} />
            ))}
            
            <div style={{
              position: "absolute", bottom: "25px", left: 0, right: 0,
              textAlign: "center", fontFamily: "Playfair Display", fontStyle: "italic",
              fontSize: "1.25rem", color: bgColor === "#000000" ? "#FFF" : "#171717"
            }}>
              Atelier Booth
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
