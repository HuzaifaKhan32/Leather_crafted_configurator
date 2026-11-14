import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { state, bodyColors, modelData, shearlingColors } from "../store";

export default function MainPanel({ activeCategory, onClose }) {
  const snap = useSnapshot(state);
  const [activePart, setActivePart] = useState("body");

  const currentModelSettings = snap.modelsSettings?.[snap.currentModel];

  const manModelPaths = [
    "/model/Men’s Genuine Leather Maverick Jacket–Shirt Collar Style.glb",
    "/model/Men’s Real Leather Black 3/4 Length Shearling Style.glb",
    "/model/Men’s Blue Leather Jacket with Faux Fur Collar.glb",
    "/model/Men’s Cognac Brown Real Lambskin Leather Bomber Jacket – Classic Leather Jacket.glb",
    "/model/Men’s Black Lambskin Faux Fur Shearling Leather Bomber Jacket.glb",
    "/model/Men’s Maroon Lambskin Faux Fur Shearling Leather Bomber Jacket.glb",
    "/model/Men’s  Real Lambskin Leather Bomber Jacket – Classic Zip-Up Leather Jacket.glb"
  ];

  const isMan = manModelPaths.includes(snap.currentModel);
  const isWoman = !isMan;

  const zipColors = [
    { name: "Silver", value: "#a09d9d", highlight: "#e6e6e6" },
    { name: "Brass", value: "#83734f", highlight: "#d4af37" },
    { name: "Gunmetal", value: "#4a4d50", highlight: "#8c9298" },
  ];

  const texturesList = [
    { name: "Natural Grain", path: "/textures/Leather Texture Transparent.jpg" },
  ];

  const manStyles = [
    { name: "Maverick Collar", img: "/man-thumbnail/burgundy_leather_jacket.png", path: "/model/Men’s Genuine Leather Maverick Jacket–Shirt Collar Style.glb" },
    { name: "3/4 Shearling Coat", img: "/man-thumbnail/man_leather_shearling_coat.png", path: "/model/Men’s Real Leather Black 3/4 Length Shearling Style.glb" },
    { name: "Faux Fur Collar", img: "/man-thumbnail/tan_leather_jacket.png", path: "/model/Men’s Blue Leather Jacket with Faux Fur Collar.glb" },
    { name: "Brown Classic Bomber", img: "/man-thumbnail/brown_trucker.png", path: "/model/Men’s Cognac Brown Real Lambskin Leather Bomber Jacket – Classic Leather Jacket.glb" },
    { name: "Black Aviator Shearling", img: "/man-thumbnail/Leather_Shearling.png", path: "/model/Men’s Black Lambskin Faux Fur Shearling Leather Bomber Jacket.glb" },
    { name: "Maroon Fur Bomber", img: "/man-thumbnail/Real_Leather.png", path: "/model/Men’s Maroon Lambskin Faux Fur Shearling Leather Bomber Jacket.glb" },
    { name: "Classic Zip Bomber", img: "/man-thumbnail/Zipper_Bomber_Jacket.png", path: "/model/Men’s  Real Lambskin Leather Bomber Jacket – Classic Zip-Up Leather Jacket.glb" }
  ];

  const womenStyles = [
    { name: "B3 Cream Shearling", img: "/women-thumbnail/Women_Black_Shearling.png", path: "/model/Women’s Black Real Leather B3 Bomber Cream Shearling Jacket.glb" }, 
    { name: "Cropped Trucker", img: "/women-thumbnail/women_cropped_jacket.png", path: "/model/Women’s Cognac Cropped Genuine Lambskin Leather Trucker Jacket.glb" }, 
    { name: "Ribbed Leather Bomber", img: "/women-thumbnail/Bomber_jacket_ribbed.png", path: "/model/Women’s Cognac Brown Genuine Lambskin Leather Bomber Jacket.glb" },
    { name: "3/4 Shearling Coat", img: "/women-thumbnail/maroon_jacket.png", path: "/model/Women’s Black Genuine Lambskin Leather 3/4 Length Coat Faux Fur Shearling.glb" },
    { name: "Blue Classic Bomber", img: "/women-thumbnail/Women_Blue_Leather.png", path: "/model/Women’s Blue Real Lambskin Leather Bomber Jacket – Classic Zip-Up Leather Jacket.glb" },
    { name: "Hooded Aviator Shearling", img: "/women-thumbnail/hoddy.png", path: "/model/Women’s Hooded Black Real Lambskin Leather Faux Shearling Aviator Jacket.glb" }
  ];

  const currentColors = activePart === "inner" ? shearlingColors : bodyColors;

  return (
    <div className="main-panel" role="region" aria-label="Configuration Panel">
      {/* Header with Title & Close Button */}
      <div className="panel-header">
        <div className="panel-title-group">
          <span className="panel-eyebrow">CUSTOMIZE</span>
          <h2 className="panel-title">{activeCategory === "Design" ? "JACKET STYLE" : "COLORS & FINISH"}</h2>
        </div>
        <button className="panel-close-btn" onClick={onClose} aria-label="Close panel">✕</button>
      </div>

      {activeCategory === "Design" && (
        <div className="panel-body">
          {/* Gender Segmented Switcher */}
          <div className="gender-switcher">
            {modelData.map((m) => {
              const active = (m.id === 'man' && isMan) || (m.id === 'woman' && isWoman);
              return (
                <button
                  key={m.id}
                  className={`gender-btn ${active ? 'is-active' : ''}`}
                  onClick={() => {
                    state.currentModel = m.id === 'man' ? manStyles[0].path : womenStyles[0].path;
                    setActivePart("body"); 
                  }}
                  type="button"
                >
                  {m.id === 'man' ? "MEN'S" : "WOMEN'S"}
                </button>
              );
            })}
          </div>

          <div className="collection-count">
            <span>{(isMan ? manStyles : womenStyles).length} Handcrafted Designs</span>
          </div>

          {/* Model Cards Grid */}
          <div className="grid-container">
            {(isMan ? manStyles : womenStyles).map((styleItem) => {
              const isStyleSelected = snap.currentModel === styleItem.path;
              const price = snap.prices?.[styleItem.path];

              return (
                <div 
                  key={styleItem.path} 
                  className={`style-card ${isStyleSelected ? 'is-selected' : ''}`}
                  onClick={() => { state.currentModel = styleItem.path; }}
                >
                  <div className="card-img-frame">
                    <img src={styleItem.img} alt={styleItem.name} className="card-img" />
                    {isStyleSelected && (
                      <span className="card-badge">✓</span>
                    )}
                  </div>
                  <div className="card-info">
                    <span className="card-name">{styleItem.name}</span>
                    {price && <span className="card-price">${price}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeCategory === "Color" && (
        <div className="panel-body">
          {/* Sub-Tabs: Body / Inner / Zip */}
          <div className="part-segmented-tabs">
            <button 
              className={`part-tab ${activePart === "body" ? "is-active" : ""}`}
              onClick={() => setActivePart("body")}
              type="button"
            >
              Outer Leather
            </button>
            <button 
              className={`part-tab ${activePart === "inner" ? "is-active" : ""}`}
              onClick={() => setActivePart("inner")}
              type="button"
            >
              Collar & Lining
            </button>
            <button 
              className={`part-tab ${activePart === "zip" ? "is-active" : ""}`}
              onClick={() => setActivePart("zip")}
              type="button"
            >
              Hardware
            </button>
          </div>

          <div className="swatches-section">
            <div className="swatches-header">
              <span className="swatches-label">
                {activePart === "body" ? "SELECT LEATHER TONE" : activePart === "inner" ? "SELECT LINING FINISH" : "SELECT HARDWARE FINISH"}
              </span>
            </div>

            <div className="swatches-container">
              {activePart === "zip" ? zipColors.map((z) => {
                const currentColor = typeof currentModelSettings?.zip === 'object' ? currentModelSettings.zip.hex : currentModelSettings?.zip;
                const isSelected = currentColor?.toLowerCase() === z.value.toLowerCase();

                return (
                  <div key={z.name} className="swatch-wrapper">
                    <button 
                      className={`color-swatch-btn ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => { 
                        if (!state.modelsSettings[state.currentModel]) state.modelsSettings[state.currentModel] = {};
                        state.modelsSettings[state.currentModel].zip = z.value; 
                      }} 
                      style={{ 
                        background: `linear-gradient(135deg, ${z.highlight} 0%, ${z.value} 100%)`,
                      }}
                      title={z.name}
                      type="button"
                    >
                      {isSelected && <span className="swatch-check">✓</span>}
                    </button>
                    <span className="swatch-name">{z.name}</span>
                  </div>
                );
              }) : currentColors.map((c) => {
                const colorValue = c.value || c;
                const colorName = c.name || c.id || "Color";
                const currentColor = currentModelSettings?.[activePart];
                const isSelected = currentColor?.toLowerCase() === colorValue.toLowerCase();

                return (
                  <div key={c.id || c} className="swatch-wrapper">
                    <button 
                      className={`color-swatch-btn ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => { 
                        if (!state.modelsSettings[state.currentModel]) state.modelsSettings[state.currentModel] = {};
                        state.modelsSettings[state.currentModel][activePart] = colorValue; 
                      }} 
                      style={{ background: colorValue }}
                      title={colorName}
                      type="button"
                    >
                      {isSelected && <span className="swatch-check" style={{ color: colorValue === '#000000' || colorValue === '#080808' ? '#fff' : '#000' }}>✓</span>}
                    </button>
                    <span className="swatch-name">{colorName}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {activePart === "body" && (
            <div className="texture-section">
              <span className="texture-label">LEATHER FINISH</span>
              <div className="texture-pill-group">
                {texturesList.map((t) => (
                  <button 
                    key={t.name} 
                    className={`texture-pill ${snap.currentTexture === t.path ? 'is-active' : ''}`}
                    onClick={() => (state.currentTexture = t.path)}
                    type="button"
                  >
                    <span>✓</span> {t.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        .main-panel {
          position: fixed;
          left: 92px;
          top: 50%;
          transform: translateY(-50%);
          width: 350px;
          max-height: 85vh;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 28px;
          color: #111827;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18), 0 4px 16px rgba(0, 0, 0, 0.06);
          z-index: 110;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: panelSlideIn 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes panelSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50%) translateX(-24px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0) scale(1);
          }
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 22px 14px 22px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          flex-shrink: 0;
        }

        .panel-eyebrow {
          font-size: 9px;
          letter-spacing: 1.8px;
          color: #80471c;
          font-weight: 800;
          text-transform: uppercase;
        }

        .panel-title {
          margin: 2px 0 0 0;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #111827;
        }

        .panel-close-btn {
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

        .panel-close-btn:hover {
          background: rgba(0, 0, 0, 0.08);
          color: #111827;
          transform: rotate(90deg) scale(1.05);
        }

        .panel-body {
          padding: 16px 20px 22px 20px;
          overflow-y: auto;
          overflow-x: hidden;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* Gender Switcher */
        .gender-switcher {
          display: flex;
          background: rgba(0, 0, 0, 0.05);
          padding: 4px;
          border-radius: 20px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          margin-bottom: 10px;
          flex-shrink: 0;
        }

        .gender-btn {
          flex: 1;
          border: none;
          background: transparent;
          color: #6b7280;
          padding: 8px 12px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .gender-btn:hover {
          color: #111827;
        }

        .gender-btn.is-active {
          background: linear-gradient(135deg, #c27838 0%, #8f4b18 100%);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(194, 120, 56, 0.35);
        }

        .collection-count {
          font-size: 11px;
          color: #6b7280;
          text-align: center;
          margin-bottom: 12px;
          letter-spacing: 0.3px;
          font-weight: 600;
          flex-shrink: 0;
        }

        /* Style Cards Grid */
        .grid-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          overflow: visible;
          padding-right: 2px;
          padding-bottom: 8px;
        }

        .style-card {
          background: rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          padding: 8px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .style-card:hover {
          background: rgba(0, 0, 0, 0.04);
          border-color: rgba(194, 120, 56, 0.4);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        .style-card.is-selected {
          background: rgba(194, 120, 56, 0.08);
          border-color: #c27838;
          box-shadow: 0 0 0 1.5px #c27838, 0 8px 20px rgba(194, 120, 56, 0.2);
        }

        .card-img-frame {
          width: 100%;
          height: 84px;
          background: radial-gradient(circle at 50% 50%, #f3f4f6 0%, #e5e7eb 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .card-img {
          width: 86%;
          height: 86%;
          object-fit: contain;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .style-card:hover .card-img {
          transform: scale(1.08);
        }

        .card-badge {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #c27838;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(194, 120, 56, 0.4);
          animation: badgePop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes badgePop {
          0% { transform: scale(0); }
          80% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .card-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 2px 2px 4px 2px;
        }

        .card-name {
          font-size: 10.5px;
          font-weight: 700;
          color: #1f2937;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-price {
          font-size: 11.5px;
          font-weight: 800;
          color: #80471c;
        }

        /* Color Part Tabs */
        .part-segmented-tabs {
          display: flex;
          background: rgba(0, 0, 0, 0.05);
          padding: 3px;
          border-radius: 18px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          margin-bottom: 18px;
          flex-shrink: 0;
        }

        .part-tab {
          flex: 1;
          border: none;
          background: transparent;
          color: #6b7280;
          padding: 7px 8px;
          font-size: 10.5px;
          font-weight: 600;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          text-align: center;
          white-space: nowrap;
        }

        .part-tab:hover {
          color: #111827;
        }

        .part-tab.is-active {
          background: #ffffff;
          color: #111827;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .swatches-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .swatches-header {
          text-align: center;
        }

        .swatches-label {
          font-size: 9.5px;
          letter-spacing: 1.5px;
          color: #80471c;
          font-weight: 800;
          text-transform: uppercase;
        }

        .swatches-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding: 6px 2px;
        }

        .swatch-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .color-swatch-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(0, 0, 0, 0.1);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
          outline: none;
        }

        .color-swatch-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
        }

        .color-swatch-btn.is-selected {
          transform: scale(1.12);
          border-color: #ffffff;
          box-shadow: 0 0 0 2.5px #c27838, 0 6px 16px rgba(194, 120, 56, 0.4);
        }

        .swatch-check {
          font-size: 13px;
          font-weight: 800;
        }

        .swatch-name {
          font-size: 10px;
          color: #4b5563;
          text-align: center;
          font-weight: 600;
          text-transform: capitalize;
        }

        .texture-section {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .texture-label {
          font-size: 9.5px;
          letter-spacing: 1.5px;
          color: #80471c;
          font-weight: 800;
        }

        .texture-pill-group {
          display: flex;
          gap: 8px;
        }

        .texture-pill {
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.1);
          color: #374151;
          padding: 6px 14px;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .texture-pill:hover {
          background: rgba(0, 0, 0, 0.08);
          color: #111827;
        }

        .texture-pill.is-active {
          background: #111827;
          color: #ffffff;
          border-color: #111827;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 1024px) {
          .main-panel {
            left: 12px;
            right: 12px;
            top: auto;
            bottom: calc(76px + env(safe-area-inset-bottom, 0px));
            transform: none;
            width: auto;
            max-height: 52vh;
            border-radius: 24px;
            z-index: 130;
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.24);
            animation: panelMobileSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          }

          @keyframes panelMobileSlideUp {
            from {
              opacity: 0;
              transform: translateY(28px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .panel-header {
            padding: 14px 18px 10px 18px;
          }

          .panel-body {
            padding: 12px 16px 18px 16px;
          }

          .grid-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
        }

        @media (max-width: 480px) {
          .grid-container {
            grid-template-columns: repeat(2, 1fr);
          }

          .card-img-frame {
            height: 72px;
          }
        }
      `}</style>
    </div>
  );
}