import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { state } from '../store';

const getCleanHex = (colorVal, fallback = '#111111') => {
  if (!colorVal) return fallback;
  let hex = typeof colorVal === 'object' && colorVal.hex ? colorVal.hex : colorVal;
  if (typeof hex === 'string') {
    if (hex.startsWith('#') && hex.length === 9) {
      return hex.substring(0, 7);
    }
    return hex;
  }
  return fallback;
};

export default function AddToCartButton({ onOpenCart }) {
  const snap = useSnapshot(state);
  const [added, setAdded] = useState(false);
  const currentModelPath = snap.currentModel;
  const currentPrice = snap.prices?.[currentModelPath] || 260;

  const handleAddToCart = () => {
    const modelSpecific = snap.modelsSettings?.[currentModelPath];

    const currentSettings = {
      body: getCleanHex(modelSpecific?.body || snap.color, '#8B4513'),
      inner: getCleanHex(modelSpecific?.inner || snap.innerColor, '#2F3538'),
      zip: getCleanHex(modelSpecific?.zip || snap.zipColor, '#D4AF37'),
    };

    const canvas = document.querySelector('canvas');
    const previewImg = canvas ? canvas.toDataURL('image/png') : null;

    const existingIndex = state.cart.findIndex(
      (item) =>
        item.modelPath === currentModelPath &&
        item.colors.body === currentSettings.body &&
        item.colors.inner === currentSettings.inner &&
        item.colors.zip === currentSettings.zip &&
        item.texture === snap.currentTexture
    );

    if (existingIndex !== -1) {
      state.cart[existingIndex].quantity = (state.cart[existingIndex].quantity || 1) + 1;
      if (previewImg) state.cart[existingIndex].previewImage = previewImg;
    } else {
      const rawName = currentModelPath.replace(/^\/model\//i, '').replace(/\.glb$/i, '').replace(/_/g, ' ');
      const cartItem = {
        id: Date.now(),
        modelPath: currentModelPath,
        modelName: rawName,
        texture: snap.currentTexture,
        previewImage: previewImg,
        colors: currentSettings,
        price: currentPrice,
        quantity: 1,
      };
      state.cart.push(cartItem);
    }

    localStorage.setItem('jacket_cart', JSON.stringify(state.cart));

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const totalCartCount = snap.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <>
      <div className="cart-action-group" role="region" aria-label="Cart Actions">
        <button 
          className={`bottom-right-cart-btn ${added ? 'is-added' : ''}`} 
          onClick={handleAddToCart} 
          title="Add this customization to your bag"
          type="button"
        >
          <span className="cart-icon">
            {added ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            )}
          </span>
          <span className="cart-text">
            {added ? 'Added to Bag!' : `Add to Bag • $${currentPrice}`}
          </span>
        </button>

        {totalCartCount > 0 && (
          <button 
            className="cart-badge-btn" 
            onClick={onOpenCart}
            title="View Customization Bag"
            type="button"
          >
            <span className="badge-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </span>
            <span>Bag</span>
            <span className="cart-counter-bubble">{totalCartCount}</span>
          </button>
        )}
      </div>

      <style>{`
        .cart-action-group {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 100;
          display: flex;
          gap: 12px;
          align-items: center;
          animation: floatInActions 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes floatInActions {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bottom-right-cart-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #c27838 0%, #8a4816 100%);
          color: #ffffff;
          padding: 13px 24px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.3px;
          cursor: pointer;
          border: none;
          box-shadow: 0 8px 24px rgba(194, 120, 56, 0.38), 0 2px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
        }

        .bottom-right-cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(194, 120, 56, 0.48);
          background: linear-gradient(135deg, #d48744 0%, #99501a 100%);
        }

        .bottom-right-cart-btn.is-added {
          background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
          box-shadow: 0 8px 24px rgba(46, 125, 50, 0.4);
          transform: scale(1.03);
        }

        .cart-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-badge-btn {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          color: #111827;
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding: 10px 18px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          outline: none;
        }

        .cart-badge-btn:hover {
          background: #ffffff;
          border-color: #c27838;
          color: #80471c;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
        }

        .badge-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-counter-bubble {
          background: #c27838;
          color: #ffffff;
          font-size: 10px;
          font-weight: 800;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(194, 120, 56, 0.4);
          animation: popBubble 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes popBubble {
          0% { transform: scale(0.6); }
          100% { transform: scale(1); }
        }

        @media (max-width: 768px) {
          .cart-action-group {
            bottom: calc(20px + env(safe-area-inset-bottom, 0px));
            right: 16px;
            gap: 10px;
          }

          .bottom-right-cart-btn {
            padding: 0;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            justify-content: center;
          }

          .cart-text {
            display: none !important;
          }

          .cart-badge-btn {
            padding: 0;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            justify-content: center;
            position: relative;
          }

          .cart-badge-btn span:nth-child(2) {
            display: none;
          }

          .cart-counter-bubble {
            position: absolute;
            top: -4px;
            right: -4px;
          }
        }
      `}</style>
    </>
  );
}