import { proxy } from 'valtio';


export const state = proxy({
  currentModel: '/models/jacket model.glb',
  color: '#ffffff',
  manItems: { body: '#2B1E19', zip: '#C0C0C0' },
  womenItems: { body: '#4A2E5B', inner: '#111111', zip: '#C0C0C0' },
  currentTexture: '/textures/Leathers _ OLD ENGLISH Collection.jfif', // Aapka default texture path
  currentShearlingTexture: '/textures/shearling1.jfif', // Aapka default shearling texture path
});

export const modelData = [
  { id: 'man', name: 'Man Jacket', path: '/models/jacket model.glb' },
  { id: 'woman', name: 'Woman Jacket', path: '/models/jacket 2.glb' }
];

// Jacket body colors array
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