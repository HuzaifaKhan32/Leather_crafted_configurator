import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { state, bodyColors, modelData, shearlingColors } from "../store";

export default function MainPanel({ activeCategory, onClose }) {
  const snap = useSnapshot(state);
  const [activePart, setActivePart] = useState("body");

  const isMan = snap.currentModel === modelData[0]?.path;
  const isWoman = snap.currentModel === modelData[1]?.path;

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

  // 🕺 Man Model Jackets Style Array - EXACTLY UNCHANGED AS REQUESTED
  const manStyles = [
    { name: "american-leather", img: "/man-thumbnail/american-leather.jpg", path: "/models/jacket model.glb" },
    { name: "Classic Black Leather", img: "/man-thumbnail/Classic Black Leather.jpg", path: "classic_black" },
    { name: "Maverick Black Leather", img: "/man-thumbnail/Maverick Black Leather.jpg", path: "maverick_black" },
    { name: "Real Leather Bomber", img: "/man-thumbnail/Real Leather Bomber.jpg", path: "real_bomber" },
    { name: "Packets Maroon", img: "/man-thumbnail/Packets Maroon.jpg", path: "packets_maroon" },
    { name: "Leather Biker Jacket", img: "/man-thumbnail/Leather Biker Jacket.jpg", path: "leather_biker" },
    { name: "Packets Trucker Jacket", img: "/man-thumbnail/packets trucker Jacket.png", path: "packets_trucker" },
  ];

  
 // 🧥 Women's Style Array - EXACT FILENAMES AND EXTENSIONS FIXED
  const womenStyles = [
    { name: "Leather–Shearling Jacket", img: "/women-thumbnail/Leather – Shearling Jacket.jpg", path: "/models/jacket 2.glb" }, 
    { name: "Women Cognac Shearling", img: "/women-thumbnail/Women Cognac Shearling.png", path: "cognac_shearling" }, 
    { name: "Women's Brown Hooded Leather", img: "/women-thumbnail/Women’s Brown Hooded Leather.jpg", path: "brown_hooded" }, 
    { name: "Black Leather Biker Jacket", img: "/women-thumbnail/Black Leather Biker Jacket.jpg", path: "black_biker" }, 
    { name: "Women's Length Black", img: "/women-thumbnail/Women’s  Length Black.jpeg", path: "length_black" }, 
    { name: "Blue Leather Bomber", img: "/women-thumbnail/Blue Leather Bomber.png", path: "blue_bomber" }, 
    { name: "Zipper Bomber Jacket", img: "/women-thumbnail/Zipper Bomber Jacket.png", path: "zipper_bomber" }, 
  ];

  // Dynamic Array selection based on active tab
  const currentColors = activePart === "inner" ? shearlingColors : bodyColors;

  return (
    <div
      style={{
        width: "320px",
        padding: "24px",
        left: "20px",
        top: "50px",
        zIndex: 1000,
        background: "rgba(150, 145, 145, 0.45)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: "30px",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.35)",
      }}
    >
      {/* Close Icon */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          cursor: "pointer",
          fontSize: "18px",
          opacity: 0.6,
        }}
      >
        ✕
      </div>

      {/* --- DESIGN CATEGORY --- */}
      {activeCategory === "Design" && (
        <>
          <h2
            style={{
              fontSize: "14px",
              marginBottom: "15px",
              textAlign: "center",
              fontWeight: "600",
              letterSpacing: "1.5px",
              opacity: 0.9,
            }}
          >
            SELECT CATEGORY
          </h2>
          
          {/* Top Model Toggles (Man / Woman) */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              marginBottom: "25px",
            }}
          >
            {modelData.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  state.currentModel = m.path;
                  setActivePart("body"); 
                }}
                style={{
                  padding: "10px 16px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  cursor: "pointer",
                  transition: "0.2s all ease",
                  fontSize: "12px",
                  fontWeight: "600",
                  flex: 1,
                  background: snap.currentModel === m.path ? "#fff" : "rgba(0, 0, 0, 0.2)",
                  color: snap.currentModel === m.path ? "#000" : "#fff",
                }}
              >
                {m.name.toUpperCase()}
              </button>
            ))}
          </div>

          {/* 🕺 MENS JACKET GRID VIEW */}
          {isMan && (
            <>
              <h3 style={sectionHeadingStyle}>CHOOSE MAN JACKET STYLE</h3>
              <div style={gridContainerStyle}>
                {manStyles.map((styleItem) => {
                  const isStyleSelected = snap.currentModelStyle === styleItem.path;
                  return (
                    <div
                      key={styleItem.path}
                      onClick={() => { state.currentModelStyle = styleItem.path; }}
                      style={{
                        ...thumbnailCardStyle,
                        background: isStyleSelected ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.25)",
                        border: isStyleSelected ? "2px solid #fff" : "1px solid rgba(255, 255, 255, 0.08)",
                        transform: isStyleSelected ? "scale(1.02)" : "scale(1)"
                      }}
                    >
                      <div style={imgFrameWrapperStyle}>
                        <img src={styleItem.img} alt={styleItem.name} style={imgStyle} />
                      </div>
                      <span style={{
                        ...labelStyle,
                        fontWeight: isStyleSelected ? "600" : "400",
                        color: isStyleSelected ? "#fff" : "#ccc"
                      }}>
                        {styleItem.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* 💃 WOMENS JACKET STYLE THUMBNAILS GRID */}
          {isWoman && (
            <>
              <h3 style={sectionHeadingStyle}>CHOOSE WOMAN JACKET STYLE</h3>
              <div style={gridContainerStyle}>
                {womenStyles.map((styleItem) => {
                  const isStyleSelected = snap.currentModelStyle === styleItem.path;
                  return (
                    <div
                      key={styleItem.path}
                      onClick={() => { state.currentModelStyle = styleItem.path; }}
                      style={{
                        ...thumbnailCardStyle,
                        background: isStyleSelected ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.25)",
                        border: isStyleSelected ? "2px solid #fff" : "1px solid rgba(255, 255, 255, 0.08)",
                        transform: isStyleSelected ? "scale(1.02)" : "scale(1)"
                      }}
                    >
                      <div style={imgFrameWrapperStyle}>
                        <img src={styleItem.img} alt={styleItem.name} style={imgStyle} />
                      </div>
                      <span style={{
                        ...labelStyle,
                        fontWeight: isStyleSelected ? "600" : "400",
                        color: isStyleSelected ? "#fff" : "#ccc"
                      }}>
                        {styleItem.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}

      {/* --- COLOR CATEGORY --- */}
      {activeCategory === "Color" && (
        <>
          <h2
            style={{
              fontSize: "16px",
              marginBottom: "15px",
              textAlign: "center",
              fontWeight: "500",
              letterSpacing: "1px",
            }}
          >
            CUSTOMIZE COLORS
          </h2>

          {/* Tabs header logic */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <span
              onClick={() => setActivePart("body")}
              style={{
                ...partTabStyle,
                opacity: activePart === "body" ? 1 : 0.5,
                borderBottom: activePart === "body" ? "2px solid #fff" : "none",
              }}
            >
              Body
            </span>
            {isWoman && (
              <span
                onClick={() => setActivePart("inner")}
                style={{
                  ...partTabStyle,
                  opacity: activePart === "inner" ? 1 : 0.5,
                  borderBottom: activePart === "inner" ? "2px solid #fff" : "none",
                }}
              >
                Inner (Shearling)
              </span>
            )}
            <span
              onClick={() => setActivePart("zip")}
              style={{
                ...partTabStyle,
                opacity: activePart === "zip" ? 1 : 0.5,
                borderBottom: activePart === "zip" ? "2px solid #fff" : "none",
              }}
            >
              Zip
            </span>
          </div>

          {/* Color Palette Rendering */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            {activePart === "zip"
              ? zipColors.map((z) => {
                  const currentColor = isMan ? snap.manItems.zip : snap.womenItems.zip;
                  return (
                    <div key={z.name} style={{ textAlign: "center" }}>
                      <div
                        onClick={() => {
                          if (isMan) state.manItems.zip = z.value;
                          if (isWoman) state.womenItems.zip = z.value;
                        }}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: z.value,
                          cursor: "pointer",
                          margin: "0 auto 5px auto",
                          border: currentColor === z.value ? "3px solid #fff" : "1px solid rgba(255,255,255,0.2)",
                        }}
                      />
                      <span style={{ fontSize: "10px", opacity: 0.7 }}>{z.name}</span>
                    </div>
                  );
                })
              : currentColors.map((c) => {
                  const colorValue = c.value || c;
                  const colorId = c.id || c;
                  const currentColor = isMan ? snap.manItems[activePart] : snap.womenItems[activePart];
                  return (
                    <div
                      key={colorId}
                      title={c.name || ""}
                      onClick={() => {
                        if (isMan) state.manItems[activePart] = colorValue;
                        if (isWoman) state.womenItems[activePart] = colorValue;
                      }}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: colorValue,
                        cursor: "pointer",
                        border: currentColor === colorValue ? "3px solid #fff" : "1px solid rgba(255,255,255,0.2)",
                      }}
                    />
                  );
                })}
          </div>

          {/* TEXTURE SELECTION SECTION FOR LEATHER */}
          {activePart === "body" && (
            <>
              <hr style={horizontalRuleStyle} />
              <h3 style={textureHeadingStyle}>SELECT LEATHER TEXTURE</h3>
              <div style={textureFlexStyle}>
                {texturesList.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => (state.currentTexture = t.path)}
                    style={{
                      ...textureButtonStyle,
                      background: snap.currentTexture === t.path ? "#fff" : "transparent",
                      color: snap.currentTexture === t.path ? "#000" : "#fff",
                    }}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* TEXTURE SELECTION SECTION FOR SHEARLING */}
          {activePart === "inner" && (
            <>
              <hr style={horizontalRuleStyle} />
              <h3 style={textureHeadingStyle}>SELECT SHEARLING TEXTURE</h3>
              <div style={textureFlexStyle}>
                {[
                  { name: "White WS", path: "/textures/shearling1.jfif" },
                  { name: "AI Content", path: "/textures/shearling2.jfif" },
                  { name: "Chocolate Rug", path: "/textures/shearling3.jfif" },
                  { name: "Chocolate", path: "/textures/shearling6.jfif" },
                ].map((t) => (
                  <button
                    key={t.name}
                    onClick={() => (state.currentShearlingTexture = t.path)}
                    style={{
                      ...textureButtonStyle,
                      background: snap.currentShearlingTexture === t.path ? "#fff" : "transparent",
                      color: snap.currentShearlingTexture === t.path ? "#000" : "#fff",
                    }}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

// 🎨 Constant Style Objects
const partTabStyle = { cursor: "pointer", fontSize: "12px", paddingBottom: "5px", transition: "0.3s" };
const sectionHeadingStyle = { fontSize: "11px", marginBottom: "12px", textAlign: "center", fontWeight: "500", letterSpacing: "0.8px", opacity: 0.8 };
const gridContainerStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "100%", maxHeight: "330px", overflowY: "auto", paddingRight: "4px" };
const thumbnailCardStyle = { borderRadius: "18px", padding: "8px", cursor: "pointer", transition: "all 0.2s ease-in-out", textAlign: "center" };
const imgFrameWrapperStyle = { width: "100%", height: "100px", backgroundColor: "#fcfcfc", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", marginBottom: "8px" };
const imgStyle = { width: "85%", height: "85%", objectFit: "contain" };
const labelStyle = { fontSize: "11px", display: "block", lineHeight: "1.2", truncate: "true" };
const horizontalRuleStyle = { border: "none", borderTop: "1px solid rgba(255,255,255,0.15)", marginBottom: "20px" };
const textureHeadingStyle = { fontSize: "12px", marginBottom: "12px", textAlign: "center", fontWeight: "500", letterSpacing: "0.5px" };
const textureFlexStyle = { display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" };
const textureButtonStyle = { padding: "8px 20px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.4)", cursor: "pointer", transition: "0.2s all", fontSize: "11px", width: "170px" };