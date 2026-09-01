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
    { name: "Silver", value: "#a09d9d" },
    { name: "Brass", value: "#83734f" },
    { name: "Gunmetal", value: "#65696d" },
  ];

  const texturesList = [
    { name: "Transparent", path: "/textures/Leather Texture Transparent.jpg" },
  ];

  const manStyles = [
    { name: "burgundy_leather", img: "/man-thumbnail/burgundy_leather_jacket.jpg", path: "/model/Men’s Genuine Leather Maverick Jacket–Shirt Collar Style.glb" },
    { name: "man_leather_shearling_coat", img: "/man-thumbnail/man_leather_shearling_coat.jpg", path: "/model/Men’s Real Leather Black 3/4 Length Shearling Style.glb" },
    { name: "tan_leather_jacket", img: "/man-thumbnail/tan_leather_jacket.JPG", path: "/model/Men’s Blue Leather Jacket with Faux Fur Collar.glb" },
    { name: "brown_trucker", img: "/man-thumbnail/brown_trucker.png", path: "/model/Men’s Cognac Brown Real Lambskin Leather Bomber Jacket – Classic Leather Jacket.glb" },
    { name: "Leather_Shearling", img: "/man-thumbnail/Leather_Shearling.jpg", path: "/model/Men’s Black Lambskin Faux Fur Shearling Leather Bomber Jacket.glb" },
    { name: "Real_Leather", img: "/man-thumbnail/Real_Leather.jpg", path: "/model/Men’s Maroon Lambskin Faux Fur Shearling Leather Bomber Jacket.glb" },
    { name: "Zipper_Bomber_Jacket", img: "/man-thumbnail/Zipper_Bomber_Jacket.png", path: "/model/Men’s  Real Lambskin Leather Bomber Jacket – Classic Zip-Up Leather Jacket.glb" }
  ];

  const womenStyles = [
    { name: "Women_Black_Shearling", img: "/women-thumbnail/Women_Black_Shearling.JPG", path: "/model/Women’s Black Real Leather B3 Bomber Cream Shearling Jacket.glb" }, 
    { name: "women_cropped_jacket", img: "/women-thumbnail/women_cropped_jacket.jpg", path: "/model/Women’s Cognac Cropped Genuine Lambskin Leather Trucker Jacket.glb" }, 
    { name: "Bomber_jacket_ribbed", img: "/women-thumbnail/Bomber_jacket_ribbed.png", path: "/model/Women’s Cognac Brown Genuine Lambskin Leather Bomber Jacket.glb" },
    { name: "maroon_jacket", img: "/women-thumbnail/maroon_jacket.jpg", path: "/model/Women’s Black Genuine Lambskin Leather 3/4 Length Coat Faux Fur Shearling.glb" },
    { name: "Women_Blue_Leather", img: "/women-thumbnail/Women_Blue_Leather.png", path: "/model/Women’s Blue Real Lambskin Leather Bomber Jacket – Classic Zip-Up Leather Jacket.glb" },
    { name: "hoddy", img: "/women-thumbnail/hoddy.jpg", path: "/model/Women’s Hooded Black Real Lambskin Leather Faux Shearling Aviator Jacket.glb" }
  ];

  const currentColors = activePart === "inner" ? shearlingColors : bodyColors;

  return (
    <div className="main-panel">
      <div onClick={onClose} style={{ position: "absolute", top: "15px", right: "20px", cursor: "pointer", fontSize: "20px", opacity: 0.8 }}>✕</div>

      {activeCategory === "Design" && (
        <>
          <h2 style={{ fontSize: "14px", marginBottom: "12px", textAlign: "center", fontWeight: "600", letterSpacing: "1.5px" }}>SELECT GENDER</h2>
          
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "18px" }}>
            {modelData.map((m) => {
              const activeGenderBtn = (m.id === 'man' && isMan) || (m.id === 'woman' && isWoman);
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    state.currentModel = m.id === 'man' ? manStyles[0].path : womenStyles[0].path;
                    setActivePart("body"); 
                  }}
                  style={{ padding: "8px 16px", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.3)", cursor: "pointer", fontSize: "11px", fontWeight: "600", flex: 1, background: activeGenderBtn ? "#fff" : "rgba(0, 0, 0, 0.2)", color: activeGenderBtn ? "#000" : "#fff" }}
                >
                  {m.name.toUpperCase()}
                </button>
              );
            })}
          </div>

          <h3 style={sectionHeadingStyle}>{isMan ? "CHOOSE MAN JACKET STYLE" : "CHOOSE WOMAN JACKET STYLE"}</h3>
          <div className="grid-container">
            {(isMan ? manStyles : womenStyles).map((styleItem) => {
              const isStyleSelected = snap.currentModel === styleItem.path;
              return (
                <div key={styleItem.path} onClick={() => { state.currentModel = styleItem.path; }} style={{ ...thumbnailCardStyle, background: isStyleSelected ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.25)", border: isStyleSelected ? "2px solid #fff" : "1px solid rgba(255, 255, 255, 0.08)" }}>
                  <div style={imgFrameWrapperStyle}><img src={styleItem.img} alt={styleItem.name} style={imgStyle} /></div>
                  <span style={{ ...labelStyle, color: isStyleSelected ? "#fff" : "#ccc" }}>{styleItem.name.replace(/_/g, ' ')}</span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {activeCategory === "Color" && (
        <>
          <h2 style={{ fontSize: "15px", marginBottom: "12px", textAlign: "center", fontWeight: "500" }}>CUSTOMIZE COLORS</h2>

          <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "15px" }}>
            <span onClick={() => setActivePart("body")} style={{ ...partTabStyle, opacity: activePart === "body" ? 1 : 0.5, borderBottom: activePart === "body" ? "2px solid #fff" : "none" }}>Body</span>
            <span onClick={() => setActivePart("inner")} style={{ ...partTabStyle, opacity: activePart === "inner" ? 1 : 0.5, borderBottom: activePart === "inner" ? "2px solid #fff" : "none" }}>Inner</span>
            <span onClick={() => setActivePart("zip")} style={{ ...partTabStyle, opacity: activePart === "zip" ? 1 : 0.5, borderBottom: activePart === "zip" ? "2px solid #fff" : "none" }}>Zip</span>
          </div>

          <div className="swatches-container">
            {activePart === "zip" ? zipColors.map((z) => {
              const currentColor = currentModelSettings?.zip;
              return (
                <div key={z.name} className="swatch-wrapper">
                  <div 
                    onClick={() => { 
                      if (!state.modelsSettings[state.currentModel]) state.modelsSettings[state.currentModel] = {};
                      state.modelsSettings[state.currentModel].zip = z.value; 
                    }} 
                    style={{ 
                      width: "32px", 
                      height: "32px", 
                      borderRadius: "50%", 
                      background: z.value, 
                      cursor: "pointer", 
                      border: currentColor === z.value ? "3px solid #fff" : "1px solid rgba(255,255,255,0.2)" 
                    }} 
                  />
                  <span className="swatch-tooltip">{z.name}</span>
                </div>
              );
            }) : currentColors.map((c) => {
              const colorValue = c.value || c;
              const colorName = c.name || c.id || "COLOR";
              const currentColor = currentModelSettings?.[activePart];

              return (
                <div key={c.id || c} className="swatch-wrapper">
                  <div 
                    onClick={() => { 
                      if (!state.modelsSettings[state.currentModel]) state.modelsSettings[state.currentModel] = {};
                      state.modelsSettings[state.currentModel][activePart] = colorValue; 
                    }} 
                    style={{ 
                      width: "32px", 
                      height: "32px", 
                      borderRadius: "50%", 
                      background: colorValue, 
                      cursor: "pointer", 
                      border: currentColor === colorValue ? "3px solid #fff" : "1px solid rgba(255,255,255,0.2)" 
                    }} 
                  />
                  <span className="swatch-tooltip">{colorName}</span>
                </div>
              );
            })}
          </div>

          {activePart === "body" && (
            <>
              <hr style={horizontalRuleStyle} />
              <h3 style={textureHeadingStyle}>LEATHER TEXTURE</h3>
              <div style={textureFlexStyle}>
                {texturesList.map((t) => (
                  <button key={t.name} onClick={() => (state.currentTexture = t.path)} style={{ ...textureButtonStyle, background: snap.currentTexture === t.path ? "#fff" : "transparent", color: snap.currentTexture === t.path ? "#000" : "#fff" }}>{t.name}</button>
                ))}
              </div>
            </>
          )}
        </>
      )}

      <style>{`
        .main-panel {
          width: 320px;
          padding: 24px;
          left: 90px;
          top: 50%;
          transform: translateY(-50%);
          max-height: 85vh;
          overflow-y: auto;
          z-index: 1000;
          background: rgba(150, 145, 145, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 30px;
          color: #fff;
          font-family: 'Inter', sans-serif;
          position: fixed;
          box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.35);
        }

        .grid-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          width: 100%;
          max-height: 300px;
          overflow-y: auto;
        }

        .swatches-container {
          display: flex;
          flex-wrap: wrap;
          gap: 16px 12px;
          justify-content: center;
          margin-bottom: 20px;
          max-height: 220px;
          overflow-y: auto;
          padding: 30px 10px 10px 10px;
        }

        .swatches-container::-webkit-scrollbar {
          width: 4px;
        }

        .swatches-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }

        .swatch-wrapper {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
        }

        .swatch-tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: #000000;
          color: #ffffff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.15s ease-in-out, visibility 0.15s ease-in-out;
          pointer-events: none;
          z-index: 9999;
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
        }

        .swatch-wrapper:hover .swatch-tooltip {
          opacity: 1 !important;
          visibility: visible !important;
        }

        /* Mobile Responsive Fix */
        @media (max-width: 1024px) {
          .main-panel {
            left: 15px;
            right: 15px;
            bottom: calc(80px + env(safe-area-inset-bottom));
            top: auto;
            transform: none;
            width: auto;
            max-height: 48vh;
            overflow-y: auto;
            border-radius: 25px;
            padding: 16px;
            z-index: 1002;
          }

          .grid-container {
            grid-template-columns: 1fr 1fr 1fr;
            max-height: 180px;
          }

          .swatches-container {
            max-height: 160px;
          }
        }
      `}</style>
    </div>
  );
}

const partTabStyle = { cursor: "pointer", fontSize: "12px", paddingBottom: "5px" };
const sectionHeadingStyle = { fontSize: "11px", marginBottom: "10px", textAlign: "center", opacity: 0.8 };
const thumbnailCardStyle = { borderRadius: "14px", padding: "6px", cursor: "pointer", textAlign: "center" };
const imgFrameWrapperStyle = { width: "100%", height: "75px", backgroundColor: "#fcfcfc", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: "4px" };
const imgStyle = { width: "85%", height: "85%", objectFit: "contain" };
const labelStyle = { fontSize: "9px", display: "block" };
const horizontalRuleStyle = { border: "none", borderTop: "1px solid rgba(255,255,255,0.15)", marginBottom: "10px" };
const textureHeadingStyle = { fontSize: "11px", marginBottom: "8px", textAlign: "center" };
const textureFlexStyle = { display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" };
const textureButtonStyle = { padding: "6px 12px", borderRadius: "15px", border: "1px solid rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "10px" };