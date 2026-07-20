import React, { useState } from 'react';
import JacketCanvas from './components/JacketCanvas.jsx';
import Sidebar from './components/Sidebar.jsx';
import MainPanel from './components/MainPanel.jsx';
import ScreenshotButton from './components/ScreenshotButton';
import Logo from './components/Logo.jsx';


export default function App() {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#92cae4' }}>
      <Logo />
      
      {/* 3D Scene */}
      <JacketCanvas />

      {/* 1. Sidebar (Left Side) */}
      <div style={{ position: 'absolute', left: '20px', top: '200px', zIndex: 100 }}>
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>

      {/* 2. MainPanel */}
      {activeTab && (
        <div style={{ 
          position: 'absolute', 
          left: '120px', 
          top: '150px', 
          zIndex: 1000 
        }}>
          <MainPanel activeCategory={activeTab} onClose={() => setActiveTab(null)} />
        </div>
      )}
      
      {/* 3. Screenshot Button (Niche Left Side Corner Par) */}
      <div style={{ position: 'absolute', bottom: '40px', left: '40px', zIndex: 100 }}>
        <ScreenshotButton />
      </div>

      {/* 4. Add to Cart Button (Ab Ye Niche Right Side Corner Par Hai) */}
      <div style={{ position: 'absolute', bottom: '40px', right: '40px', zIndex: 100 }}>
        <button 
          onClick={() => alert("Added to Cart!")}
          style={{
            cursor: 'pointer', border: 'none', padding: '15px 25px', borderRadius: '999px', 
            color: '#fff', fontSize: '16px', fontWeight: '600',
            background: 'linear-gradient(180deg, #8b5a32 0%, #000000 100%)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)', transition: 'all 0.3s ease'
          }}
        >
          🛒 Add to Cart
        </button>
      </div>

    </div>
  );
}