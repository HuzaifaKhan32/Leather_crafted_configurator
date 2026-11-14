import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { state } from '../store';

const getValidColorString = (colorVal, fallback = '#111111') => {
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

// Comprehensive Color Map
const COLOR_NAME_MAP = {
  '#322681': 'Purple',
  '#2c1914': 'Dark Brown',
  '#7a4328': 'Cognac',
  '#802329': 'Maroon',
  '#080808': 'Black',
  '#0c0b0b': 'Black',
  '#000000': 'Black',
  '#172e6d': 'Blue',
  '#a79675': 'Cream',
  '#703511': 'Tan Brown',
  '#36241c': 'Dark Brown',
  '#d8d8d8': 'Silver',
  '#a09d9d': 'Silver',
  '#83734f': 'Brass',
  '#65696d': 'Gunmetal',
};

const COLOR_PALETTE = [
  { name: 'Black', hex: '#000000' },
  { name: 'Maroon', hex: '#802329' },
  { name: 'Dark Brown', hex: '#2c1914' },
  { name: 'Cognac', hex: '#7a4328' },
  { name: 'Tan Brown', hex: '#703511' },
  { name: 'Cream', hex: '#a79675' },
  { name: 'Navy Blue', hex: '#172e6d' },
  { name: 'Purple', hex: '#322681' },
  { name: 'Silver', hex: '#d8d8d8' },
  { name: 'Gunmetal', hex: '#65696d' },
  { name: 'Brass', hex: '#83734f' },
  { name: 'White', hex: '#ffffff' },
];

const hexToRgb = (hex) => {
  const cleanHex = hex.replace('#', '');
  const num = parseInt(cleanHex.length === 3 ? cleanHex.split('').map((c) => c + c).join('') : cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
};

const resolveColorName = (colorVal) => {
  const hex = getValidColorString(colorVal).toLowerCase();
  if (COLOR_NAME_MAP[hex]) return COLOR_NAME_MAP[hex];

  try {
    const targetRgb = hexToRgb(hex);
    let closestName = hex;
    let minDistance = Infinity;

    COLOR_PALETTE.forEach((item) => {
      const currentRgb = hexToRgb(item.hex);
      const distance = Math.sqrt(
        Math.pow(targetRgb.r - currentRgb.r, 2) +
          Math.pow(targetRgb.g - currentRgb.g, 2) +
          Math.pow(targetRgb.b - currentRgb.b, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestName = item.name;
      }
    });

    return closestName;
  } catch (err) {
    return hex;
  }
};

const PRODUCT_MAP = {
  "men's genuine leather maverick jacket-shirt collar style": 77331,
  "men's real leather black 3/4 length shearling style": 75664,
  "men's blue leather jacket with faux fur collar": 76166,
  "men's cognac brown real lambskin leather bomber jacket - classic leather jacket": 77037,
  "men's black lambskin faux fur shearling leather bomber jacket": 77179,
  "men's maroon lambskin faux fur shearling leather bomber jacket": 77223,
  "men's real lambskin leather bomber jacket - classic zip-up leather jacket": 77137,

  "women's black real leather b3 bomber cream shearling jacket": 78843,
  "women's cognac cropped genuine lambskin leather trucker jacket": 78163,
  "women's cognac brown genuine lambskin leather bomber jacket": 76812,
  "women's black genuine lambskin leather 3/4 length coat faux fur shearling": 76648,
  "women's blue real lambskin leather bomber jacket - classic zip-up leather jacket": 76770,
  "women's hooded black real lambskin leather faux shearling aviator jacket": 76706,
};

const getProductId = (modelName = '') => {
  if (!modelName) return 79567;

  const cleanName = modelName
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[\u2013\u2014–]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

  if (PRODUCT_MAP[cleanName]) {
    return PRODUCT_MAP[cleanName];
  }

  for (const [key, id] of Object.entries(PRODUCT_MAP)) {
    if (cleanName.includes(key) || key.includes(cleanName)) {
      return id;
    }
  }
  return 79567;
};

export default function CartDrawer({ isOpen, onClose, currentModel, onOpenSizeGuide }) {
  const snap = useSnapshot(state);

  // Sync Cart Data with LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('jacket_cart');
    if (savedCart && state.cart.length === 0) {
      state.cart = JSON.parse(savedCart);
    }
  }, []);

  // Reset cart when active model changes
  useEffect(() => {
  if (currentModel) {
    state.cart = [];
    localStorage.removeItem('jacket_cart');
    localStorage.removeItem('jacket_customization');
  }
}, [currentModel]);

  if (!isOpen) return null;

  const handleRemove = (id) => {
    const index = state.cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      state.cart.splice(index, 1);
      localStorage.setItem('jacket_cart', JSON.stringify(state.cart));
    }
  };

  const handleQtyChange = (id, delta) => {
    const index = state.cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      const currentQty = state.cart[index].quantity || 1;
      const newQty = currentQty + delta;

      if (newQty <= 0) {
        state.cart.splice(index, 1);
      } else {
        state.cart[index].quantity = newQty;
      }
      localStorage.setItem('jacket_cart', JSON.stringify(state.cart));
    }
  };

  const handleSizeChange = (id, newSize) => {
    const index = state.cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      state.cart[index].size = newSize;
      localStorage.setItem('jacket_cart', JSON.stringify(state.cart));
    }
  };

  const partLabels = {
    body: 'Body Color',
    inner: 'Inner Color',
    zip: 'Zip Color',
  };

  const handleProceedToWooCheckout = () => {
    if (snap.cart.length === 0) return;

    // Structured items array for multi-item cart endpoints
    const itemsPayload = snap.cart.map((item, idx) => {
      const bodyColor = item.colors?.body ? resolveColorName(item.colors.body) : 'N/A';
      const innerColor = item.colors?.inner ? resolveColorName(item.colors.inner) : 'N/A';
      const zipColor = item.colors?.zip ? resolveColorName(item.colors.zip) : 'N/A';
      const selectedSize = item.size || 'M';
      const pId = getProductId(item.modelName);

      return {
        item_index: idx + 1,
        product_id: pId,
        model_name: item.modelName || 'Custom Jacket',
        quantity: item.quantity || 1,
        size: selectedSize,
        price: item.price,
        body: bodyColor,
        inner: innerColor,
        zip: zipColor,
        custom_jacket: `[Item ${idx + 1}: ${item.modelName || 'Custom Jacket'}] Size: ${selectedSize} | Body: ${bodyColor} | Inner: ${innerColor} | Zip: ${zipColor}`,
      };
    });

    const primaryItem = itemsPayload[0];

    const customDetails = itemsPayload
      .map((item) => item.custom_jacket)
      .join(' || ');

    const itemsParam = encodeURIComponent(JSON.stringify(itemsPayload));
    const productIdsParam = encodeURIComponent(itemsPayload.map((it) => it.product_id).join(','));
    const quantitiesParam = encodeURIComponent(itemsPayload.map((it) => it.quantity).join(','));

    const customizerEndpoint = `https://leather-crafted.com/wp-json/customizer/v1/add-and-checkout?product_id=${primaryItem.product_id}&quantity=${primaryItem.quantity}&size=${encodeURIComponent(primaryItem.size)}&attribute_pa_size=${encodeURIComponent(primaryItem.size.toLowerCase())}&variation_size=${encodeURIComponent(primaryItem.size)}&custom_jacket=${encodeURIComponent(customDetails)}&items=${itemsParam}&product_ids=${productIdsParam}&quantities=${quantitiesParam}`;

    const newTab = window.open(customizerEndpoint, '_blank');
    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
      window.location.href = customizerEndpoint;
    }
  };

  const totalPrice = Number(snap.cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2));
  const totalItemCount = snap.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="cart-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Shopping Bag">
      <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title-group">
            <span className="cart-eyebrow">YOUR BESPOKE ORDER</span>
            <h3>Shopping Bag ({totalItemCount})</h3>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close bag">✕</button>
        </div>

        {/* Item List */}
        <div className="cart-items-list">
          {snap.cart.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <p className="empty-msg">Your bespoke bag is currently empty.</p>
              <span className="empty-hint">Customize your jacket and click "Add to Bag" to begin.</span>
            </div>
          ) : (
            snap.cart.map((item) => (
              <div key={item.id} className="cart-item-card">
                {item.previewImage && (
                  <div className="item-preview-frame">
                    <img src={item.previewImage} alt="Jacket Preview" />
                  </div>
                )}

                <div className="item-info">
                  <div className="item-header-row">
                    <h4 className="item-name">{item.modelName || 'Custom Jacket'}</h4>
                    <button className="remove-btn" onClick={() => handleRemove(item.id)} title="Remove item">✕</button>
                  </div>

                  <p className="price-tag">
                    <span className="price-label">Subtotal:</span>
                    <strong className="price-amount">${(item.price * (item.quantity || 1)).toFixed(2)}</strong>
                    {item.quantity > 1 && (
                      <span className="per-item-note">(${item.price} each)</span>
                    )}
                  </p>

                  <div className="color-details-list">
                    {item.colors &&
                      Object.entries(item.colors).map(([partKey, colorVal]) => {
                        const finalColorHex = getValidColorString(colorVal);
                        const displayColorName = resolveColorName(colorVal);
                        return (
                          <div key={partKey} className="color-detail-item">
                            <span className="part-name">{partLabels[partKey] || partKey}:</span>
                            <span
                              className="color-dot"
                              style={{ backgroundColor: finalColorHex }}
                              title={`${partLabels[partKey] || partKey}: ${displayColorName}`}
                            />
                            <span className="color-val-label">{displayColorName}</span>
                          </div>
                        );
                      })}
                  </div>

                  <div className="size-select-row">
                    <div className="size-left">
                      <label className="size-label">Size:</label>
                      <select
                        value={item.size || 'M'}
                        onChange={(e) => handleSizeChange(item.id, e.target.value)}
                        className="size-dropdown"
                      >
                        <option value="XS">XS (Extra Small)</option>
                        <option value="S">S (Small)</option>
                        <option value="M">M (Medium)</option>
                        <option value="L">L (Large)</option>
                        <option value="XL">XL (Extra Large)</option>
                        <option value="XXL">XXL (2X Large)</option>
                        <option value="XXXL">XXXL (3X Large)</option>
                      </select>
                    </div>

                    {onOpenSizeGuide && (
                      <button className="size-guide-trigger" onClick={onOpenSizeGuide} type="button">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                          <path d="M6 6v4M10 6v2M14 6v4M18 6v2"></path>
                        </svg>
                        <span>Size Chart</span>
                      </button>
                    )}
                  </div>

                  <div className="qty-control-row">
                    <span className="qty-label">Quantity:</span>
                    <div className="qty-picker">
                      <button onClick={() => handleQtyChange(item.id, -1)} aria-label="Decrease quantity">−</button>
                      <span className="qty-val">{item.quantity || 1}</span>
                      <button onClick={() => handleQtyChange(item.id, 1)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {snap.cart.length > 0 && (
          <div className="cart-footer">
            <div className="total-row">
              <div className="total-label-group">
                <span className="total-eyebrow">ORDER TOTAL</span>
                <span className="total-label">Grand Total</span>
              </div>
              <strong className="total-price">${totalPrice.toFixed(2)}</strong>
            </div>

            <div className="shipping-perk-badge">
              <span>✦ Free Worldwide Express Insured Delivery</span>
            </div>

            <button className="checkout-btn place-order-btn" onClick={handleProceedToWooCheckout} type="button">
              <span>Proceed to Checkout</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .cart-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 2000;
          display: flex;
          justify-content: flex-end;
          align-items: stretch;
          overflow: hidden;
          animation: overlayFadeIn 0.25s ease;
        }

        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .cart-modal-content {
          width: 480px;
          max-width: 100vw;
          height: 100%;
          background: #ffffff;
          border-left: 1px solid rgba(0, 0, 0, 0.08);
          color: #111827;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          box-shadow: -20px 0 50px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          animation: drawerSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes drawerSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 24px 18px 24px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          flex-shrink: 0;
        }

        .cart-eyebrow {
          font-size: 9.5px;
          letter-spacing: 1.8px;
          color: #80471c;
          font-weight: 800;
          text-transform: uppercase;
        }

        .cart-header h3 {
          margin: 3px 0 0 0;
          font-size: 17px;
          font-weight: 800;
          letter-spacing: 0.3px;
          color: #111827;
        }

        .cart-close-btn {
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: #6b7280;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .cart-close-btn:hover {
          background: rgba(0, 0, 0, 0.08);
          color: #111827;
          transform: rotate(90deg) scale(1.05);
        }

        .cart-items-list {
          overflow-y: auto;
          overflow-x: hidden;
          flex: 1;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .empty-cart-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .empty-cart-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(194, 120, 56, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: #80471c;
        }

        .empty-msg {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 6px 0;
        }

        .empty-hint {
          font-size: 12px;
          color: #9ca3af;
        }

        .cart-item-card {
          background: #f9fafb;
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 16px;
          border-radius: 20px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cart-item-card:hover {
          border-color: rgba(194, 120, 56, 0.35);
          background: #ffffff;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          transform: translateY(-2px);
        }

        .item-preview-frame {
          width: 110px;
          height: 125px;
          background: radial-gradient(circle at 50% 45%, #ffffff 0%, #f3f4f6 100%);
          border-radius: 14px;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          position: relative;
        }

        .item-preview-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.15);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cart-item-card:hover .item-preview-frame img {
          transform: scale(1.22);
        }

        .item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .item-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
        }

        .item-name {
          margin: 0;
          font-size: 12.5px;
          font-weight: 700;
          color: #111827;
          text-transform: capitalize;
          line-height: 1.3;
        }

        .remove-btn {
          background: transparent;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          font-size: 13px;
          padding: 0 4px;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .remove-btn:hover {
          color: #ef4444;
          transform: scale(1.15);
        }

        .price-tag {
          margin: 0;
          font-size: 11px;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .price-label {
          color: #6b7280;
          font-size: 10px;
        }

        .price-amount {
          color: #80471c;
          font-size: 13.5px;
          font-weight: 800;
        }

        .per-item-note {
          color: #9ca3af;
          font-size: 10px;
        }

        .color-details-list {
          display: flex;
          gap: 6px 10px;
          flex-wrap: wrap;
          padding: 6px 8px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 8px;
        }

        .color-detail-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
        }

        .part-name {
          color: #6b7280;
          font-weight: 500;
        }

        .color-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.15);
          display: inline-block;
        }

        .color-val-label {
          color: #111827;
          font-weight: 600;
        }

        .size-select-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .size-left {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .size-label, .qty-label {
          font-size: 10px;
          color: #6b7280;
          font-weight: 600;
        }

        .size-dropdown {
          background: #ffffff;
          color: #111827;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 6px;
          padding: 3px 8px;
          font-size: 11px;
          font-weight: 600;
          outline: none;
          cursor: pointer;
        }

        .size-guide-trigger {
          background: transparent;
          border: none;
          color: #80471c;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 0;
          transition: opacity 0.2s ease;
        }

        .size-guide-trigger:hover {
          opacity: 0.8;
          text-decoration: underline;
        }

        .qty-control-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 2px;
        }

        .qty-picker {
          display: inline-flex;
          align-items: center;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 14px;
          overflow: hidden;
        }

        .qty-picker button {
          background: transparent;
          border: none;
          color: #111827;
          width: 24px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
          transition: background 0.2s ease;
        }

        .qty-picker button:hover {
          background: rgba(0, 0, 0, 0.06);
        }

        .qty-val {
          padding: 0 6px;
          font-size: 11px;
          font-weight: 700;
          min-width: 14px;
          text-align: center;
          color: #111827;
        }

        .cart-footer {
          padding: 20px 24px calc(24px + env(safe-area-inset-bottom, 0px)) 24px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          background: #fafafa;
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex-shrink: 0;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .total-eyebrow {
          display: block;
          font-size: 9.5px;
          letter-spacing: 1.5px;
          color: #80471c;
          font-weight: 800;
        }

        .total-label {
          font-size: 13px;
          color: #4b5563;
          font-weight: 600;
        }

        .total-price {
          font-size: 21px;
          font-weight: 800;
          color: #80471c;
        }

        .shipping-perk-badge {
          font-size: 10.5px;
          color: #80471c;
          background: rgba(194, 120, 56, 0.08);
          border: 1px dashed rgba(194, 120, 56, 0.35);
          border-radius: 8px;
          padding: 8px 10px;
          text-align: center;
          font-weight: 600;
        }

        .place-order-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, #c27838 0%, #8a4816 100%);
          color: #ffffff;
          padding: 14px 20px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.4px;
          cursor: pointer;
          border: none;
          box-shadow: 0 8px 24px rgba(194, 120, 56, 0.35);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
        }

        .place-order-btn:hover {
          background: linear-gradient(135deg, #d48744 0%, #99501a 100%);
          box-shadow: 0 12px 28px rgba(194, 120, 56, 0.45);
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .cart-modal-content {
            width: 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}