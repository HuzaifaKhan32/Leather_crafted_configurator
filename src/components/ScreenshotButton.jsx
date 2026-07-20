import React from 'react';
import html2canvas from 'html2canvas';
import './ScreenshotButton.css'; // CSS file ko import karein

export default function ScreenshotButton() {
  
  // Function ka naam sahi kiya (pbAiButton)
  const handleScreenshot = async () => {
    const element = document.body; 
    
    const canvas = await html2canvas(element, {
      useCORS: true,
      logging: false,
      allowTaint: true
    });
    
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "jacket-design.png";
    link.click();
  };

  return (
    <button className="pb-ai-button" onClick={handleScreenshot}>
      <img src="/model/screenshoot.png" alt="Screenshot" style={{ width: '20px', marginRight: '8px' }} />
      <span>Screenshot</span>
      <span className="pb-ai-sparkle">✦</span>
    </button>
  );
}
