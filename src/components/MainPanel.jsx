import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { state, bodyColors, modelData, shearlingColors } from "../store";

export default function MainPanel({ activeCategory, onClose }) {
  const snap = useSnapshot(state);
  const [activePart, setActivePart] = useState("body");

  // Current model ki dynamic settings nikalne ke liye safely reference banayein
  const currentModelSettings = snap.modelsSettings?.[snap.currentModel];

  // Dynamic binary check baseline variables se matching ke liye
  const isMan = snap.currentModel.includes('coat') || snap.currentModel.includes('man_leather') || snap.currentModel.includes('tan_leather') || snap.currentModel.includes('burgundy') || snap.currentModel.includes('hoddy') || snap.currentModel.includes('Real_Leather')  || snap.currentModel.includes('leather_shearling') || snap.currentModel.includes('trucker') || snap.currentModel.includes('zipper')  || snap.currentModel.includes('burgundy_leather_jacket') ;
  const isWoman = !isMan;

  // Zip metallic options
  const zipColors = [
    { name: "Silver", value: "#C0C0C0" },
    { name: "Brass", value: "#D4AF37" },
    { name: "Gunmetal", value: "#2A2A2A" },
  ];

  // Texture options list 
  const texturesList = [
    { name: "Texture Overlay", path: "/textures/leather Texture Overlay.jfif" },
    { name: "Transparent Grain", path: "/textures/Leather Texture Transparent.jfif" },
    { name: "Blue Leather", path: "/textures/Blue Leather Background.jfif" },
  ];

  const manStyles = [
    { name: "burgundy_leather", img: "/man-thumbnail/burgundy_leather_jacket.jpg", path: "/model/burgundy_leather_jacket.glb" },
    { name: "man_leather_shearling_coat", img: "/man-thumbnail/man_leather_shearling_coat.jpg", path: "/model/leather_coat_3d_model.glb" },
    { name: "tan_leather_jacket", img: "/man-thumbnail/tan_leather_jacket.JPG", path: "/model/tan_leather_jacket_3d_model.glb" },
    { name: "brown_trucker", img: "/man-thumbnail/brown_trucker.png", path: "/model/brown_trucker.glb" },
    { name: "Leather_Shearling", img: "/man-thumbnail/Leather_Shearling.jpg", path: "/model/leather_shearling.glb" },
    { name: "Real_Leather", img: "/man-thumbnail/Real_Leather.jpg", path: "/model/Real_Leather.glb" },
  { name: "Zipper_Bomber_Jacket", img: "/man-thumbnail/Zipper_Bomber_Jacket.png", path: "/model/jacket_model.glb" }
  ];

  const womenStyles = [
    { name: "Women_Black_Shearling", img: "/women-thumbnail/Women_Black_Shearling.JPG", path: "/model/jacket_2.glb" }, 
    { name: "women_cropped_jacket", img: "/women-thumbnail/women_cropped_jacket.jpg", path: "/model/leather_jacket_3d_model.glb" }, 
    { name: "Bomber_jacket_ribbed", img: "/women-thumbnail/Bomber_jacket_ribbed.png", path: "/model/bomber_jacket_ribbed(1).glb" },
    { name: "maroon_jacket", img: "/women-thumbnail/maroon_jacket.jpg", path: "/model/maroon.glb" },
    { name: "Women_Blue_Leather", img: "/women-thumbnail/Women_Blue_Leather.png", path: "/model/Women_Blue_Leather.glb" },
    { name: "hoddy", img: "/women-thumbnail/hoddy.jpg", path: "/model/hoddy.glb" }
  ];

  const currentColors = activePart === "inner" ? shearlingColors : bodyColors;

  return (
    <div style={{ width: "320px", padding: "24px", left: "20px", top: "80px", zIndex: 1000, background: "rgba(150, 145, 145, 0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 1)", borderRadius: "30px", color: "#fff", fontFamily: "'Inter', sans-serif", position: "relative", boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.35)" }}>
      
      <div onClick={onClose} style={{ position: "absolute", top: "20px", right: "20px", cursor: "pointer", fontSize: "18px", opacity: 0.6 }}>✕</div>

      {activeCategory === "Design" && (
        <>
          <h2 style={{ fontSize: "14px", marginBottom: "15px", textAlign: "center", fontWeight: "600", letterSpacing: "1.5px", opacity: 0.9 }}>SELECT GENDER</h2>
          
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "25px" }}>
            {modelData.map((m) => {
              const activeGenderBtn = (m.id === 'man' && isMan) || (m.id === 'woman' && isWoman);
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    state.currentModel = m.path;
                    setActivePart("body"); 
                  }}
                  style={{ padding: "10px 16px", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.3)", cursor: "pointer", transition: "0.2s all ease", fontSize: "12px", fontWeight: "600", flex: 1, background: activeGenderBtn ? "#fff" : "rgba(0, 0, 0, 0.2)", color: activeGenderBtn ? "#000" : "#fff" }}
                >
                  {m.name.toUpperCase()}
                </button>
              );
            })}
          </div>

          {isMan ? (
            <>
              <h3 style={sectionHeadingStyle}>CHOOSE MAN JACKET STYLE</h3>
              <div style={gridContainerStyle}>
                {manStyles.map((styleItem) => {
                  const isStyleSelected = snap.currentModel === styleItem.path;
                  return (
                    <div key={styleItem.path} onClick={() => { state.currentModel = styleItem.path; }} style={{ ...thumbnailCardStyle, background: isStyleSelected ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.25)", border: isStyleSelected ? "2px solid #fff" : "1px solid rgba(255, 255, 255, 0.08)" }}>
                      <div style={imgFrameWrapperStyle}><img src={styleItem.img} alt={styleItem.name} style={imgStyle} /></div>
                      <span style={{ ...labelStyle, color: isStyleSelected ? "#fff" : "#ccc" }}>{styleItem.name}</span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <h3 style={sectionHeadingStyle}>CHOOSE WOMAN JACKET STYLE</h3>
              <div style={gridContainerStyle}>
                {womenStyles.map((styleItem) => {
                  const isStyleSelected = snap.currentModel === styleItem.path;
                  return (
                    <div key={styleItem.path} onClick={() => { state.currentModel = styleItem.path; }} style={{ ...thumbnailCardStyle, background: isStyleSelected ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.25)", border: isStyleSelected ? "2px solid #fff" : "1px solid rgba(255, 255, 255, 0.08)" }}>
                      <div style={imgFrameWrapperStyle}><img src={styleItem.img} alt={styleItem.name} style={imgStyle} /></div>
                      <span style={{ ...labelStyle, color: isStyleSelected ? "#fff" : "#ccc" }}>{styleItem.name}</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}

      {activeCategory === "Color" && (
        <>
          <h2 style={{ fontSize: "16px", marginBottom: "15px", textAlign: "center", fontWeight: "500", letterSpacing: "1px" }}>CUSTOMIZE COLORS</h2>

          <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
            <span onClick={() => setActivePart("body")} style={{ ...partTabStyle, opacity: activePart === "body" ? 1 : 0.5, borderBottom: activePart === "body" ? "2px solid #fff" : "none" }}>Body</span>
            <span onClick={() => setActivePart("inner")} style={{ ...partTabStyle, opacity: activePart === "inner" ? 1 : 0.5, borderBottom: activePart === "inner" ? "2px solid #fff" : "none" }}>Inner (Shearling)</span>
            <span onClick={() => setActivePart("zip")} style={{ ...partTabStyle, opacity: activePart === "zip" ? 1 : 0.5, borderBottom: activePart === "zip" ? "2px solid #fff" : "none" }}>Zip</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "30px" }}>
            {activePart === "zip" ? zipColors.map((z) => {
              // ✅ FIX: Purane state variable ki jagah modelsSettings[currentModel] se dynamic key access ki hai
              const currentColor = currentModelSettings?.zip;
              return (
                <div key={z.name} style={{ textAlign: "center" }}>
                  <div 
                    onClick={() => { 
                      if (state.modelsSettings[state.currentModel]) {
                        state.modelsSettings[state.currentModel].zip = z.value; 
                      }
                    }} 
                    style={{ width: "36px", height: "36px", borderRadius: "50%", background: z.value, cursor: "pointer", margin: "0 auto 5px auto", border: currentColor === z.value ? "3px solid #fff" : "1px solid rgba(255,255,255,0.2)" }} 
                  />
                  <span style={{ fontSize: "10px", opacity: 0.7 }}>{z.name}</span>
                </div>
              );
            }) : currentColors.map((c) => {
              const colorValue = c.value || c;
              const colorId = c.id || c;
              // ✅ FIX: Dynamic key based on current active model and active part (body / inner)
              const currentColor = currentModelSettings?.[activePart];
              return (
                <div 
                  key={colorId} 
                  onClick={() => { 
                    if (state.modelsSettings[state.currentModel]) {
                      state.modelsSettings[state.currentModel][activePart] = colorValue; 
                    }
                  }} 
                  style={{ width: "36px", height: "36px", borderRadius: "50%", background: colorValue, cursor: "pointer", border: currentColor === colorValue ? "3px solid #fff" : "1px solid rgba(255,255,255,0.2)" }} 
                />
              );
            })}
          </div>

          {activePart === "body" && (
            <>
              <hr style={horizontalRuleStyle} />
              <h3 style={textureHeadingStyle}>SELECT LEATHER TEXTURE</h3>
              <div style={textureFlexStyle}>
                {texturesList.map((t) => (
                  <button key={t.name} onClick={() => (state.currentTexture = t.path)} style={{ ...textureButtonStyle, background: snap.currentTexture === t.path ? "#fff" : "transparent", color: snap.currentTexture === t.path ? "#000" : "#fff" }}>{t.name}</button>
                ))}
              </div>
            </>
          )}

          {activePart === "inner" && (
            <>
              <hr style={horizontalRuleStyle} />
              <h3 style={textureHeadingStyle}>SELECT SHEARLING TEXTURE</h3>
              <div style={textureFlexStyle}>
                {[
                  { name: "Fur Texture", path: "/textures/Coat.jfif" },
                  { name: "AI Content", path: "/textures/shearling2.jfif" },
                  { name: "Chocolate Rug", path: "/textures/shearling3.jfif" },
                  { name: "smart", path: "/textures/shearling/smart texture.png" },
                ].map((t) => (
                  <button key={t.name} onClick={() => (state.currentShearlingTexture = t.path)} style={{ ...textureButtonStyle, background: snap.currentShearlingTexture === t.path ? "#fff" : "transparent", color: snap.currentShearlingTexture === t.path ? "#000" : "#fff" }}>{t.name}</button>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

const partTabStyle = { cursor: "pointer", fontSize: "12px", paddingBottom: "5px", transition: "0.3s" };
const sectionHeadingStyle = { fontSize: "11px", marginBottom: "12px", textAlign: "center", fontWeight: "500", letterSpacing: "0.8px", opacity: 0.8 };
const gridContainerStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "100%", maxHeight: "330px", overflowY: "auto" };
const thumbnailCardStyle = { borderRadius: "18px", padding: "8px", cursor: "pointer", transition: "all 0.2s ease-in-out", textAlign: "center" };
const imgFrameWrapperStyle = { width: "100%", height: "100px", backgroundColor: "#fcfcfc", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: "8px" };
const imgStyle = { width: "85%", height: "85%", objectFit: "contain" };
const labelStyle = { fontSize: "11px", display: "block" };
const horizontalRuleStyle = { border: "none", borderTop: "1px solid rgba(255,255,255,0.15)", marginBottom: "20px" };
const textureHeadingStyle = { fontSize: "12px", marginBottom: "12px", textAlign: "center", fontWeight: "500", letterSpacing: "0.5px" };
const textureFlexStyle = { display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" };
const textureButtonStyle = { padding: "8px 20px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.4)", cursor: "pointer", transition: "0.2s all", fontSize: "11px", width: "170px" };