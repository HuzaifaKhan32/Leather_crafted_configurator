import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, Environment } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { state } from '../store';
import { JacketModel } from './JacketModel.jsx'; 
// import { Environment } from '@react-three/drei';


export default function JacketCanvas() { // 👈 Component function declaration add kiya
  const snap = useSnapshot(state);

  // Dynamic state fallback for model switching
  const activeModelPath = snap.currentModelStyle || snap.currentModel;

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }} gl={{ preserveDrawingBuffer: true }}>
      <ambientLight intensity={1.2} />
      <Environment preset="studio" environmentIntensity={1.09} />
      
      <directionalLight position={[5, 5, 5]} intensity={0.9} castShadow />
      <spotLight position={[0, 2, 5]} intensity={0.9} angle={0.3} penumbra={1} castShadow />
      
      <Suspense fallback={null}>
        <Center key={activeModelPath}>
          <group rotation={[0, Math.PI / 2, 0]}>
            <JacketModel />
          </group>
        </Center>
      </Suspense>
      
      <OrbitControls 
        makeDefault 
        autoRotate={snap.autoRotate} 
        enablePan={false} 
        screenSpacePanning={false} 
        minPolarAngle={Math.PI / 2} 
        maxPolarAngle={Math.PI / 2} 
        minDistance={1.5} 
        maxDistance={2.5} 
      />
    </Canvas>
  );
}