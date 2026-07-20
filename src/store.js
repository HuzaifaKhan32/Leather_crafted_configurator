import { proxy } from 'valtio';

export const state = proxy({
  currentModel: '/model/leather_coat_3d_model.glb', 
  currentTexture: '/textures/Leathers _ OLD ENGLISH Collection.jfif', 
  currentShearlingTexture: '/textures/shearling1.jfif', 
  
  // ✅ modelsSettings ab proxy ke andar hai aur inke default colors match kar diye gaye hain
  modelsSettings: {
    '/model/leather_coat_3d_model.glb': { body: '#2c1914', zip: '#C0C0C0', inner: '#b9b7b2' },
    '/model/burgundy_leather_jacket_3d_model.glb': { body: '#802329', zip: '#C0C0C0', inner: '#b9b7b2' },
    '/model/tan_leather_jacket_3d_model.glb': { body: '#C58B55', zip: '#C0C0C0', inner: '#b9b7b2' },
    '/model/jacket_2.glb': { body: '#4A2E5B', zip: '#C0C0C0', inner: '#111111' },
    '/model/leather_jacket_3d_model.glb': { body: '#000000', zip: '#C0C0C0', inner: '#b9b7b2' },
    '/model/jacket_model.glb': { body: '#7A4328', zip: '#C0C0C0', inner: '#b9b7b2' },
    '/model/bomber_jacket_ribbed(1).glb': { body: '#1C495C', zip: '#C0C0C0', inner: '#b9b7b2' },
    '/model/maroon.glb': { body: '#800000', zip: '#C0C0C0', inner: '#b9b7b2' },
    '/model/hoddy.glb': { body: '#2c1914', zip: '#C0C0C0', inner: '#b9b7b2' },
    '/model/brown_trucker.glb': { body: '#2c1914', zip: '#C0C0C0', inner: '#b9b7b2' },
    '/model/leather_shearling.glb': { body: '#2c1914', zip: '#C0C0C0', inner: '#b9b7b2' },
     '/model/Real_Leather.glb': { body: '#800000', zip: '#C0C0C0', inner: '#b9b7b2' },
      '/model/Women_Blue_Leather.glb': { body: '#4A2E5B', zip: '#C0C0C0', inner: '#111111' },
       '/model/hoddy.glb': { body: '#4A2E5B', zip: '#C0C0C0', inner: '#111111' },

  }
});

export const modelData = [
  { id: 'man', name: 'Man Jacket', path: '/model/leather_coat_3d_model.glb' },
  { id: 'woman', name: 'Woman Jacket', path: '/model/jacket_2.glb' }
];

export const bodyColors = [
  { id: 'dark_chocolate', name: 'Dark Chocolate Brown', value: '#2c1914' },
  { id: 'deep_purple', name: 'Deep Purple', value: '#4A2E5B' },
  { id: 'wine_maroon', name: 'Wine Red / Maroon', value: '#802329' },
  { id: 'tan_camel', name: 'Tan / Camel Leather', value: '#C58B55' },
  { id: 'classic_cognac', name: 'Classic Cognac Brown', value: '#7A4328' },
  { id: 'teal_petrol', name: 'Teal Blue / Petrol', value: '#1C495C' },
  { id: 'classic_black', name: 'Classic Black', value: '#000000' }
];

export const shearlingColors = [
  '#b9b7b2', // Natural Cream
  '#362219', // Deep Espresso Brown
  '#111111', // Classic Jet Black
  '#6E381A'  // Chestnut / Ginger Brown
];