import React, { useState } from 'react';

export default function ScreenshotButton({ onCapture }) {
  const [capturing, setCapturing] = useState(false);
  const [captured, setCaptured] = useState(false);

  // 📸 Capture & Download Functionality
  const handleCapture = () => {
    const canvas = document.querySelector("canvas");

    if (!canvas) {
      alert("Canvas element not found!");
      return;
    }

    try {
      setCapturing(true);
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = `custom-leather-jacket-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (onCapture) onCapture(image);

      setCapturing(false);
      setCaptured(true);
      setTimeout(() => setCaptured(false), 2200);

    } catch (error) {
      setCapturing(false);
      console.error("Screenshot capture failed:", error);
      alert("Screenshot capture failed. Ensure gl={{ preserveDrawingBuffer: true }} is set in Canvas.");
    }
  };

  return (
    <>
      <button 
        className={`bottom-left-screenshot-btn ${captured ? 'is-saved' : ''}`}
        onClick={handleCapture} 
        title="Download high-resolution 3D jacket snapshot"
        type="button"
        disabled={capturing}
      >
        <span className="screenshot-icon">
          {captured ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          )}
        </span>
        <span className="btn-text">
          {captured ? 'Saved!' : capturing ? 'Capturing...' : 'Snapshot'}
        </span>
      </button>

      <style>{`
        .bottom-left-screenshot-btn {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 100;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          color: #111827;
          padding: 12px 20px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
          animation: floatInSnapshot 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes floatInSnapshot {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bottom-left-screenshot-btn:hover {
          background: #ffffff;
          border-color: #c27838;
          color: #80471c;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
        }

        .bottom-left-screenshot-btn.is-saved {
          background: #d1fae5;
          border-color: #6ee7b7;
          color: #065f46;
          transform: scale(1.03);
        }

        .screenshot-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .bottom-left-screenshot-btn {
            bottom: calc(20px + env(safe-area-inset-bottom, 0px));
            left: 16px;
            padding: 0;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            justify-content: center;
          }

          .bottom-left-screenshot-btn .btn-text {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}