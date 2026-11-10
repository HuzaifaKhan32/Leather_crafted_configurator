import React from 'react';

export default function Logo() {
  return (
    <div className="brand-logo-container">
      <img 
        src="/model/logo_clean.png" 
        alt="LeatherCrafted"
        className="brand-logo-img"
      />
      <style>{`
        .brand-logo-container {
          position: relative;
          display: flex;
          align-items: center;
          pointer-events: auto;
          flex-shrink: 0;
          z-index: 10;
        }

        .brand-logo-img {
          height: 38px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
          transition: transform 0.25s ease;
          display: block;
        }

        .brand-logo-img:hover {
          transform: scale(1.03);
        }

        @media (max-width: 768px) {
          .brand-logo-img {
            height: 28px;
          }
        }

        @media (max-width: 480px) {
          .brand-logo-img {
            height: 24px;
          }
        }
      `}</style>
    </div>
  );
}
