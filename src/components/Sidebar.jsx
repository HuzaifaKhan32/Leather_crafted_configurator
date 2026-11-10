import React from 'react';

export default function Sidebar({ setActiveTab, activeTab }) {
  return (
    <div className="custom-sidebar" role="toolbar" aria-label="Customizer Navigation">
      {/* Design / Style Tab */}
      <button 
        className={`tab-item ${activeTab === 'Design' ? 'is-active' : ''}`}
        onClick={() => setActiveTab(activeTab === 'Design' ? null : 'Design')}
        title="Choose Jacket Style"
        type="button"
      >
        <div className="icon-wrapper">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
          </svg>
        </div>
        <span className="tab-label">Style</span>
      </button>

      <div className="sidebar-divider" />

      {/* Color Tab */}
      <button 
        className={`tab-item ${activeTab === 'Color' ? 'is-active' : ''}`}
        onClick={() => setActiveTab(activeTab === 'Color' ? null : 'Color')}
        title="Customize Colors & Textures"
        type="button"
      >
        <div className="icon-wrapper">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
          </svg>
        </div>
        <span className="tab-label">Color</span>
      </button>

      <style>{`
        .custom-sidebar {
          position: fixed;
          left: 24px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 12px 8px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 40px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.16), 0 2px 8px rgba(0, 0, 0, 0.06);
          z-index: 100;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          animation: sidebarFloatIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes sidebarFloatIn {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
          }
        }

        .sidebar-divider {
          width: 24px;
          height: 1px;
          background: rgba(0, 0, 0, 0.08);
          margin: 2px 0;
        }

        .tab-item {
          background: transparent;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          cursor: pointer;
          padding: 6px 4px;
          border-radius: 24px;
          color: #6b7280;
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
          width: 52px;
          outline: none;
        }

        .tab-item:hover {
          color: #111827;
        }

        .tab-item:hover .icon-wrapper {
          background: rgba(0, 0, 0, 0.06);
          transform: translateY(-2px);
          color: #111827;
        }

        .icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.06);
          color: inherit;
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .tab-item.is-active {
          color: #80471c;
        }

        .tab-item.is-active .icon-wrapper {
          background: linear-gradient(135deg, #c27838 0%, #8f4b18 100%);
          border-color: rgba(255, 255, 255, 0.6);
          color: #ffffff;
          box-shadow: 0 6px 18px rgba(194, 120, 56, 0.45);
          transform: scale(1.08);
        }

        .tab-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .custom-sidebar {
            left: 50%;
            top: auto;
            bottom: calc(20px + env(safe-area-inset-bottom, 0px));
            transform: translateX(-50%);
            flex-direction: row;
            padding: 6px 12px;
            border-radius: 40px;
            gap: 10px;
            z-index: 120;
            box-shadow: 0 12px 36px rgba(0, 0, 0, 0.25);
            animation: sidebarMobileSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          }

          @keyframes sidebarMobileSlideUp {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(24px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }

          .sidebar-divider {
            width: 1px;
            height: 24px;
            margin: 0 2px;
          }

          .tab-item {
            width: 48px;
            padding: 2px;
          }

          .tab-item .tab-label {
            display: none;
          }

          .icon-wrapper {
            width: 42px;
            height: 42px;
          }
        }
      `}</style>
    </div>
  );
}