import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainPanel from './components/MainPanel';
import JacketCanvas from './components/JacketCanvas';
import Logo from './components/Logo';
import ScreenshotButton from './components/ScreenshotButton';
import AddToCartButton from './components/AddToCartButton';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [activeTab, setActiveTab] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // 1. Active Jacket Model track karne ke liye state
  const [currentModel, setCurrentModel] = useState(null);

  // 2. Model switch hotay hi previous history aur storage clear karne ka logic
  useEffect(() => {
    if (currentModel) {
      // Storage aur cart history wipe
      localStorage.removeItem('jacket_customization');
      localStorage.removeItem('cart_data');
      
      // Optional: Agar model badalte hi drawer auto-close ya reset karna ho:
      setIsCartOpen(false);
    }
  }, [currentModel?.id]); // Jab bhi model ID change hogi yeh fire hoga

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Logo />
      
      {/* Canvas ko current model ki state pass karein */}
      <JacketCanvas currentModel={currentModel} />

      <ScreenshotButton onCapture={() => console.log('Capture')} />

      {/* Cart Button */}
      <AddToCartButton onOpenCart={() => setIsCartOpen(true)} />

      {/* Cart Drawer Modal ko model ki details pass karein */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        model={currentModel}
        onRemoveModel={() => setCurrentModel(null)}
      />

      {!activeTab ? (
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onSelectModel={(model) => setCurrentModel(model)} // Model selection handler
        />
      ) : (
        <MainPanel 
          activeCategory={activeTab} 
          onClose={() => setActiveTab(null)} 
          onSelectModel={(model) => setCurrentModel(model)} // Model selection handler
        />
      )}
    </div>
  );
}