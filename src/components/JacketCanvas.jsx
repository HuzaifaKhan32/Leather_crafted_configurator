import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, Environment, useProgress, Html } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { state } from '../store';
import { JacketModel } from './JacketModel.jsx'; 

function Loader() {
  const { progress } = useProgress();
  const [displayedProgress, setDisplayedProgress] = useState(0);

  useEffect(() => {
    setDisplayedProgress(progress);
  }, [progress]);

  return (
    <Html center>
      <div style={{
        color: '#ffffff',
        fontSize: '13px',
        fontWeight: '500',
        fontFamily: "'Inter', sans-serif",
        background: 'rgba(0, 0, 0, 0.75)',
        padding: '8px 16px',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        whiteSpace: 'nowrap',
        letterSpacing: '0.5px'
      }}>
        Loading Model... {displayedProgress.toFixed(0)}%
      </div>
    </Html>
  );
}

export default function JacketCanvas() {
  const snap = useSnapshot(state);
  const activeModelPath = snap.currentModelStyle || snap.currentModel;
  const controlsRef = useRef();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, [activeModelPath]);

  // Logo ke sath overlap khatam karne ke liye adjusted values
  const targetY = isMobile ? -0.15 : 0;

  return (
    <Canvas 
      dpr={[1, 2]} 
      camera={{ position: [0, 0, 4.3], fov: isMobile ? 54 : 45 }} 
      gl={{ 
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
        precision: 'mediump'
      }}
    >
      <ambientLight intensity={1.2} />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_03_1k.hdr" environmentIntensity={1.09} />
      
      <directionalLight position={[5, 5, 5]} intensity={0.9} castShadow />
      <spotLight position={[0, 2, 5]} intensity={0.9} angle={0.3} penumbra={1} castShadow />
      
      <Suspense fallback={<Loader />}>
        <Center key={activeModelPath}> 
          <group rotation={[0, 0, 0]}>
            <JacketModel />
          </group>
        </Center>
      </Suspense>
      
      <OrbitControls 
        key={`${activeModelPath}-${isMobile}`}
        ref={controlsRef}
        makeDefault 
        autoRotate={snap.autoRotate} 
        enablePan={false} 
        screenSpacePanning={false} 
        target={[0, targetY, 0]}
        minPolarAngle={Math.PI / 2.2} 
        maxPolarAngle={Math.PI / 2.2} 
        minDistance={1.8} 
        maxDistance={2.5} 
      />
    </Canvas>
  );
}