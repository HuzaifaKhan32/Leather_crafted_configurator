import React, { useLayoutEffect, useMemo } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { state } from '../store';
import * as THREE from 'three';

export function JacketModel() {
  const snap = useSnapshot(state);
  
  const currentModelPath = snap.currentModel; 

  const { scene } = useGLTF(currentModelPath);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const leatherTexture = useTexture(snap.currentTexture);
  const shearlingColorMap = useTexture(snap.currentShearlingTexture);

  useMemo(() => {
    if (leatherTexture) {
      leatherTexture.wrapS = THREE.RepeatWrapping;
      leatherTexture.wrapT = THREE.RepeatWrapping;
      leatherTexture.repeat.set(10, 10);
      leatherTexture.needsUpdate = true;
    }
    
    if (shearlingColorMap) {
      shearlingColorMap.wrapS = THREE.RepeatWrapping;
      shearlingColorMap.wrapT = THREE.RepeatWrapping;
      shearlingColorMap.repeat.set(8, 8); 
      shearlingColorMap.anisotropy = 16;
      shearlingColorMap.colorSpace = THREE.SRGBColorSpace;
      shearlingColorMap.needsUpdate = true;
    }
  }, [leatherTexture, shearlingColorMap]);

  useLayoutEffect(() => {
    // 🔍 1. Pehle original state proxy par check karein agar ye path exist nahi karta toh initialize karein
    if (state.modelsSettings && !state.modelsSettings[currentModelPath]) {
      state.modelsSettings[currentModelPath] = {
        body: state.modelsSettings['/model/jacket_model.glb']?.body || "#ffffff",
        inner: state.modelsSettings['/model/jacket_model.glb']?.inner || "#ffffff",
        zip: state.modelsSettings['/model/jacket_model.glb']?.zip || "#C0C0C0"
      };
    }

    // 🔍 2. Ab snapshot se read karein taaki jab bhi button click ho, component automatic re-render ho sake
    const activeItems = snap.modelsSettings?.[currentModelPath];

    if (!activeItems) return; // Guard clause agar state ready na ho

    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;

        child.material = child.material.clone();
        const matName = child.material.name ? child.material.name.toLowerCase() : '';

        const isBurgundyModel = currentModelPath.toLowerCase().includes('burgundy');

        // 1. --- INNER / COLLAR / SHEARLING TARGET AREA ---
        if (
          matName.includes('inner') || 
          matName.includes('collar') || 
          matName.includes('407') || 
          matName.includes('material__777') ||
          matName.includes('fur')
        ) {
          if (shearlingColorMap) {
            child.material.map = shearlingColorMap;
            child.material.bumpMap = shearlingColorMap; 
            child.material.bumpScale = 0.04; 
          }
          if (activeItems.inner) {
            child.material.color.set(activeItems.inner);
          }
          child.material.roughness = 0.95;    
          child.material.metalness = 0.0;     
        }
        
        // 2. --- MAIN JACKET BODY LEATHER TARGET AREA ---
        else if (
          matName.includes('body') || 
          matName.includes('jacket') || 
          matName.includes('406') || 
          matName.includes('#25') || 
          matName.includes('778') ||
          (isBurgundyModel && !matName.includes('405')) 
        ) {
          if (leatherTexture) {
            child.material.map = leatherTexture;
          }
          if (activeItems.body) {
            child.material.color.set(activeItems.body);
          }
          child.material.roughness = 0.7; 
          child.material.metalness = 0.15;
        } 
        
        // 3. --- ZIPPER AND RUNNERS TARGET AREA ---
        else if (
          matName.includes('zip') || 
          matName.includes('runner') || 
          matName.includes('405') || 
          matName.includes('500') || 
          matName.includes('metal') || 
          matName.includes('hardware')
        ) {
          if (activeItems.zip) {
            child.material.color.set(activeItems.zip);
          }
          child.material.metalness = 1.0;  
          child.material.roughness = 0.12; 
        }
        child.material.needsUpdate = true;
      }
    });
  }, [clonedScene, currentModelPath, leatherTexture, shearlingColorMap, snap.modelsSettings]); 

  const isBomber = currentModelPath.includes('bomber_jacket_ribbed');

  return (
    <primitive 
      object={clonedScene} 
      rotation={isBomber ? [-Math.PI / 2, 0, 0] : [0, 0, 0]} 
      position={isBomber ? [0, 0.1, 0] : [0, 0, 0]} 
      scale={[1, 1, 1]}
    />
  );
}

// Pre-fetching targets
useGLTF.preload('/model/leather_coat_3d_model.glb');
useGLTF.preload('/model/burgundy_leather_jacket_3d_model.glb');
useGLTF.preload('/model/tan_leather_jacket_3d_model.glb');
useGLTF.preload('/model/jacket_2.glb');
useGLTF.preload('/model/leather_jacket_3d_model.glb');
useGLTF.preload('/model/jacket_model.glb');
useGLTF.preload('/model/bomber_jacket_ribbed(1).glb');
useGLTF.preload('/model/maroon.glb');
useGLTF.preload('/model/brown_trucker.glb');
useGLTF.preload('/model/Leather_Shearling.glb');
useGLTF.preload('/model/Real_Leather.glb');
useGLTF.preload('/model/Women_Blue_Leather.glb');
useGLTF.preload('/model/hoddy.glb');