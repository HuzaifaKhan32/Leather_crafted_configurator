import React, { useState, useEffect } from 'react';
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

export default function CartDrawer({ isOpen, onClose, currentModel }) {
  const snap = useSnapshot(state);
  const [showSizeModal, setShowSizeModal] = useState(false);

  // Sync Cart Data with LocalStorage on Load
  useEffect(() => {
    const savedCart = localStorage.getItem('jacket_cart');
    if (savedCart && state.cart.length === 0) {
      state.cart = JSON.parse(savedCart);
    }
  }, []);

  // Active Model badalne par Cart / Storage reset karne ka logic
  useEffect(() => {
    if (currentModel) {
      state.cart = [];
      localStorage.removeItem('jacket_cart');
      localStorage.removeItem('jacket_customization');
    }
  }, [currentModel?.id]);

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

    const primaryItem = snap.cart[0];
    const productId = getProductId(primaryItem.modelName);
    const selectedSize = primaryItem.size || 'M';

    const customDetails = snap.cart
      .map((item, idx) => {
        const bodyColor = item.colors?.body ? resolveColorName(item.colors.body) : 'N/A';
        const innerColor = item.colors?.inner ? resolveColorName(item.colors.inner) : 'N/A';
        const zipColor = item.colors?.zip ? resolveColorName(item.colors.zip) : 'N/A';

        return `[Item ${idx + 1}: ${item.modelName || 'Custom Jacket'}] Size: ${item.size || 'M'} | Body: ${bodyColor} | Inner: ${innerColor} | Zip: ${zipColor}`;
      })
      .join(' || ');

    const customizerEndpoint = `https://leather-crafted.com/wp-json/customizer/v1/add-and-checkout?product_id=${productId}&quantity=${primaryItem.quantity || 1}&size=${encodeURIComponent(selectedSize)}&attribute_pa_size=${encodeURIComponent(selectedSize.toLowerCase())}&variation_size=${encodeURIComponent(selectedSize)}&custom_jacket=${encodeURIComponent(customDetails)}`;

    window.location.href = customizerEndpoint;
  };

  const totalPrice = snap.cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const totalItemCount = snap.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Your Customizations ({totalItemCount})</h3>
          <span className="close-btn" onClick={onClose}>✕</span>
        </div>

        <div className="cart-items-list">
          {snap.cart.length === 0 ? (
            <p className="empty-msg">Your cart is empty.</p>
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
                    <h4 style={{ textTransform: 'capitalize' }}>{item.modelName || 'Zipper Bomber Jacket'}</h4>
                    <button className="remove-btn" onClick={() => handleRemove(item.id)}>Remove</button>
                  </div>

                  <p className="price-tag">Price: <strong>${item.price * (item.quantity || 1)}</strong></p>

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
                          </div>
                        );
                      })}
                  </div>

                  <div className="size-select-row">
                    <div className="size-left">
                      <label>Size:</label>
                      <select
                        value={item.size || 'M'}
                        onChange={(e) => handleSizeChange(item.id, e.target.value)}
                        className="size-dropdown"
                      >
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                        <option value="XXXL">XXXL</option>
                      </select>
                    </div>

                    <button className="size-guide-trigger" onClick={() => setShowSizeModal(true)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                        <path d="M6 6v4M10 6v2M14 6v4M18 6v2"></path>
                      </svg>
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="qty-control-row">
                    <span>Qty:</span>
                    <div className="qty-picker">
                      <button onClick={() => handleQtyChange(item.id, -1)}>-</button>
                      <span>{item.quantity || 1}</span>
                      <button onClick={() => handleQtyChange(item.id, 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {snap.cart.length > 0 && (
          <div className="cart-footer">
            <div className="total-row">
              <span>Total Amount:</span>
              <strong>${totalPrice}</strong>
            </div>
            <button className="checkout-btn place-order-btn" onClick={handleProceedToWooCheckout}>
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>

      {showSizeModal && (
        <div className="guide-modal-overlay" onClick={() => setShowSizeModal(false)}>
          <div className="guide-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="guide-modal-header">
              <h3>Size Guide</h3>
              <span className="close-btn" onClick={() => setShowSizeModal(false)}>✕</span>
            </div>

            <div className="guide-modal-body">
              <div className="table-responsive">
                <table className="custom-size-table">
                  <tbody>
                    <tr>
                      <td><strong>XS</strong></td>
                      <td>33 - 34</td>
                      <td>27 - 28</td>
                      <td>37 - 38</td>
                    </tr>
                    <tr>
                      <td><strong>S</strong></td>
                      <td>35 - 36</td>
                      <td>29 - 30</td>
                      <td>39 - 40</td>
                    </tr>
                    <tr>
                      <td><strong>M</strong></td>
                      <td>37 - 38</td>
                      <td>31 - 32</td>
                      <td>41 - 42</td>
                    </tr>
                    <tr>
                      <td><strong>L</strong></td>
                      <td>39 - 40</td>
                      <td>33 - 34</td>
                      <td>43 - 44</td>
                    </tr>
                    <tr>
                      <td><strong>XL</strong></td>
                      <td>41 - 43</td>
                      <td>35 - 37</td>
                      <td>45 - 47</td>
                    </tr>
                    <tr>
                      <td><strong>XXL</strong></td>
                      <td>44 - 46</td>
                      <td>38 - 39</td>
                      <td>48 - 49</td>
                    </tr>
                    <tr>
                      <td><strong>XXXL</strong></td>
                      <td>47 - 49</td>
                      <td>40 - 42</td>
                      <td>50 - 52</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="size-info-box">
                <h4>WHAT SIZE SHOULD I PICK?</h4>
                
                <div className="info-section">
                  <p className="section-title">Body Bust Measurement</p>
                  <p className="section-desc">
                    Take a tape measure and wrap it under your armpits at the fullest part of your bust.
                  </p>
                </div>

                <div className="info-section">
                  <p className="section-title">Size Selection Tip</p>
                  <p className="section-desc">
                    If your body bust is 37"-38" , your jacket chest will be 43".
                  </p>
                </div>

                <div className="info-section">
                  <p className="section-title">Contact Us</p>
                  <p className="section-desc">
                    For further information on size advice or customization, please drop us a message.
                  </p>
                </div>
              </div>

              <div className="measurement-guide-container">
                <div className="guide-illustration">
                  <svg width="100" height="230" viewBox="0 0 100 230" fill="none" stroke="#666" strokeWidth="1.5">
                    <circle cx="50" cy="20" r="14" />
                    <path d="M35 34 C35 34 25 45 20 70 C18 80 20 110 22 130 L32 220 M65 34 C65 34 75 45 80 70 C82 80 80 110 78 130 L68 220" />
                    <path d="M35 34 L65 34" />
                    
                    <line x1="22" y1="75" x2="78" y2="75" stroke="#e98400" strokeWidth="2" />
                    <circle cx="78" cy="75" r="7" fill="#000" />
                    <text x="78" y="78" fill="#fff" fontSize="9" textAnchor="middle" stroke="none">1</text>
                    
                    <line x1="26" y1="105" x2="74" y2="105" stroke="#e98400" strokeWidth="2" />
                    <circle cx="26" cy="105" r="7" fill="#000" />
                    <text x="26" y="108" fill="#fff" fontSize="9" textAnchor="middle" stroke="none">2</text>
                    
                    <line x1="24" y1="135" x2="76" y2="135" stroke="#e98400" strokeWidth="2" />
                    <circle cx="76" cy="135" r="7" fill="#000" />
                    <text x="76" y="138" fill="#fff" fontSize="9" textAnchor="middle" stroke="none">3</text>
                  </svg>
                </div>

                <div className="guide-steps">
                  <h4>How to Measure your Body?</h4>
                  
                  <div className="step-item">
                    <p className="step-heading">1. Your Bust</p>
                    <p className="step-text">Measure the circumference over the fullest part of your bust.</p>
                  </div>

                  <div className="step-item">
                    <p className="step-heading">2. Your Waist</p>
                    <p className="step-text">Measure your waist at the thinnest place.</p>
                  </div>

                  <div className="step-item">
                    <p className="step-heading">3. Your Hips</p>
                    <p className="step-text">Measure the fullest part of your hips</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <style>{`
        .cart-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          padding: 20px;
        }

        .cart-modal-content {
          width: 420px;
          max-width: 90vw;
          height: auto;
          max-height: 90vh; 
          background: rgba(20, 20, 20, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          color: #fff;
          padding: 20px;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
          box-sizing: border-box;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          padding-bottom: 12px;
        }

        .cart-header h3 { margin: 0; font-size: 16px; font-weight: 600; }
        .close-btn { cursor: pointer; font-size: 18px; opacity: 0.7; transition: 0.2s; color: #888; }
        .close-btn:hover { opacity: 1; color: #fff; }

        .cart-items-list {
          overflow-y: auto;
          margin-top: 15px;
          margin-bottom: 15px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 55vh;
        }

        .empty-msg { text-align: center; margin: 20px 0; opacity: 0.6; font-size: 14px; }

        .cart-item-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px;
          border-radius: 12px;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .item-preview-frame {
          width: 55px;
          height: 55px;
          background: #2a2a2a;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .item-preview-frame img { width: 100%; height: 100%; object-fit: cover; }
        .item-info { flex: 1; }

        .item-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .item-info h4 { margin: 0; font-size: 13px; font-weight: 600; }
        .price-tag { margin: 4px 0 6px 0; font-size: 11px; opacity: 0.8; }

        .color-details-list { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; }
        .color-detail-item { display: flex; align-items: center; gap: 4px; font-size: 10px; }
        .part-name { color: rgba(255, 255, 255, 0.6); }

        .color-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.5);
          display: inline-block;
        }

        .size-select-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 11px;
        }

        .size-left {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .size-dropdown {
          background: #333;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          padding: 2px 6px;
          font-size: 11px;
          outline: none;
          cursor: pointer;
        }

        .size-guide-trigger {
          background: transparent;
          border: none;
          color: #b56200;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 0;
          text-decoration: underline;
        }
        .size-guide-trigger:hover { color: #e98400; }

        .qty-control-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
        }

        .qty-picker {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 8px;
          border-radius: 15px;
        }

        .qty-picker button {
          background: transparent;
          border: none;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          font-size: 13px;
          padding: 0 4px;
        }

        .remove-btn {
          background: transparent;
          border: none;
          color: #e98400;
          font-size: 11px;
          cursor: pointer;
          padding: 0;
        }

        .cart-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          padding-top: 12px;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .checkout-btn {
          width: 100%;
          background: #e98400;
          color: #000;
          border: none;
          padding: 12px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .checkout-btn:hover { background: #b96900; color: #fff; }

        .guide-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          z-index: 3000;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 15px;
        }

        .guide-modal-content {
          background: #ffffff;
          border-radius: 8px;
          width: 100%;
          max-width: 440px;
          max-height: 92vh;
          overflow-y: auto;
          color: #222;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .guide-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #eee;
        }

        .guide-modal-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #111;
        }

        .guide-modal-body {
          padding: 16px 20px 24px 20px;
        }

        .custom-size-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }

        .custom-size-table td {
          padding: 10px 14px;
          font-size: 13px;
          color: #444;
          text-align: center;
        }

        .custom-size-table tr:nth-child(odd) {
          background-color: #f7f7f7;
        }

        .custom-size-table td:first-child {
          text-align: center;
          color: #111;
        }

        .size-info-box {
          border: 1px dashed #c4875a;
          border-radius: 6px;
          padding: 14px;
          margin-bottom: 20px;
          background: #fffdfb;
        }

        .size-info-box h4 {
          margin: 0 0 10px 0;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #111;
        }

        .info-section {
          margin-bottom: 10px;
        }
        .info-section:last-child { margin-bottom: 0; }

        .section-title {
          margin: 0;
          font-size: 11px;
          font-weight: 700;
          color: #a45a27;
        }

        .section-desc {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: #555;
          line-height: 1.4;
        }

        .measurement-guide-container {
          display: flex;
          gap: 15px;
          align-items: flex-start;
          padding-top: 5px;
        }

        .guide-illustration {
          flex-shrink: 0;
          width: 90px;
          display: flex;
          justify-content: center;
        }

        .guide-steps {
          flex: 1;
        }

        .guide-steps h4 {
          margin: 0 0 10px 0;
          font-size: 13px;
          font-weight: 700;
          color: #111;
        }

        .step-item {
          margin-bottom: 10px;
        }
        .step-item:last-child { margin-bottom: 0; }

        .step-heading {
          margin: 0;
          font-size: 12px;
          font-weight: 700;
          color: #111;
        }

        .step-text {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: #555;
          line-height: 1.35;
        }

        @media (max-width: 768px) {
          .cart-modal-overlay { padding: 10px; align-items: flex-end; }
          .cart-modal-content { width: 100%; max-width: 100%; }
        }
      `}</style>
    </div>
  );
}