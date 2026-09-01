import React from 'react';
import './ScreenshotButton.css'; // Pure CSS styling import

export default function ScreenshotButton({ onCapture }) {
  
  // 📸 Capture & Download Functionality
  const handleCapture = () => {
    const canvas = document.querySelector("canvas");

    if (!canvas) {
      alert("Canvas element not found!");
      return;
    }

    try {
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = `custom-leather-jacket-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (onCapture) onCapture(image);

    } catch (error) {
      console.error("Screenshot capture failed:", error);
      alert("Screenshot capture nahi ho saka. Ensure gl={{ preserveDrawingBuffer: true }} is set in Canvas.");
    }
  };

  return (
    <>
      <button className="pb-ai-button bottom-left-screenshot-btn" onClick={handleCapture} title="Take Screenshot">
        <span className="pb-ai-sparkle">📷</span>
        <span className="btn-text">Screenshot</span>
      </button>

      <style>{`
        .bottom-left-screenshot-btn {
          position: fixed;
          bottom: 25px;
          left: 20px;
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(150, 145, 145, 0.6);
          color: #fff;
          padding: 10px 20px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }

        .bottom-left-screenshot-btn:hover {
          background: #615d5a;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .bottom-left-screenshot-btn {
            bottom: 25px !important; /* Equal line with Cart Button */
            left: 15px !important;
            padding: 0 !important;
            border-radius: 50% !important;
            width: 44px !important;
            height: 44px !important;
            justify-content: center !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
          }

          /* Mobile par text hide, sirf camera icon 📷 */
          .bottom-left-screenshot-btn .btn-text {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}