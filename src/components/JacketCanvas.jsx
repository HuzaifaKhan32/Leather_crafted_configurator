import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls, Environment, useProgress, Html } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { state } from '../store';
import { JacketModel } from './JacketModel.jsx'; 

function Loader() {
  const { progress } = useProgress();
  const [displayedProgress, setDisplayedProgress] = useState(15);

  // Sync with real Drei progress if available and higher
  useEffect(() => {
    if (progress > 0) {
      setDisplayedProgress((prev) => Math.max(prev, progress));
    }
  }, [progress]);

  // Smooth dynamic progress for single-file model switches where Drei stays at 0%
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedProgress((prev) => {
        if (prev < 45) return prev + Math.floor(Math.random() * 8 + 4);
        if (prev < 75) return prev + Math.floor(Math.random() * 4 + 2);
        if (prev < 90) return prev + Math.floor(Math.random() * 2 + 1);
        if (prev < 96) return Math.min(96, prev + 0.3);
        return prev;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const progressVal = Math.min(100, Math.max(0, displayedProgress)).toFixed(0);

  return (
    <Html center>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '16px 24px',
        borderRadius: '20px',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.15)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none'
      }}>
        <div style={{
          fontSize: '10px',
          fontWeight: '800',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#80471c'
        }}>
          Loading 3D Model
        </div>
        <div style={{
          width: '130px',
          height: '4px',
          background: 'rgba(0, 0, 0, 0.08)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressVal}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #c27838, #8a4816)',
            transition: 'width 0.15s ease-out',
            borderRadius: '4px'
          }} />
        </div>
        <span style={{ fontSize: '11px', color: '#111827', fontWeight: '700' }}>
          {progressVal}%
        </span>
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