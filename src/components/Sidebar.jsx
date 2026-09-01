import React from 'react';

export default function Sidebar({ setActiveTab, activeTab }) {
  return (
    <div className="custom-sidebar">
      {/* Design Tab */}
      <div className="tab-item" onClick={() => setActiveTab(activeTab === 'Design' ? null : 'Design')}>
        <div className={`icon-wrapper ${activeTab === 'Design' ? 'active' : ''}`}>
          <img src="/model/jacket(1).png" alt="Design" style={{ width: '28px' }} />
        </div>
        <p className="tab-label">Design</p>
      </div>

      {/* Color Tab */}
      <div className="tab-item" onClick={() => setActiveTab(activeTab === 'Color' ? null : 'Color')}>
        <div className={`icon-wrapper ${activeTab === 'Color' ? 'active' : ''}`}>
          <img src="/model/color-palette.png" alt="Color" style={{ width: '32px' }} />
        </div>
        <p className="tab-label">Color</p>
      </div>

      <style>{`
        .custom-sidebar {
          position: absolute;
          left: 10px;
          top: 320px;
          width: 60px;
          height: 170px;
          backdrop-filter: blur(20px);
          background: rgba(150, 145, 145, 0.6);
          border-radius: 70px;
          padding: 30px 10px;
          border: 1px solid rgba(255, 255, 255, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          z-index: 100;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }

        .tab-item {
          text-align: center;
          cursor: pointer;
        }

        .icon-wrapper {
          width: 55px;
          height: 55px;
          background: #ffffff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }

        .icon-wrapper.active {
          background: #faf0ed;
          transform: scale(1.05);
        }

        .tab-label {
          color: #fff;
          font-size: 10px;
          font-weight: bold;
          text-transform: uppercase;
          margin-top: 5px;
        }

        @media (max-width: 1024px) {
          .custom-sidebar {
            left: 50%;
            top: auto;
            bottom: calc(20px + env(safe-area-inset-bottom));
            transform: translateX(-50%);
            width: 140px;
            height: 48px;
            border-radius: 40px;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            padding: 5px 15px;
            gap: 0;
            z-index: 1001;
            position: fixed;
          }

          .icon-wrapper {
            width: 38px;
            height: 38px;
          }

          .tab-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}