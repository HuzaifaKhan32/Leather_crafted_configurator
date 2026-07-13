import React, { Suspense, useLayoutEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Center, OrbitControls, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import { state } from '../store';

function JacketModel() {
  const snap = useSnapshot(state);
  const { scene } = useGLTF(snap.currentModel);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const leatherTexture = useTexture(snap.currentTexture);
  const shearlingTexture = useTexture(snap.currentShearlingTexture);

  useMemo(() => {
    if (leatherTexture) {
      leatherTexture.wrapS = THREE.RepeatWrapping;
      leatherTexture.wrapT = THREE.RepeatWrapping;
      leatherTexture.repeat.set(12, 12);
      leatherTexture.needsUpdate = true;
    }
    if (shearlingTexture) {
      shearlingTexture.wrapS = THREE.RepeatWrapping;
      shearlingTexture.wrapT = THREE.RepeatWrapping;
      shearlingTexture.repeat.set(6, 6); 
      shearlingTexture.needsUpdate = true;
    }
  }, [leatherTexture, shearlingTexture]);

  const activeItems = useMemo(() => {
    return snap.currentModel.includes('jacket model.glb') 
      ? snap.manItems 
      : snap.womenItems;
  }, [snap.currentModel, snap.manItems, snap.womenItems]);

  useLayoutEffect(() => {
    if (!activeItems) return;
    
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        
        // Default clean state
        child.material.map = null; 

        const name = child.name.toLowerCase();

        // --- WOMEN MODEL LOGIC ---
        if (snap.currentModel.includes('jacket 2.glb')) {
          if (name === "jacket_") {
            child.material.color.set(activeItems.body);
            child.material.map = leatherTexture; 
            child.material.roughness = 0.8; 
            child.material.metalness = 0.1;
          } 
          else if (name === "coller") {
            child.material.color.set(activeItems.inner);
            child.material.map = shearlingTexture;
            child.material.roughness = 1.5;
            child.material.metalness = 0.0;
          } 
          else if (name === "zip" || name === "lock_") {
            child.material.color.set(activeItems.zip);
            child.material.metalness = 1.0;  
            child.material.roughness = 0.15; 
          }
        }

        // --- MAN MODEL LOGIC ---
        else if (snap.currentModel.includes('jacket model.glb')) {
          if (name === "object001") {
            child.material.color.set(activeItems.body);
            child.material.map = leatherTexture; 
            child.material.roughness = 0.75; 
            child.material.metalness = 0.1;
          } 
          else if (name.includes("zip_runner_")) {
            child.material.color.set(activeItems.zip);
            child.material.metalness = 1.0;  
            child.material.roughness = 0.05; 
          } 
          // Matte fix for collar, sleeves, and waist ribs
          else {
            child.material.color.set("#030303"); 
            child.material.roughness = 0.88;       
            child.material.metalness = 0.0;       
          }
        }

        child.material.needsUpdate = true;
      }
    });
  }, [clonedScene, activeItems, snap.currentModel, leatherTexture, shearlingTexture]);

  return <primitive object={clonedScene} />;
}

export default function JacketCanvas() {
  const snap = useSnapshot(state);

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }} gl={{ preserveDrawingBuffer: true }}>
      <ambientLight intensity={0.8} />
      <Environment preset="studio" environmentIntensity={1.0} />
      
      <directionalLight position={[10, 8, 5]} intensity={0.5} castShadow />
      <spotLight position={[0, 2, 5]} intensity={0.9} angle={0.3} penumbra={1} castShadow />
      
      <Suspense fallback={null}>
        <Center key={snap.currentModel}>
          <group rotation={[0, Math.PI / 2, 0]}>
            <JacketModel />
          </group>
        </Center>
      </Suspense>
      
      <OrbitControls 
        key={snap.currentModel}
        makeDefault 
        autoRotate={snap.autoRotate} 
        enablePan={false} 
        enableZoom={true} 
        minPolarAngle={Math.PI / 2}  
        maxPolarAngle={Math.PI / 2}  
        minDistance={1.8} 
        maxDistance={2} 
      />
    </Canvas>
  );
}