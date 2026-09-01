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

  const handleAddToCart = () => {
    const currentModelPath = snap.currentModel;
    const modelSpecific = snap.modelsSettings?.[currentModelPath];

    const currentSettings = {
      body: getCleanHex(modelSpecific?.body || snap.color, '#8B4513'),
      inner: getCleanHex(modelSpecific?.inner || snap.innerColor, '#2F3538'),
      zip: getCleanHex(modelSpecific?.zip || snap.zipColor, '#D4AF37'),
    };

    const canvas = document.querySelector('canvas');
    const previewImg = canvas ? canvas.toDataURL('image/png') : null;
    const currentPrice = snap.prices?.[currentModelPath] || 260;

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
      const rawName = currentModelPath.split('/').pop().replace('.glb', '').replace(/_/g, ' ');
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
      <div className="cart-action-group">
        <button className="bottom-right-cart-btn" onClick={handleAddToCart} title="Add to Cart">
          <span className="cart-icon">{added ? '✓' : '🛒'}</span>
          <span className="cart-text">{added ? 'Added!' : 'Add to Cart'}</span>
        </button>

        {totalCartCount > 0 && (
          <button className="cart-badge-btn" onClick={onOpenCart}>
            <span>View Cart ({totalCartCount})</span>
          </button>
        )}
      </div>

      <style>{`
        .cart-action-group {
          position: fixed;
          bottom: 25px;
          right: 20px;
          z-index: 100;
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .bottom-right-cart-btn {
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
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .bottom-right-cart-btn:hover {
          background: #615d5a;
          transform: translateY(-2px);
        }

        .cart-icon { font-size: 16px; }

        .cart-badge-btn {
          background: #96919199;
          backdrop-filter: blur(10px);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 10px 16px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cart-badge-btn:hover {
          background: #e98400;
          color: #000000;
        }

        @media (max-width: 768px) {
          .cart-action-group {
            bottom: 25px !important;
            right: 15px !important;
            gap: 8px !important;
          }

          .bottom-right-cart-btn {
            padding: 0 !important;
            border-radius: 50% !important;
            width: 44px !important;
            height: 44px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
          }

          .cart-text { display: none !important; }

          .cart-badge-btn {
            padding: 8px 12px;
            font-size: 11px;
            border-radius: 20px;
          }
        }
      `}</style>
    </>
  );
}