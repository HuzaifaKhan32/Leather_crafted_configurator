import React, { useLayoutEffect } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { state } from '../store';
import * as THREE from 'three';

export function JacketModel() {
  const snap = useSnapshot(state);
  
  // 1. Load the active model dynamically
  const { scene } = useGLTF(snap.currentModel);

  // 2. Load the texture reactively
  const shearlingColorMap = useTexture(snap.currentShearlingTexture);

  // 3. Texture Settings for high-definition sharpness
  useLayoutEffect(() => {
    if (shearlingColorMap) {
      shearlingColorMap.wrapS = THREE.RepeatWrapping;
      shearlingColorMap.wrapT = THREE.RepeatWrapping;
      
      // Pattern tight karne ke liye repeat set kiya (6x6 ya 8x8 use karein)
      shearlingColorMap.repeat.set(6, 6); 
      
      // Blurriness khatam karne ke liye sharp settings
      shearlingColorMap.anisotropy = 16;
      shearlingColorMap.colorSpace = THREE.SRGBColorSpace;
      
      shearlingColorMap.needsUpdate = true;
    }
  }, [shearlingColorMap]);

  // 4. Safely apply and enhance existing materials
  useLayoutEffect(() => {
    const isManModel = snap.currentModel.includes('jacket model.glb');

    scene.traverse((child) => {
      if (child.isMesh) {
        const meshName = child.name.toLowerCase();
        const matName = child.material && child.material.name ? child.material.name.toLowerCase() : '';

        // Check if this part should have shearling/fur texture
        const isShearlingPart = 
          meshName.includes('collar') || 
          meshName.includes('cuff') || 
          meshName.includes('trim') || 
          matName.includes('407') || 
          matName.includes('material #407');

        if (isShearlingPart) {
          
          // Guardrail: Male Model Collar bypass
          if (isManModel && meshName.includes('collar')) {
            child.material.map = null; 
            child.material.bumpMap = null;
            child.material.color.set(snap.manItems.body);
            child.material.roughness = 0.6;
            child.material.metalness = 0.1;
            child.material.needsUpdate = true;
            return; 
          }

          // CRITICAL FOR REALISM: Do NOT use 'new THREE.MeshStandardMaterial'
          // Purane material par hi map inject karein taaki UV coordinates integrity bani rahe
          if (child.material) {
            child.material.map = shearlingColorMap;
            
            // --- BUMP MAP HACK FOR 3D DEPTH ---
            // Yeh flat surface par lights and shadows create karega
            child.material.bumpMap = shearlingColorMap; 
            child.material.bumpScale = 0.05; // Fur depth intensity (Adjust between 0.03 to 0.08)

            // Pure Matte clothing behavior
            child.material.roughness = 1.0; 
            child.material.metalness = 0.0; 

            // Apply dynamic color from Valtio store safely
            if (snap.womenItems && snap.womenItems.inner) {
              child.material.color.set(snap.womenItems.inner);
            } else {
              child.material.color.set('#e0dacb'); // Fallback natural cream color
            }

            child.material.needsUpdate = true;
          }
        }
      }
    });
  }, [scene, shearlingColorMap, snap.currentModel, snap.manItems.body, snap.womenItems?.inner]);

  return <primitive object={scene} />;
}