import React, { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';
import JacketCanvas from './components/JacketCanvas';
import Logo from './components/Logo';
import ScreenshotButton from './components/ScreenshotButton';
import AddToCartButton from './components/AddToCartButton';
import CartDrawer from './components/CartDrawer';
import SizeGuideDrawer from './components/SizeGuideDrawer';

// Correct path to your state file
import { state } from './store'; 

export default function App() {
  const [activeTab, setActiveTab] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Subscribe to Valtio state changes
  const snap = useSnapshot(state);
  
  // Active Jacket Model local state
  const [currentModel, setCurrentModel] = useState(null);

  // Clear customization history on model switch
  useEffect(() => {
    if (currentModel) {
      localStorage.removeItem('jacket_customization');
      localStorage.removeItem('cart_data');
      setIsCartOpen(false);
    }
  }, [currentModel]);

  const currentModelPath = snap.currentModel;
  const activePrice = snap.prices?.[currentModelPath] || 260;
  const activeModelDisplayName = currentModelPath
    ? currentModelPath.replace(/^\/model\//i, '').replace(/\.glb$/i, '').replace(/_/g, ' ')
    : 'Bespoke Leather Jacket';

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* 3D Canvas */}
      <JacketCanvas currentModel={currentModel} />

      {/* Top Header Bar */}
      <header className="top-header-bar">
        <Logo />

        {/* Center Live Active Jacket Badge */}
        <div className="active-model-pill" title={activeModelDisplayName}>
          <span className="pill-pulse-dot" />
          <span className="pill-model-name">{activeModelDisplayName}</span>
          <span className="pill-divider">•</span>
          <span className="pill-price">${activePrice}</span>
        </div>

        {/* Top Right Tool Actions */}
        <div className="top-right-controls">
          {/* 360° Auto-Rotate Toggle */}
          <button 
            className={`header-tool-btn ${snap.autoRotate ? 'is-active' : ''}`}
            onClick={() => { state.autoRotate = !state.autoRotate; }}
            title={snap.autoRotate ? "Pause 360° Rotation" : "Auto-Rotate 360°"}
            type="button"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={snap.autoRotate ? 'rotate-svg-spin' : ''}>
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            <span className="tool-btn-text">360°</span>
          </button>

          {/* Size Guide Trigger Button */}
          <button 
            className="header-tool-btn size-guide-btn"
            onClick={() => setIsSizeGuideOpen(true)}
            title="Open Interactive Size Guide"
            type="button"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2"></rect>
              <path d="M6 6v4M10 6v2M14 6v4M18 6v2"></path>
            </svg>
            <span className="tool-btn-text">Size Guide</span>
          </button>
        </div>
      </header>

      {/* Bottom Floating Controls */}
      <ScreenshotButton onCapture={() => console.log('Capture')} />
      <AddToCartButton onOpenCart={() => setIsCartOpen(true)} />

      {/* Cart Drawer Modal */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        currentModel={currentModel}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onRemoveModel={() => setCurrentModel(null)}
      />

      {/* Size Guide Drawer Modal */}
      <SizeGuideDrawer 
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        modelName={snap.currentModel || ''}
      />

      {/* Navigation Panels */}
      {!activeTab ? (
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onSelectModel={(model) => setCurrentModel(model)}
        />
      ) : (
        <MainPanel 
          activeCategory={activeTab} 
          onClose={() => setActiveTab(null)} 
          onSelectModel={(model) => setCurrentModel(model)}
        />
      )}

      <style>{`
        .top-header-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          z-index: 100;
          pointer-events: none;
          padding-top: env(safe-area-inset-top, 0px);
          gap: 16px;
        }

        .active-model-pill {
          pointer-events: auto;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 8px 18px;
          border-radius: 30px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          max-width: 440px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          animation: dropInHeader 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes dropInHeader {
          from {
            opacity: 0;
            transform: translateY(-16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pill-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #c27838;
          box-shadow: 0 0 10px rgba(194, 120, 56, 0.6);
          flex-shrink: 0;
          animation: pulseGlow 2s infinite ease-in-out;
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        .pill-model-name {
          font-size: 12px;
          font-weight: 700;
          color: #111827;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: 0.3px;
        }

        .pill-divider {
          color: rgba(0, 0, 0, 0.2);
          font-size: 11px;
        }

        .pill-price {
          font-size: 13px;
          font-weight: 800;
          color: #80471c;
          white-space: nowrap;
        }

        .top-right-controls {
          pointer-events: auto;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          animation: dropInHeader 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .header-tool-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 30px;
          padding: 9px 16px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.3px;
          color: #374151;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
        }

        .header-tool-btn:hover {
          background: #ffffff;
          border-color: rgba(194, 120, 56, 0.4);
          color: #111827;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);
        }

        .header-tool-btn.is-active {
          background: linear-gradient(135deg, #c27838 0%, #8f4b18 100%);
          border-color: transparent;
          color: #ffffff;
          box-shadow: 0 4px 16px rgba(194, 120, 56, 0.4);
        }

        .rotate-svg-spin {
          animation: spin360 4s linear infinite;
        }

        @keyframes spin360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .size-guide-btn:hover {
          border-color: #c27838;
          color: #80471c;
        }

        @media (max-width: 900px) {
          .top-header-bar {
            padding: 0 16px;
            padding-top: env(safe-area-inset-top, 0px);
            height: 60px;
          }

          .active-model-pill {
            display: none;
          }

          .tool-btn-text {
            font-size: 11px;
          }
        }

        @media (max-width: 480px) {
          .top-header-bar {
            padding: 0 12px;
            padding-top: env(safe-area-inset-top, 0px);
            gap: 8px;
          }

          .header-tool-btn {
            padding: 7px 12px;
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}