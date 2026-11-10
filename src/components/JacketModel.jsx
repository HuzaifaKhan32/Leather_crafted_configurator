import React, { useEffect, useState, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { state } from '../store';
import * as THREE from 'three';

const formatHexColor = (color) => {
  if (typeof color === 'string' && color.startsWith('#') && color.length === 9) {
    return color.substring(0, 7);
  }
  return color;
};

// Clean string comparison function to handle extra spaces & apostrophe variations
const normalizePath = (path) => {
  if (!path) return '';
  return path
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
};

const fixedBlackInnerModels = [
  "/model/Men’s  Real Lambskin Leather Bomber Jacket – Classic Zip-Up Leather Jacket.glb",
  "/model/Women’s Cognac Brown Genuine Lambskin Leather Bomber Jacket.glb",
  "/model/Women’s Blue Real Lambskin Leather Bomber Jacket – Classic Zip-Up Leather Jacket.glb"
].map(normalizePath);

export function JacketModel() {
  const snap = useSnapshot(state);
  const currentModelPath = snap.currentModel; 

  const { scene } = useGLTF(currentModelPath);

  // Dynamic Texture State
  const [leatherTexture, setLeatherTexture] = useState(null);

  // Async texture load
  useEffect(() => {
    const texturePath = snap.currentTexture || '/textures/leather_default.png';
    const loader = new THREE.TextureLoader();
    
    loader.load(texturePath, (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      tex.repeat.set(4, 4);
      tex.needsUpdate = true;
      setLeatherTexture(tex);
    });
  }, [snap.currentTexture]);

  // Scene & materials clone
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
      }
    });
    return clone;
  }, [scene]);

  // Material Updates
  useEffect(() => {
    const activeItems = snap.modelsSettings?.[currentModelPath] || {
      body: "#ffffff",
      inner: "#ffffff",
      zip: "#C0C0C0"
    };

    const isJecketGlb = currentModelPath.toLowerCase().includes('jecket');
    const isJacketModel = currentModelPath.toLowerCase().includes('jacket_model.glb');
    
    // Normalized check for exact matching
    const normalizedCurrentPath = normalizePath(currentModelPath);
    const isFixedBlackInner = fixedBlackInnerModels.some((path) => normalizedCurrentPath.includes(path) || path.includes(normalizedCurrentPath));

    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;

        const matName = child.material.name ? child.material.name.toLowerCase() : '';
        const meshName = child.name ? child.name.toLowerCase() : '';
        const isBurgundyModel = currentModelPath.toLowerCase().includes('burgundy');

        const isButton = matName.includes('button') || matName.includes('btn') || meshName.includes('button') || meshName.includes('btn');

        // 1. ZIPPER AND RUNNERS
        const isZipMesh = 
          matName.includes('zip') || 
          matName.includes('runner') || 
          matName.includes('zipper') ||
          matName.includes('metal') || 
          matName.includes('405') || 
          matName.includes('500') ||
          (isJacketModel && matName.includes('fallback'));

        if (!isButton && isZipMesh) {
          if (activeItems.zip) {
            const zipHex = typeof activeItems.zip === 'object' ? activeItems.zip.hex : activeItems.zip;
            const metalnessVal = typeof activeItems.zip === 'object' ? (activeItems.zip.metalness ?? 0.95) : 0.95;
            const roughnessVal = typeof activeItems.zip === 'object' ? (activeItems.zip.roughness ?? 0.3) : 0.3;

            child.material.map = null;
            child.material.color.set(formatHexColor(zipHex));
            child.material.metalness = metalnessVal;
            child.material.roughness = roughnessVal;
          }
        }

        // 2. INNER / COLLAR / SHEARLING
        else if (
          matName.includes('inner') || 
          matName.includes('collar') || 
          meshName.includes('inner') ||
          meshName.includes('lining') ||
          (!isJacketModel && matName.includes('407')) || 
          matName.includes('material__777') ||
          matName.includes('fur') ||
          matName.includes('300') 
        ) {
          child.material.map = null;
          child.material.bumpMap = null;

          if (isFixedBlackInner) {
            // Lock color to Black
            child.material.color.set("#000000");
          } else if (activeItems.inner) {
            child.material.color.set(formatHexColor(activeItems.inner));
          }
    
          child.material.roughness = 0.85;    
          child.material.metalness = 0.0;     
        }
        
        // 3. MAIN BODY & BUTTONS
        else if (
          isButton || 
          matName.includes('body') || 
          matName.includes('jacket') || 
          matName.includes('406') || 
          matName.includes('#25') || 
          matName.includes('778') ||
          (isBurgundyModel && !matName.includes('405')) 
        ) {
          if (activeItems.body) {
            child.material.color.set(formatHexColor(activeItems.body));
          }

          if (leatherTexture && !isButton) {
            child.material.map = leatherTexture;
          }

          child.material.roughness = isJecketGlb ? 0.99 : 0.75; 
          child.material.metalness = isButton ? 0.3 : (isJecketGlb ? 0.15 : 0.15);

          if (isJecketGlb) {
            child.material.bumpMap = null;
            child.material.normalMap = null;
          }
        }

        child.material.needsUpdate = true;
      }
    });
  }, [clonedScene, currentModelPath, leatherTexture, snap.modelsSettings]); 

  const isBomber = currentModelPath.includes('bomber_jacket_ribbed');

  return (
    <primitive 
      object={clonedScene} 
      rotation={[0, 0, 0]} 
      position={isBomber ? [0, -0.85, 0] : [0, 0, 0]} 
      scale={isBomber ? [0.85, 0.85, 0.85] : [1, 1, 1]}
    />
  );
}

useGLTF.preload('/model/Men’s Genuine Leather Maverick Jacket–Shirt Collar Style.glb');